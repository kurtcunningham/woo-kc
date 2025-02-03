<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;

use voku\helper\HtmlDomParser;


class QueryFilterClearButton {
  public static function register() {
    add_filter(
      'render_block', 
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
    if ($block['blockName'] === 'core/button') {
      $form_role = $block['attrs']['queryFilterForm_role'] ?? NULL;

      if ($form_role === 'clear') {
        $voku_content = self::updateContentVoku($block_content);

        $new_block_content = $voku_content;

        return $new_block_content;
      }
    }

    return $block_content;
  }

  public static function updateContentVoku(string $block_content): string {
    $html_dom = HtmlDomParser::str_get_html($block_content);

    $anchor_el = $html_dom->findOne('a');
    $anchor_el->setAttribute('data-wp-interactive', "{ \"namespace\": \"amplifyQueryFilter\" }");
    $anchor_el->setAttribute('data-wp-on--click', 'actions.onClear');

    return $html_dom->html();
  }
}

?>
