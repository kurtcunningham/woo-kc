<?php
namespace Gridible\Plugin\Core;

/*
  block.json registration values:

	"editorScript": "gridible-blocks/editor/script",
	"editorStyle": "gridible-blocks/editor/style",
	"style": "gridible-blocks/front/style"

*/


class WebAssetRegistrar {
  public static $dependency_filter = 'Gridible/Plugin/WebAssetRegistrar/dependency_filter';

  protected $plugin_base_dir;
  protected $plugin_base_dir_file;
  protected $handle_root = 'gridible-blocks';
  protected $handle_front_module = '@gridible/gridible-view';
  protected $handle_front_style = '';
  protected $handle_editor_script = '';
  protected $handle_editor_style = '';

  public function __construct($plugin_base_dir) {
    // Ensure that the plugin base dir has a trailing slash, which in turn
    // avoids errors when we build paths to individual assets.
    $this->plugin_base_dir = trailingslashit($plugin_base_dir);
    $this->plugin_base_dir_file = $plugin_base_dir . '/plugin.php';

    $this->handle_front_style = $this->handle_root . "/front/style";
    $this->handle_editor_script = $this->handle_root . "/editor/script";
    $this->handle_editor_style = $this->handle_root . "/editor/style";
  }

  public function register() {
    // Just registering assets here in the enqueue hooks. The actual
    // enqueueing is taken care of by the block.json registration for the
    // blocks.
    add_action('enqueue_block_assets', [$this, 'registerAssets'], 10);
    add_action('enqueue_block_editor_assets', [$this, 'registerAssets'], 10);
  }

  public function registerAssets(): bool {
    $registered_status = 'registered';

    wp_register_script_module(
      $this->handle_front_module,
      plugin_dir_url( GRIDIBLE_PLUGIN_FILE ) . 'dist/front.bundle.js',
      [
        [
          'id' => '@wordpress/interactivity',
          'import' => 'static',
        ],      
      ],
      GRIDIBLE_VERSION
    );

    // FIXME: Ideally, we don't enqueue our view scripts for every request.
    wp_enqueue_script_module( $this->handle_front_module );

    $front_css_success = wp_style_is($this->handle_front_style, $registered_status);
    if (!$front_css_success) {
      $front_styles_file_path = 'dist/front.css';
      $front_css_success = wp_register_style(
        $this->handle_front_style,
        plugins_url($front_styles_file_path, $this->plugin_base_dir_file),
        [],
        filemtime($this->plugin_base_dir . $front_styles_file_path)
      );
    }
    // FIXME: Ideally, we don't enqueue our view styles for every request. (but we need them for carousels)
    wp_enqueue_style( $this->handle_front_style );

    $editor_js_success = wp_script_is($this->handle_editor_script, $registered_status);
    if (!$editor_js_success) {
      $editor_bundle_file_path = 'dist/editor.bundle.js';
      $editor_js_success = wp_register_script(
        $this->handle_editor_script,
        plugins_url($editor_bundle_file_path, $this->plugin_base_dir_file),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
        filemtime( $this->plugin_base_dir . $editor_bundle_file_path ),
        true // Enqueue the script in the footer.
      );
    }

    $editor_css_success = wp_style_is($this->handle_editor_style, $registered_status);
    if (!$editor_css_success) {
      $editor_styles_file_path = 'dist/editor.css';
      $editor_css_success = wp_register_style(
        $this->handle_editor_style,
        plugins_url($editor_styles_file_path, $this->plugin_base_dir_file),
        ['wp-edit-blocks'],
        filemtime($this->plugin_base_dir . $editor_styles_file_path)
      );
    }

    // Indicate that registration is complete, if it was successful.
    $is_registration_success = $front_css_success && $editor_js_success && $editor_css_success;

    return $is_registration_success;
  }
}

?>
