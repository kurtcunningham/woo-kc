<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class SinglePostVariation {
  public static function register() {
    add_filter(
      'pre_render_block', 
      [self::class, 'filterPreRenderBlock'], 
      10, 
      2
    );
  }

  public static function filterPreRenderBlock($pre_render, $parsed_block) {
    $variation_name = 'mbm/single-post-query';
    if ($variation_name === ($parsed_block['attrs']['namespace'] ?? NULL)) {
      $query_loop_query_id = $parsed_block['attrs']['queryId'] ?? FALSE;

      if ($query_loop_query_id !== FALSE) {
        add_filter(
          'query_loop_block_query_vars',
          function($query, $block) use ($parsed_block, $query_loop_query_id) {
            $block_query_id = $block->context['queryId'] ?? NULL;

            if ($block_query_id === $query_loop_query_id) {
              // Look to the current block context to find the configured include 
              // value.
              $include_val = $block->context['query']['include'] ?? NULL;
              
              if (!empty($include_val)) {
                $query['post__in'] = $include_val;
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
}

?>
