<?php
namespace mbm\theme\timber\Rendering;

use \Twig\Environment;
use \Timber\Loader;
use \Timber\LocationManager;


class TimberTwigRenderer {
  protected static function getCachedTwigEnvironment(): Environment {
    $cache_key = self::class . '::twig';
    $twig = wp_cache_get($cache_key);
    
    if ($twig === FALSE) {
      $caller = LocationManager::get_calling_script_dir(1);
      $loader = new Loader($caller);
      $twig = $loader->get_twig();
      
      $cache_updated = wp_cache_add($cache_key, $twig);
    }

    return $twig;
  }

  protected static function getCachedTwigTemplate($template_path) {
    $cache_key = self::class . '::twig_template::' . $template_path;
    $template = wp_cache_get($cache_key);
    
    if ($template === FALSE) {
      $twig = self::getCachedTwigEnvironment();
      $template = $twig->load($template_path);
      
      $cache_updated = wp_cache_add($cache_key, $template);
    }

    return $template;
  }

  public static function render($template_path, $data) {
    $template = self::getCachedTwigTemplate($template_path);
    $output = $template->render($data);

    return $output;
  }
}

?>
