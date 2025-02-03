<?php
namespace madebymunsters\BlockTheme;


class ThemeWebAssetsRegistrar {
	public function register() {
		add_action(
      'wp_enqueue_scripts', 
      [$this, 'enqueueFrontAssets'],
    );

		add_action(
      // WARN: The hook enqueue_block_editor_assets seems appropriate, but 
      // enqueuing stylesheets here throws a warning when the site editor 
      // preview is using an iframe.
      // 'enqueue_block_editor_assets', 

      // Use enqueue_block_assets hook, but guard against loading these
      // admin/editor assets on the guest side with an `is_admin()` check.
      'enqueue_block_assets',
      [$this, 'enqueueAdminAssets'],
    );
	}

  public function enqueueFrontAssets() {
    $url_root = get_template_directory_uri();

    $asset_root_file_path = get_theme_file_path();
    
    // Version should match the current theme version.
    $active_theme = wp_get_theme();
    $root_theme = $active_theme->parent()
      ? $active_theme->parent()
      : $active_theme;
    $front_asset_version = $root_theme->get('Version');

    if (function_exists('wp_register_script_module')) {
      wp_register_script_module(
        'mbm-theme-view',
        $url_root . '/front.bundle.js',
        ['@wordpress/interactivity'],
        $front_asset_version,
      );
  
      // FIXME: Ideally, we don't enqueue our view scripts for every request.
      wp_enqueue_script_module( 'mbm-theme-view' );
    }
    
    // Theme Marketing - Stylesheets
    $style_file_name = 'style.css';

    wp_enqueue_style(
      'theme_front_style',
      $url_root . '/' . $style_file_name,
      [],
      $front_asset_version
    );
  }
  
  public function enqueueAdminAssets() {
    // We're expecting this action handling to fire for both admin and guest
    // requests, but we should only be serving these assets to the Gutenberg
    // editor.
    if (!is_admin()) {
      return;
    }

    $url_root = get_template_directory_uri();

    $asset_root_file_path = get_theme_file_path();

    // Theme Marketing - Primary JS bundle
    $script_file_name = 'editor.bundle.js';
    // Base version on file's last modified time
    $script_version = strval(filemtime($asset_root_file_path . '/' . $script_file_name));
    
    wp_enqueue_script(
      'theme_editor_script',
      $url_root . '/' . $script_file_name,
      ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
      $script_version,
      // Enqueue in footer
      TRUE
    );   

    // Theme Marketing - Stylesheets
    $style_file_name = 'editor.css';
    // Base version on file's last modified time$script_version
    $style_version = strval(filemtime($asset_root_file_path . '/' . $style_file_name));

    wp_enqueue_style(
      'theme_editor_style',
      $url_root . '/' . $style_file_name,
      [],
      $style_version
    );
  }
}
?>
