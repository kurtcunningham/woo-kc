<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class RelatedPostsVariation {
  public static string $ROOT_BLOCK = 'core/query';

  public static function register() {
    add_filter(
      'pre_render_block', 
      [self::class, 'filterPreRenderBlock'], 
      10, 
      3
    );

    add_filter(
      'block_type_metadata', 
      function($metadata) {
        if (($metadata['name'] ?? []) !== self::$ROOT_BLOCK) {
          return $metadata;
        }

        $attributes = $metadata['attributes'] ?? [];

        $attributes['taxonomySlug'] = [
          'type' => 'string',
          'default' => 'category',
        ];
        $attributes['includeChildren'] = [
          'type' => 'boolean',
          'default' => TRUE,
        ];
        $attributes['includeParents'] = [
          'type' => 'boolean',
          'default' => TRUE,
        ];

        $metadata['attributes'] = $attributes;

        return $metadata;
      },
      10,
      1
    );
  }

  public static function filterPreRenderBlock(
    string|null $pre_render, 
    array $parsed_block, 
    \WP_Block|null $parent_block
  ): string|null {
    $variation_name = 'amplify/related-posts-query';
    if ($variation_name === ($parsed_block['attrs']['namespace'] ?? NULL)) {
      $query_loop_query_id = $parsed_block['attrs']['queryId'] ?? FALSE;

      if ($query_loop_query_id !== FALSE) {
        add_filter(
          'query_loop_block_query_vars',
          function($query, $block) use ($parsed_block, $query_loop_query_id) {
            $block_query_id = $block->context['queryId'] ?? NULL;

            if ($block_query_id !== $query_loop_query_id) {
              return $query;
            }

            $queried_object = get_queried_object();

            $terms_tax_query = [];
            $terms = NULL;

            if ($queried_object instanceof \WP_Post) {
              $taxonomy_slug = $parsed_block['attrs']['taxonomySlug'] ?? 'category';
              $taxonomy = get_taxonomy($taxonomy_slug);

              $terms = get_the_terms($queried_object->ID, $taxonomy_slug);
            } elseif ($queried_object instanceof \WP_Term) {
              $taxonomy = get_taxonomy($queried_object->taxonomy);
              $taxonomy_slug = $queried_object->taxonomy;

              $terms = [$queried_object];
            }

            if (empty($terms)) {
              return $query;
            }
            
            $is_taxonomy_hierarchical = $taxonomy?->hierarchical || FALSE;
            $include_children = $is_taxonomy_hierarchical
              ? $parsed_block['attrs']['includeChildren'] ?? TRUE
              : FALSE;
            $include_parents = $is_taxonomy_hierarchical
              ? $parsed_block['attrs']['includeParents'] ?? TRUE
              : FALSE;

            $terms_tax_query = self::buildTermsTaxQuery(
              $terms, 
              $taxonomy_slug, 
              $include_children, 
              $include_parents,
            );
            
            if (!empty($terms_tax_query)) {
              // Safely get the existing tax_query or create a new one.
              $tax_query = $query['tax_query'] ?? [];

              $tax_query[] = $terms_tax_query;

              $query['tax_query'] = $tax_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
            }

            return $query;
          },
          10,
          2
        );
      }
    }

    return $pre_render;
  }

  public static function buildTermsTaxQuery(
    array $terms, 
    string $taxonomy_slug, 
    bool $include_children = FALSE, 
    bool $include_parents = FALSE,
  ): array {
    $terms_tax_query = [];

    foreach ($terms as $term) {
      $term_ids = $include_parents 
        ? get_ancestors($term->term_id, $taxonomy_slug, 'taxonomy') 
        : [];
      $term_ids[] = $term->term_id; // Add the current term ID to the array

      $terms_tax_query[] = [
        'taxonomy' => $taxonomy_slug,
        'field' => 'term_id',
        'terms' => $term_ids,
        'include_children' => $include_children,
        'operator' => 'IN',
      ];
    }

    if (count($terms_tax_query) > 1) {
      $terms_tax_query['relation'] = 'OR';
    }

    return $terms_tax_query;
  }
}
