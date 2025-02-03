<?php
namespace Madebymunsters\Gutenberg\Support\Registration;


class BlockRegistrar {
  public function __construct($plugin_base_dir_file, $capabilities_checker, $block_def_paths = []) {
    $this->capabilities_checker = $capabilities_checker;
    $this->plugin_base_dir = plugin_dir_path($plugin_base_dir_file);
    $this->block_def_paths = $block_def_paths;
  }

  public function register() {
    add_action('init', [$this, 'registerBlocks']);
  }

  /*
   * Note: with the release of WP v6.1, this polyfill render prop support
   * may not be necessary.
   */
  public function registerBlocks() {
    // error_log("[BlockRegistrar] Registering blocks...");

    // Version check
    $has_render_prop_support = $this->capabilities_checker->hasRenderPropSupport();

    foreach( $this->block_def_paths as $block_def_path) {
      $full_block_def_path = $block_def_path;

      $block_def_contents = file_get_contents($full_block_def_path);
      $block_def_json = !empty($block_def_contents) ? json_decode($block_def_contents) : NULL;

      $render_prop = $block_def_json->render ?? NULL;

      $block_args = [];
      if (!$has_render_prop_support && !empty($render_prop)) {
        $matches = [];
        if (preg_match('/file\:(.+)/', $render_prop, $matches)) {
          $render_php_path = $matches[1];

          $is_relative_path = realpath($render_php_path) !== $render_php_path;
          if ($is_relative_path) {
            $block_dir_path = dirname($full_block_def_path);
            $render_php_path = realpath($block_dir_path . '/' . $render_php_path);
          }

          $plugin_base_dir = $this->plugin_base_dir;
          
          $block_args['render_callback'] = function($attributes, $content, $block) use ($render_php_path, $plugin_base_dir) {
            // error_log("[Render callback] Render callback script: " . $render_php_path);
            $render_script_output = include $render_php_path;
            return $render_script_output;
          };
        }
      }

      $block_register_result = register_block_type($full_block_def_path, $block_args);

      $is_register_success = $block_register_result !== FALSE;
      if (!$is_register_success) {
        error_log("[BlockRegistrar] Registration failed for block definition {$block_def_path}");
      }
    }
    // error_log("[BlockRegistrar] Done registering");
  }
}

?>