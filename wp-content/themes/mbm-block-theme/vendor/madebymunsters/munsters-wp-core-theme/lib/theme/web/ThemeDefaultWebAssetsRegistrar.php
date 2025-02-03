<?php
namespace mbm\theme\web;


class ThemeDefaultWebAssetsRegistrar implements \mbm\theme\AutoRegister {
  // Hook names
  public static $url_root_filter = 'mbm/ThemeDefaultWebAssetsRegistrar/url_root_filter';
  public static $dependency_filter = 'mbm/ThemeDefaultWebAssetsRegistrar/dependency_filter';
  public static $handle_prefix_filter = 'mbm/ThemeDefaultWebAssetsRegistrar/handle_prefix_filter';

  public static $main_script_handle = 'theme_main_script';
  public static $main_styles_handle = 'theme_main_styles';
  public static $default_dependencies = [
    'script' => [],
    'styles' => [],
  ];
  public static $default_handle_prefix = '';

	public function register() {
    // V1
		// add_action('wp_enqueue_scripts', [$this, 'registerPublicAssets']);

    // V2
		// add_action('enqueue_block_assets', [$this, 'registerPublicAssets']);

    // V3
		// add_action('wp_enqueue_scripts', [$this, 'enqueueBlockEditorAssets']);
		// add_action('enqueue_block_assets', [$this, 'enqueuePublicAssets']);

    // V4
		// add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
		add_action('enqueue_block_assets', [$this, 'enqueuePublicAssets']);
	}

  public function enqueueBlockEditorAssets() {
    $this->registerAssets();

    wp_enqueue_script(self::getScriptHandle());
  }
  
  public function enqueuePublicAssets() {
    $this->registerAssets();
    
    wp_enqueue_script(self::getScriptHandle());

    // Only enqueue public styles on non-admin requests.
    if (!is_admin()) {
      wp_enqueue_style(self::getStylesHandle());
    }
  }

  protected function registerAssets() {
    // Begin with defaults.
    $url_root = get_template_directory_uri();
    $dependencies = self::$default_dependencies;
    $handle_prefix = self::$default_handle_prefix;

		// error_log("[#assets] url_root: {$url_root}");
		// error_log("[#assets] get_theme_file_path: " . get_theme_file_path());
    $asset_root_file_path = get_theme_file_path();

    // Apply filters to support customization.
    // Customize URL root
    $filtered_url_root = apply_filters(self::$url_root_filter, $url_root);
    $url_root = $filtered_url_root;

    // Customize dependencies
    $dependencies = apply_filters(self::$dependency_filter, self::$default_dependencies);

    // Customize handle prefix
    $handle_prefix = apply_filters(self::$handle_prefix_filter, self::$default_handle_prefix);

    // Theme Marketing - Primary JS bundle
    $script_file_name = 'front.module.js';
    // Base version on file's last modified time
    $script_version = strval(filemtime($asset_root_file_path . '/' . $script_file_name));
    // error_log("[#assets] script version: {$script_version}");

    wp_register_script(
      self::getScriptHandle(),
      $url_root . '/' . $script_file_name,
      $dependencies['script'] ?? [],
      $script_version,
      // Enqueue in footer
      TRUE
    );
    
    // Theme Marketing - Stylesheets
    $style_file_name = 'style.css';
    // Base version on file's last modified time$script_version
    $style_version = strval(filemtime($asset_root_file_path . '/' . $style_file_name));
    // error_log("[#assets] style version: {$style_version}");

    wp_register_style(
      self::getStylesHandle(),
      $url_root . '/' . $style_file_name,
      $dependencies['styles'] ?? [],
      $style_version
    );
  }

  public static function getScriptHandle() {
    // Customize handle prefix
    $handle_prefix = apply_filters(self::$handle_prefix_filter, self::$default_handle_prefix);

    return $handle_prefix . self::$main_script_handle;
  }

  public static function getStylesHandle() {
    // Customize handle prefix
    $handle_prefix = apply_filters(self::$handle_prefix_filter, self::$default_handle_prefix);

    return $handle_prefix . self::$main_styles_handle;
  }
}
?>
