<?php
namespace mbm\theme\web;


class AlpineRegistrar implements \mbm\theme\AutoRegister {
  // Hook names
  public static $dependency_filter = 'mbm/AlpineRegistrar/dependency_filter';
  public static $url_filter = 'mbm/AlpineRegistrar/url_filter';
  public static $version_filter = 'mbm/AlpineRegistrar/version_filter';

  public static $script_handle = 'alpine';
  public static $defaul_alpine_url = 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js';

	public function register() {
		add_action('wp_enqueue_scripts', [$this, 'registerPublicAssets']);
	}

  public function registerPublicAssets() {
    // Default dependency is theme default web assets
    $default_dependencies = [ThemeDefaultWebAssetsRegistrar::getScriptHandle()];

    // Customize dependencies
    $script_dependencies = apply_filters(self::$dependency_filter, $default_dependencies);

    // Get Alpine URL and version
    $alpine_url = apply_filters(self::$url_filter, self::$defaul_alpine_url);
    $alpine_version = apply_filters(self::$version_filter, NULL);

    wp_enqueue_script(
      self::$script_handle,
      $alpine_url,
      $script_dependencies,
      $alpine_version,
      // Enqueue in footer
      TRUE
    );
  }
}
?>
