<?php
namespace madebymunsters\BlockTheme\Blocks;


class CounterPHPStore {
  public static function register() {
    // add_filter(
    //   'render_block', 
    //   [self::class, 'filterRenderBlock'], 
    //   10,
    //   3
    // );

    // add_action(
    //   'init',
    //   function() {
    //     if (function_exists('wp_store')) {
    //       wp_store([
    //         'state' => [
    //           'counter-php-store-v1' => [
    //             'counter' => 37,
    //           ]
    //         ]
    //       ]);
    //     }
    //   }
    // );
  }

  public static function filterRenderBlock($block_content, $block, $block_instance) {
    // Filter by block type
    if ($block['blockName'] === 'demo/counter-php-store') {
      if (function_exists('wp_store')) {
        wp_store([
          'state' => [
            'counter-php-store-v1' => [
              'counter' => 37,
            ]
          ]
        ]);
      }
    }

    return $block_content;
  }
}

?>
