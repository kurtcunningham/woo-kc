<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
// require_once(get_template_directory() . '/vendor/autoload.php');

$wrapper_attrs = get_block_wrapper_attributes();
$namespace = 'demo/counter-global-v2';

wp_store([
  'state' => [
    $namespace => [
      'counter' => 21,
    ]
  ]
]);

echo $content;

?>
