<?php
namespace mbm\theme\acf;

class SafeOptionsRegistrar {
  public static $slug_key = 'menu_slug';
  public static $parent_slug_key = 'parent_slug';
  public static $children_key = 'children';

  public static function addOptionsPage($options_page_config) {
    // Quit early if ACF isn't enabled.
    if (!function_exists('acf_add_options_page')) {
      return;
    }

    // Create a slug, if one wasn't provided.
    if (!array_key_exists(self::$slug_key, $options_page_config)) {
      $options_page_config[self::$slug_key] = self::slugifyName($options_page_config['page_title']);
    }

    // Register options page with ACF.
    acf_add_options_page($options_page_config);

    $children = $options_page_config[self::$children_key] ?? NULL;
    if (!empty($children)) {
      $parent_slug = $options_page_config[self::$slug_key];

      foreach ($children as $child_page_config) {
        $child_page_config[self::$parent_slug_key] = $parent_slug;
        self::addOptionsPage($child_page_config);
      }
    }
  }

  public static function addPostTypeOptionsPage($options_page_config, $post_type) {
    if (!array_key_exists(self::$slug_key, $options_page_config)) {
      $options_page_config[self::$slug_key] = self::slugifyName(
        $options_page_config['page_title'],
        $post_type
      );
    }

    if (!array_key_exists(self::$parent_slug_key, $options_page_config)) {
      $options_page_config[self::$parent_slug_key] = "edit.php?post_type={$post_type}";
    }

    self::addOptionsPage($options_page_config);
  }

  public static function slugifyName($name, $prefix = '') {
    $slug = strtolower(str_replace(" ", "_", $name));
    
    if (empty($prefix)) {
      return $slug;
    }

    return "{$prefix}-{$slug}";
  }
}