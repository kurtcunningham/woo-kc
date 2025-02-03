<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class SelectedPostVariation {
  public static function register() {
    add_filter(
      'pre_render_block', 
      [self::class, 'filterPreRenderBlock'], 
      10, 
      3
    );
  }

  public static function filterPreRenderBlock(
    string|null $pre_render, 
    array $parsed_block, 
    \WP_Block|null $parent_block
  ): string|null {
    $variation_name = 'mbm/selected-post-query';
    if ($variation_name === ($parsed_block['attrs']['namespace'] ?? NULL)) {
      $query_loop_query_id = $parsed_block['attrs']['queryId'] ?? FALSE;

      if ($query_loop_query_id !== FALSE) {
        add_filter(
          'query_loop_block_query_vars',
          function($query, $block) use ($parsed_block, $query_loop_query_id) {
            $block_query_id = $block->context['queryId'] ?? NULL;

            if ($block_query_id === $query_loop_query_id) {
              // Look to the current block context to find the configured 
              // include value.
              $include_val = $block->context['query']['include'] ?? NULL;

              // Copy the randomize results config into the query args, 
              // where the posts_results filter can find and act on them.
              $query['randomizeResults'] = $block->context['query']['randomizeResults'] ?? FALSE;

              if (!empty($include_val)) {
                $query['post__in'] = $include_val;

                $query['orderby'] = 'post__in';
              }
            }

            return $query;
          },
          10,
          2
        );

        add_filter(
          'posts_results', 
          function(array $posts, \WP_Query $query): array {
            $randomize_results = $query->query['randomizeResults'] ?? FALSE;
            if ($randomize_results === TRUE) {
              shuffle($posts);
            }

            return $posts;
          },
          10,
          2
        );
      }
    }

    return $pre_render;
  }
}

?>
