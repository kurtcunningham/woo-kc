<?php
namespace mbm\theme\web;


class ThemeGutenblocksRegistrar implements \mbm\theme\AutoRegister {
	public string $theme_name;
  
  // Hook names
  public static $url_root_filter = 'mbm/ThemeDefaultWebAssetsRegistrar/url_root_filter';
  public static $containing_dir_filter = 'mbm/ThemeDefaultWebAssetsRegistrar/containing_dir_filter';

  public function __construct($theme_name = 'mbm') {
    $this->theme_name = $theme_name;
  }

  public function register() {
		add_action('enqueue_block_editor_assets', [$this, 'registerBlockEditorAssets']);
  }

  public function registerBlockEditorAssets() {
    // Begin with defaults.
    $url_root = get_template_directory_uri();
    $containing_dir_path = get_template_directory();

    // Conditionally apply filters to support customization.
    if (function_exists('apply_filters')) {
      // Customize URL root
      $filtered_url_root = apply_filters(self::$url_root_filter, $url_root);
      $url_root = $filtered_url_root;

      // Customize containing directory path
      $containing_dir_path = apply_filters(self::$containing_dir_filter, $containing_dir_path);
    }

    $block_asset_name_prefix = "{$this->theme_name}_theme_gb_";

    $block_styles_name = "{$block_asset_name_prefix}css";
    $block_styles_file_path = 'blocks.css';
		wp_register_style(
			$block_styles_name,
			$url_root . '/' . $block_styles_file_path,
			['wp-editor'],
			// Version: File modification time.
			filemtime( $containing_dir_path . DIRECTORY_SEPARATOR . $block_styles_file_path )
		);
		
    $block_js_name = "{$block_asset_name_prefix}js";
		$block_js_file_path = 'blocks.module.js';
		wp_register_script(
			$block_js_name,
			$url_root . '/' . $block_js_file_path,
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
			// Version: File modification time.
			filemtime( $containing_dir_path . DIRECTORY_SEPARATOR . $block_js_file_path ),
			true // Enqueue the script in the footer.
		);

    $block_editor_styles_name = "{$block_asset_name_prefix}editor_css";
		$block_editor_styles_file_path = 'style-editor.css';
		wp_register_style(
      $block_editor_styles_name,
			$url_root . '/' . $block_editor_styles_file_path,
			['wp-edit-blocks'],
			filemtime( $containing_dir_path . DIRECTORY_SEPARATOR . $block_editor_styles_file_path )
		);

	 	register_block_type(
	 		"{$this->theme_name}/theme-gutenblocks",
      [
	 			// Enqueue block styles on both frontend & backend.
	 			'style'         => $block_styles_name,
	 			// Enqueue block JS in the editor only.
	 			'editor_script' => [$block_js_name],
	 			// Enqueue block editor styles in the editor/admin only.
	 			'editor_style'  => $block_editor_styles_name,
      ]
	 	);
  }
}