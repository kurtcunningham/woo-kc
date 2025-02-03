<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class TaxonomyFilter {
  public static function register() {
    add_filter(
      'query_loop_block_query_vars',
      [self::class, 'alterQueryLoopQueryVars'],
      10,
      2
    );
  }

  public static function alterQueryLoopQueryVars(array $query, \WP_Block $block): array {
    $amp_filter_taxonomies = $block->context['query']['ampTaxonomies'] ?? NULL;
    $query_id = $block->context['queryId'];

    if (empty($amp_filter_taxonomies) || empty($query_id)) {
      return $query;
    }

    $tax_query = $query['tax_query'] ?? [];

    foreach ($amp_filter_taxonomies as $taxonomy_slug => $filter_config) {
      // WARN: This is a problem, as the filter config should never be 
      // anything other than an array.
      if (!is_array($filter_config) || empty($filter_config)) {
        continue;
      }

      // $taxonomy_slug = $filter_config['taxonomySlug'];
      $query_param_key = "query-{$query_id}-{$taxonomy_slug}";
      $query_param_value_raw = trim(sanitize_text_field($_GET[$query_param_key] ?? NULL));

      if (empty($query_param_value_raw)) {
        continue;
      }

      $query_param_values = array_filter(
        explode(',', $query_param_value_raw),
        function($value) {
          return !empty(trim($value));
        }
      );

      if (empty($query_param_values)) {
        continue;
      }

      $terms_operator = $filter_config['termsOperator'] ?? 'IN';

      $tax_query[] = [
        'taxonomy' => $taxonomy_slug,
        'field' => 'slug',
        'terms' => $query_param_values,
        'include_children' => TRUE,
        'operator' => $terms_operator,
      ];
    }

    // Default to AND for now.
    $tax_query['relation'] = 'AND';

    $query['tax_query'] = $tax_query;

    return $query;
  }

  public static function getTermsTree(string $taxonomy_slug): array {
    $term_query = new \WP_Term_Query([
      'taxonomy' => $taxonomy_slug,
      'orderby' => 'name',
      'order' => 'ASC',
      'hide_empty' => FALSE,
      'hierarchical' => TRUE,
    ]);
    $flat_term_options = $term_query->get_terms();
    $flat_term_options = array_map(
      function($term) {
        return (object) [
          'id' => $term->term_id,
          'parent' => $term->parent,
          'name' => $term->name,
          'slug' => $term->slug,
          'children' => [],
        ];
      },
      $flat_term_options
    );
    $terms_id_map = array_reduce(
      $flat_term_options,
      function($acc, $term) {
        $acc[$term->id] = $term;
        return $acc;
      },
      []
    );

    $term_options_tree = [];
    foreach ($flat_term_options as $term) {
      if ($term->parent === 0) {
        $term_options_tree[] = $term;
        continue;
      }

      $parent = $terms_id_map[$term->parent] ?? NULL;
      if (empty($parent)) {
        continue;
      }

      $parent->children[] = $term;
    }

    return $term_options_tree;

    /* 
      $flat_term_options = $term_query->get_terms();
      $flat_term_options = array_map(
        function($term) {
          return (object) [
            'id' => $term->term_id,
            'parent' => $term->parent,
            'name' => $term->name,
            'slug' => $term->slug,
            'children' => [],
          ];
        },
        $flat_term_options
      );

      $term_options_tree = [];

      while (!empty($flat_term_options)) {
        $term = array_shift($flat_term_options);

        if ($term->parent === 0) {
          $term_options_tree[] = $term;
          continue;
        }

        $parent_index = array_search($term->parent, array_column($term_options_tree, 'id'));

        if ($parent_index !== FALSE) {
          $term_options_tree[$parent_index]->children[] = $term_object;
          continue;
        }

        $flat_term_options[] = $term;
      }

      while (!empty($orphan_terms)) {
        $orphan_term = array_shift($orphan_terms);

        $parent_index = array_search($orphan_term->parent, array_column($term_options_tree, 'id'));

        if ($parent_index !== FALSE) {
          $term_options_tree[$parent_index]->children[] = $orphan_term;
          continue;
        }

        $orphan_terms[] = $orphan_term;
      }
    */
  }
}

?>
