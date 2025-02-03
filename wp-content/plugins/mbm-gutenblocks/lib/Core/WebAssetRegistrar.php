<?php
namespace Madebymunsters\Gutenblocks\Core;

/*
  block.json registration values:

  "editorScript": [
		"mbm-gutenblocks/editor/script_extra",
		"mbm-gutenblocks/editor/script"
	],
	"editorStyle": ["mbm-gutenblocks/editor/style"],
	"viewScript": ["mbm-gutenblocks/front/script"],
	"style": ["mbm-gutenblocks/front/style"]
*/


class WebAssetRegistrar {
  public static $dependency_filter = 'Madebymunsters/Gutenblocks/WebAssetRegistrar/dependency_filter';

  protected $plugin_base_dir_file;
  protected $plugin_base_dir;
  protected $handle_root = 'mbm-gutenblocks';
  protected $handle_front_module = '@mbm/mbm-gutenblocks-view';
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
    add_action('enqueue_block_assets', [$this, 'registerAssets'], 10);
    add_action('enqueue_block_editor_assets', [$this, 'registerAssets'], 10);
  }

  public function registerAssets() {
    if ($this->is_registered == TRUE) {
      return;
    }

    wp_register_script_module(
      $this->handle_front_module,
      plugin_dir_url( MBM_GUTENBLOCKS_PLUGIN_FILE ) . '/dist/front.bundle.js',
      array(
        array(
          'id' => '@wordpress/interactivity',
          'import' => 'static',
        ),
        // '@lodash/startCase', 
      ),
      MBM_GUTENBLOCKS_VERSION
    );

    // FIXME: Ideally, we don't enqueue our view scripts for every request.
    wp_enqueue_script_module( $this->handle_front_module );

    // TODO: these file presence checks are redundant, it'd be nice to have a
    // reusable conditional function wrapper here instead.

    $front_styles_file_path = 'dist/front.bundle.css';
    $front_css_success = FALSE;
    if (file_exists($this->plugin_base_dir . $front_styles_file_path)) {
      $front_css_success = wp_enqueue_style(
        $this->handle_front_style,
        plugins_url($front_styles_file_path, $this->plugin_base_dir_file),
        [],
        MBM_GUTENBLOCKS_VERSION
      );
    }

    $editor_bundle_file_path = 'dist/editor.bundle.js';
    $editor_js_success = FALSE;
    if (file_exists($this->plugin_base_dir . $editor_bundle_file_path)) {
      $editor_js_success = wp_register_script(
        $this->handle_editor_script,
        plugins_url($editor_bundle_file_path, $this->plugin_base_dir_file),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
        MBM_GUTENBLOCKS_VERSION,
        TRUE // Enqueue the script in the footer.
      );
    }

    $editor_styles_file_path = 'dist/editor.bundle.css';
    $editor_css_success = FALSE;
    if (file_exists($this->plugin_base_dir . $editor_styles_file_path)) {
      $editor_css_success = wp_register_style(
        $this->handle_editor_style,
        plugins_url($editor_styles_file_path, $this->plugin_base_dir_file),
        ['wp-edit-blocks'],
        MBM_GUTENBLOCKS_VERSION
      );
    }

    // Indicate that registration is complete, if it was successful.
    $this->is_registered = $front_css_success && $editor_js_success && $editor_css_success;
  }
}
