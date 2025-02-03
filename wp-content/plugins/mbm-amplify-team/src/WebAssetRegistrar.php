<?php
namespace MBM\Amplify\Team;


/*
  block.json registration values:

  "editorScript": "mbm-amp-teams/editor/script",
	"editorStyle": ["mbm-amp-teams/editor/style"],
	"style": "mbm-amp-teams/front/style"
*/

class WebAssetRegistrar {
  protected $plugin_base_dir_file;
  protected $plugin_base_dir;
  protected $handle_root = 'mbm-amp-teams';
  protected $handle_front_script = '';
  protected $handle_front_style = '';
  protected $handle_editor_script = '';
  protected $handle_editor_style = '';
  
  private $is_registered = FALSE;

  public function __construct($plugin_base_dir_file) {
    $this->plugin_base_dir_file = $plugin_base_dir_file;
    $this->plugin_base_dir = plugin_dir_path($plugin_base_dir_file);

    $this->handle_front_style = $this->handle_root . "/front/style";
    $this->handle_editor_script = $this->handle_root . "/editor/script";
    $this->handle_editor_style = $this->handle_root . "/editor/style";
  }

  public function register() {
    // Just registering assets here in the enqueue hooks. The actual 
    // enqueueing is taken care of by the block.json registration for the
    // blocks.
    add_action('enqueue_block_assets', [$this, 'registerAssets'], 10, 0);
    add_action('enqueue_block_editor_assets', [$this, 'registerAssets'], 10, 0);
    
    /*
      Always enqueue the editor script, as it's needed to provide the 
      block sidebar.

      However, we must only enqueue when in the block editor, nowhere else.
    */
    add_action(
      'enqueue_block_editor_assets', 
      function() {
        wp_enqueue_script($this->handle_editor_script);
      },
      10,
      0
    );
  }

  public function registerAssets() {
    if ($this->is_registered == TRUE) {
      return;
    }

    $assets_directory = 'assets/built';

    if (function_exists('wp_register_script_module')) {
      wp_register_script_module(
        $this->handle_root . '-view',
        plugins_url($assets_directory . '/front.bundle.js', $this->plugin_base_dir_file),
        ['@wordpress/interactivity'],
        '1.0.0'
      );
  
      // FIXME: Ideally, we don't enqueue our view scripts for every request.
      wp_enqueue_script_module( 'mbm-npt-events-view' );
    }

    // TODO: these file presence checks are redundant, it'd be nice to have a
    // reusable conditional function wrapper here instead.

    $front_styles_file_path = $assets_directory . '/front.bundle.css';
    $front_css_success = FALSE;
    if (file_exists($this->plugin_base_dir . $front_styles_file_path)) {
      $front_css_success = wp_register_style(
        $this->handle_front_style,
        plugins_url($front_styles_file_path, $this->plugin_base_dir_file),
        [],
        filemtime($this->plugin_base_dir . $front_styles_file_path)
      );
    }

    $editor_bundle_file_path = $assets_directory . '/editor.bundle.js';
    $editor_js_success = FALSE;
    if (file_exists($this->plugin_base_dir . $editor_bundle_file_path)) {
      $editor_js_success = wp_register_script(
        $this->handle_editor_script,
        plugins_url($editor_bundle_file_path, $this->plugin_base_dir_file),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
        filemtime($this->plugin_base_dir . $editor_bundle_file_path),
        TRUE // Enqueue the script in the footer.
      );
    }

    $editor_styles_file_path = $assets_directory . '/editor.bundle.css';
    $editor_css_success = FALSE;
    if (file_exists($this->plugin_base_dir . $editor_styles_file_path)) {
      $editor_css_success = wp_register_style(
        $this->handle_editor_style,
        plugins_url($editor_styles_file_path, $this->plugin_base_dir_file),
        ['wp-edit-blocks'],
        filemtime($this->plugin_base_dir . $editor_styles_file_path)
      );
    }

    // Indicate that registration is complete, if it was successful.
    $this->is_registered = $front_css_success && $editor_js_success && $editor_css_success;
  }
}

?>