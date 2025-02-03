<?php
namespace mbm\theme;


class SiteLogin implements \mbm\theme\AutoRegister {
  public static $logo_path_filter = 'mbm/SiteLogin/logo_path_filter';
  public static $default_site_logo_path = 'images/site-logo.png';
  
  public function register() {
		add_action('login_enqueue_scripts', [$this, 'siteLoginLogo']);
    add_action('login_headerurl', [$this, 'siteLoginLogoUrl']);
  }

  public function siteLoginLogo() {
    $default_site_logo_url = get_stylesheet_directory_uri() . '/' . self::$default_site_logo_path;
    $site_logo_path = $default_site_logo_url;

    if (function_exists('apply_filters')) {
      $filtered_logo_path = apply_filters(self::$logo_path_filter, $default_site_logo_url);
      $site_logo_path = $filtered_logo_path;
    }

    ?>
      <style type="text/css">
        #login h1 a, .login h1 a {
          background-image: url(<?= $site_logo_path ?>) !important;
          background-repeat: no-repeat;
          background-size: contain;
          height: auto;
          padding-bottom: 32px;
          width: 320px;
        }
      </style>
    <?php 
  }

  public function siteLoginLogoUrl() {
    return home_url();
  }
}

?>