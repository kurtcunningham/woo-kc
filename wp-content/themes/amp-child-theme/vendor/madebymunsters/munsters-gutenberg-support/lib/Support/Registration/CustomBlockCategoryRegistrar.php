<?php
namespace Madebymunsters\Gutenberg\Support\Registration;


class CustomBlockCategoryRegistrar {
  public static function registerCategory(
    string $category_slug, 
    string $category_title,
    ArrayAddMethod $add_method = ArrayAddMethod::ADD_END,
    int $priority = 50,
  ): bool {
    return add_filter(
      'block_categories_all',
      function(array $block_categories, \WP_Block_Editor_Context $block_editor_context) use ($category_slug, $category_title, $add_method, $priority): array {
        $custom_category = [
          'slug' => $category_slug,
          'title' => $category_title,
        ];

        if ($add_method === ArrayAddMethod::ADD_START) {
          array_unshift($block_categories, $custom_category);
        } else {
          // Default to adding to the end.
          array_push($block_categories, $custom_category);
        }

        return $block_categories;
      },
      $priority,
      2
    );
  }
}
