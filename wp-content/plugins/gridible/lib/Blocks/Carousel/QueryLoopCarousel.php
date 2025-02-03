<?php
namespace Gridible\Plugin\Blocks\Carousel;

class QueryLoopCarousel {
  public static function register() {
    add_filter(
      'render_block_core/post-template',
      [self::class, 'filterPostTemplateRenderBlock'],
      10,
      3
    );

    add_filter(
      'block_type_metadata',
      function(array $metadata): array {
        if ($metadata['name'] === 'core/post-template') {
          $parent = &$metadata['parent'];
          $parent[] = 'gridible/multipurpose-carousel-container';

          // WARN: This solves a block inserter problem, but isn't technically correct. 
          // $metadata['ancestor'] = 'gridible/multipurpose-carousel-container';

          $uses_context = &$metadata['usesContext'];
          $uses_context[] = 'gridible/carouselType';

          return $metadata;
        }

        return $metadata;
      }
    );
  }

  public static function filterPostTemplateRenderBlock(
    string $block_content, 
    array $block, 
    \WP_Block $instance
  ): string {
    $carousel_type = $instance->context["gridible/carouselType"] ?? NULL;
    if ($carousel_type !== 'static' && $carousel_type !== 'query') {
      return $block_content;
    }

    $tag_proc = new \WP_HTML_Tag_Processor($block_content);

    $tag_found = $tag_proc->next_tag([
      'tag_name' => 'ul',
      'class_name' => 'wp-block-post-template',
    ]);
    $tag_proc->add_class('swiper-wrapper');
    
    $tag_query = [
      'tag_name' => 'li',
      'class_name' => 'wp-block-post',
    ];
    while ($tag_proc->next_tag($tag_query)) {
      $tag_proc->add_class('swiper-slide');
    }

    return $tag_proc->get_updated_html();
  }
}
