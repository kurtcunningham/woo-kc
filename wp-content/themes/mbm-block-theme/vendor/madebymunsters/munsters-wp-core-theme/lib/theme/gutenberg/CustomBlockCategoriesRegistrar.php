<?php
namespace mbm\theme\gutenberg;

class CustomBlockCategoriesRegistrar implements \mbm\theme\AutoRegister {
  // Hook names
  public static $containing_dir_filter = 'mbm/CustomBlockCategoriesRegistrar/containing_dir_filter';
  
  public function register() {
    add_filter('block_categories_all', [$this, 'addCustomCategory'], 10, 2);
  }

  public function addCustomCategory($block_categories, $block_editor_context) {
    $containing_dir_path = get_template_directory();

    // Conditionally apply filters to support customization.
    if (function_exists('apply_filters')) {
      // Customize containing directory path
      $containing_dir_path = apply_filters(self::$containing_dir_filter, $containing_dir_path);
    }

    $gutenblocks_config_path = $containing_dir_path . DIRECTORY_SEPARATOR . 'gutenblocks.json';
    $gutenblocks_config_contents = file_get_contents($gutenblocks_config_path);
    
    if ($gutenblocks_config_path !== FALSE) {
      $gutenblocks_config = json_decode($gutenblocks_config_contents);

      if ($gutenblocks_config !== NULL && isset($gutenblocks_config->customCategory)) {
        $title = $gutenblocks_config->customCategory->title;
        
        $new_category = [
          'slug' => $gutenblocks_config->customCategory->slug,
          'title' => __($title),
        ];

        $block_categories = array_merge($block_categories, [$new_category]);
      }
    }

    return $block_categories;
  }
}
?>
