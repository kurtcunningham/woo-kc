<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
require_once(MBM_GUTENBLOCKS_PLUGIN_DIR . '/vendor/autoload.php');


$carousel_query_block = new \Madebymunsters\Gutenblocks\Core\Blocks\CarouselQuery();

echo $carousel_query_block->renderCallback($attributes, $content, $block);

?>