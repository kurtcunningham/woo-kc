<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;

use voku\helper\HtmlDomParser;


class QueryFilterSubmitButton {
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

      if ($form_role === 'submit') {
        // $wp_content = self::updateContentWP($block_content);
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
    $anchor_el->setAttribute('data-wp-on--click', 'actions.onSubmit');

    return $html_dom->html();
  }

  public static function updateContentWP(string $block_content): string {
    // Tag processing hints from: https://gutenberg.10up.com/guides/html-tag-processor/

    $button = new \WP_HTML_Tag_Processor($block_content);

    // Perform a lookup for the anchor tag 
    $query = [
      'tag_name' => 'A',
    ];

    $button->next_tag($query);
    $button->set_attribute('data-wp-interactive', "{ \"namespace\": \"amplifyQueryFilter\" }");

    return $button->get_updated_html();
  }
}

?>
