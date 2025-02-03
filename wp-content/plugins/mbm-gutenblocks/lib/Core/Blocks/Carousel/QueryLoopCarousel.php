<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks\Carousel;

use voku\helper\HtmlDomParser;


class QueryLoopCarousel {
  public static function register() {
    add_filter(
      'block_type_metadata', 
      [self::class, 'filterGalleryBlocks'], 
      10,
      1
    );

    add_filter(
      'block_type_metadata', 
      [self::class, 'filterImageBlocks'], 
      10,
      1
    );

    add_filter(
      'render_block',
      [self::class, 'filterPostTemplateRenderBlock'],
      10,
      3
    );
  }

  public static function filterGalleryBlocks(array $metadata): array {
    if (($metadata['name'] ?? []) !== 'core/query') {
      return $metadata;
    }

    $provides_context = $metadata['providesContext'] ?? [];
    $provides_context['mbmVariation'] = 'mbmVariation';
    $metadata['providesContext'] = $provides_context;

    return $metadata;
  }

  public static function filterImageBlocks(array $metadata): array {
    if (($metadata['name'] ?? []) !== 'core/post-template') {
      return $metadata;
    }

    $uses_context = $metadata['usesContext'] ?? [];
    $uses_context[] = 'mbmVariation';
    $metadata['usesContext'] = $uses_context;

    return $metadata;
  }

  public static function filterPostTemplateRenderBlock(string $block_content, array $block, \WP_Block $instance): string {
    if ( $block['blockName'] !== 'core/post-template' ) {
      return $block_content;
    }

    $html_dom = HtmlDomParser::str_get_html($block_content);
    $post_template_root_el = $html_dom->findOne('.wp-block-post-template');
    // Or: $html_dom->getElementByClass('wp-block-post-template')

    $classes = $post_template_root_el->getAttribute('class');
    $classes = "{$classes} swiper-wrapper";
    $post_template_root_el->setAttribute('class', $classes);

    $post_elements = $html_dom->findMulti('.wp-block-post');
    foreach ($post_elements as $post_el) {
      $classes = $post_el->getAttribute('class');
      $classes = "{$classes} swiper-slide";
      $post_el->setAttribute('class', $classes);
    }

    return $html_dom->save();
    // return '<p>Temp tag...</p>';
  }
}

?>
