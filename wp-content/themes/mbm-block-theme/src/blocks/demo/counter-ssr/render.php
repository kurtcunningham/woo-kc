<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
// require_once(get_template_directory() . '/vendor/autoload.php');

$wrapper_attrs = get_block_wrapper_attributes();
$namespace = 'demo/counter-ssr';
?>

<div
	<?= $wrapper_attrs ?>
	data-wp-interactive
	data-wp-context='{ "<?= $namespace ?>": { "counter": 0 } }'
	data-wp-effect="effects.<?= $namespace ?>.logCounter"
>
  <h6>SSR Counter, JS Store</h6>
  <p>Counter: <span data-wp-text="context.<?= $namespace ?>.counter">???</span></p>
  <button
    data-wp-on--click="actions.<?= $namespace ?>.increaseCount"
  >Increase</button>
</div>
