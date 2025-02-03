<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;

use voku\helper\HtmlDomParser;


class PostFeaturedImage {
  public static string $FIGCAPTION_WP_CLASS = 'wp-element-caption';
  public static string $FIGCAPTION_AMP_CLASS = 'amplify-post-featured-image-caption';
  public static string $FIGCAPTION_AMP_UNSTYLED_CLASS = 'amplify-post-featured-image-caption-unstyled';

  public static function register() {
    add_filter(
      'render_block_core/post-featured-image', 
      [self::class, 'filterRenderBlock'], 
      999, 
      3
    );
  }

  public static function filterRenderBlock(
    string $block_content, 
    array $block, 
    \WP_Block $instance,
  ): string {
    // Only act if the flag in `isDynamicCaptionVisible` is set to true.
    $is_dynamic_caption_visible = $instance->attributes['isDynamicCaptionVisible'] ?? false;
    if ($is_dynamic_caption_visible !== true) {
      return $block_content;
    }

    // Get the post ID from the block context.
    $post_id = $instance->context['postId'] ?? null;

    // If the post ID is not found, return the block content as is.
    if ($post_id === null) {
      return $block_content;
    }

    // Don't do anything if the block content is empty.
    if (empty(trim($block_content))) {
      return $block_content;
    }

    // Parse the block content and find the root figure.
    $html_dom = HtmlDomParser::str_get_html($block_content);
    $figure_el = $html_dom->findOneOrFalse('figure');

    // If the figure element is not found, return the block content as is.
    if ($figure_el === false) {
      return $block_content;
    }

    $img_el = $figure_el->findOneOrFalse('img');

    // If the img element is not found, return the block content as is.
    if ($img_el === false) {
      return $block_content;
    }

    // Get the featured image media post from the post ID.
    $thumbnail_media_post = get_post_thumbnail_id($post_id);
    // Get the excerpt from the featured image media post ID.
    $thumbnail_excerpt = get_the_excerpt($thumbnail_media_post);

    // If the except is empty, return the block content as is.
    if (empty(trim($thumbnail_excerpt))) {
      return $block_content;
    }

    // Example caption: 
    // <figcaption class="wp-element-caption">Foo bar</figcaption>
    $figcaption_classes = implode(
      ' ', 
      [
        self::$FIGCAPTION_WP_CLASS,
        self::$FIGCAPTION_AMP_CLASS,
        self::$FIGCAPTION_AMP_UNSTYLED_CLASS,
      ]
    );
    $figcaption_html = '<figcaption class="' . $figcaption_classes . '">' . $thumbnail_excerpt . '</figcaption>';

    // Combine the img element and the figcaption element into a single HTML string.
    $figure_inner_html = $img_el->html . $figcaption_html;
    $figure_el->innerHTML = $figure_inner_html;

    // Return the updated block content.
    return $html_dom->save();
  }
}
