<?php
namespace mbm\theme\gutenberg;

class CustomBlockPatternCategoriesRegistrar implements \mbm\theme\AutoRegister {
  public function __construct(protected ?string $categories_json_path = null) {
    $this->categories_json_path = $categories_json_path;
  }

  public function register() {
    add_action('init', [$this, 'attemptRegistration'], 10);
  }

  public function attemptRegistration() {
    // If we don't have a categories JSON path, then try to find it.
    if (empty($this->categories_json_path)) {
      $this->categories_json_path = get_stylesheet_directory() . '/patterns/categories.json';
    }
    $json_exists = file_exists($this->categories_json_path);

    $categories = [];
    if ($json_exists) {
      $json_contents = file_get_contents($this->categories_json_path);
      $json_data = json_decode($json_contents);

      if (!empty($json_data)) {
        // Convert JSON categories data to a more usable format.
        $category_configs = array_reduce(
          $json_data,
          function($carry, $item) {
            $carry[$item->slug] = [
              'label' => $item->label,
            ];

            return $carry;
          },
          []
        );

        $this->registerCategories($category_configs);
      }
    }
  }

  public function registerCategories($category_configs = []) {
    foreach ($category_configs as $cat_slug => $cat_config_values) {
      register_block_pattern_category($cat_slug, $cat_config_values);
    }
  }
}
?>
