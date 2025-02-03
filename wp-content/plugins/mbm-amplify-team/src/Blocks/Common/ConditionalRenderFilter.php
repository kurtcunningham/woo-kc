<?php
namespace MBM\Amplify\Team\Blocks\Common;


class ConditionalRenderFilter {
  public static function registerPostContextFilter(
    string $target_block_slug, 
    string $target_variant_slug, 
    string|array $meta_keys,
    string $target_post_type = NULL,
  ): void {
    add_filter(
      'render_block_' . $target_block_slug, 
      // 'render_block', 
      function(
        string $block_content,
        array $block,
        \WP_Block $instance,
      ) use ($target_block_slug, $target_variant_slug, $meta_keys, $target_post_type): string {
        $block_name = $block['blockName'] ?? '';
        $block_amp_variant = $block['attrs']['amplifyVariation'] ?? '';

        if (
          ($block_name !== $target_block_slug) ||
          ($block_amp_variant !== $target_variant_slug)
        ) {
          return $block_content;
        }
    
        $empty_response = '';

        if ($target_post_type !== NULL) {
          $context_post_type = $instance?->context["postType"] ?? '';

          if ($context_post_type !== $target_post_type) {
            return $empty_response;
          }
        }

        $context_post_id = $instance?->context["postId"] ?? FALSE;
        if (!is_integer($context_post_id)) {
          return $empty_response;
        }
  
        if (is_string($meta_keys)) {
          $meta_keys = [$meta_keys];
        }

        foreach ($meta_keys as $meta_key) {
          $meta_value = get_post_meta($context_post_id, $meta_key, TRUE);
          
          if (empty($meta_value)) {
            // No value, don't render the block.
            return $empty_response;
          }
        }
    
        return $block_content;
      },
      10,
      3
    );
  }
}

?>
