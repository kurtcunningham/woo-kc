<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class ExcludePostQuery {
  public static function register() {
    add_filter(
      'pre_render_block', 
      [self::class, 'filterPreRenderBlock'], 
      10, 
      2
    );

    add_filter(
      'posts_results',
      [self::class, 'filterPostsResults'],
      5,
      2
    );
  }

  public static function filterPreRenderBlock($pre_render, $parsed_block) {
    // Only investigate Query Loop blocks.
    if ($parsed_block['blockName'] !== 'core/query') {
      return $pre_render;
    }

    $is_configured_exclude_curr_post = $parsed_block['attrs']['isCurrPostExcluded'] ?? FALSE;

    if ($is_configured_exclude_curr_post === TRUE) {
      $query_loop_query_id = $parsed_block['attrs']['queryId'] ?? FALSE;
      $post_exclusion_method = $parsed_block['attrs']['postExclusionMethod'] ?? 'cache-friendly';
      $use_pagination_safe_method = $post_exclusion_method === 'pagination-friendly';

      if ($query_loop_query_id !== FALSE) {
        add_filter(
          'query_loop_block_query_vars',
          function($query, $block) use ($parsed_block, $query_loop_query_id, $use_pagination_safe_method) {
            global $post;

            $block_query_id = $block->context['queryId'] ?? NULL;

            if (
              ($block_query_id === $query_loop_query_id)
              && (isset($post?->ID))
            ) {
              if ($use_pagination_safe_method) {
                $query['post__not_in'] = [$post?->ID];
              } else {
                $query['excludeCurrentPost'] = [
                  'ID' => $post?->ID,
                  'original_posts_per_page' => $query['posts_per_page'],
                ];
                $query['posts_per_page'] = $query['posts_per_page'] + 1;
              }
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

  public static function filterPostsResults(array $posts, \WP_Query $query) {
    $exclude_current_post = $query->get('excludeCurrentPost');

    // Don't procesd if we don't have an exclude post configuration.
    if (empty($exclude_current_post)) {
      return $posts;
    }

    // Skip early if the posts are empty.
    if (empty($posts)) {
      return $posts;
    }
    
    $filtered_posts = [];
    $original_posts_per_page = $exclude_current_post['original_posts_per_page'];
    while (!empty($posts) && count($filtered_posts) < $original_posts_per_page) {
      $post = array_shift($posts);
      if ($post->ID !== $exclude_current_post['ID']) {
        $filtered_posts[] = $post;
      }
    }

    return $filtered_posts;
  }
}

?>
