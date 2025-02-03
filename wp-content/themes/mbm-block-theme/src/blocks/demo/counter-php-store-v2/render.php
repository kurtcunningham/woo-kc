<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
// require_once(get_template_directory() . '/vendor/autoload.php');

/*
$wrapper_attrs = get_block_wrapper_attributes();
$namespace = 'counterStoreV2';

wp_store([
  'state' => [
    $namespace => [
      'counter' => 21,
    ]
  ]
]);

echo $content;
// echo '<p>Render!</p>';
*/

/*
$wrapper_attributes = get_block_wrapper_attributes(
	array( 'class' => 'movie-search' )
);

// $namespace = 'wpmovies';
// $namespace = 'wp/Movies';
$namespace = 'counter-php-store-v2';

wp_store(
	array(
		'state' => array(
			$namespace => array(
        'searchValue' => 'Fishy',
			),
		),
	),
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<form>
    <p>Debug searchValue: <span data-wp-text="state.<?= $namespace ?>.searchValue">???</span></p>
		<label class="search-label" for="movie-search">Search for a movie</label>
		<input
			id="movie-search"
			type="search"
			name="s"
			role="search"
			inputmode="search"
			placeholder="Search for a movie..."
			required=""
			autocomplete="off"
			data-wp-bind--value="state.<?= $namespace ?>.searchValue"
			data-wp-on--input="actions.wpmovies.updateSearch"
			>
	</form>
</div>
*/

$wrapper_attributes = get_block_wrapper_attributes(
);

// $namespace = 'wpmovies';
// $namespace = 'wp/Movies';
// $namespace = 'counter-php-store-v2';
$namespace = 'counterStoreV2';

wp_store(
	array(
		'state' => array(
			$namespace => array(
        'counter' => 21,
			),
		),
	),
);

?>

<div
  <?= $wrapper_attributes ?>
  <?php /* 
  data-wp-interactive 
  */ ?>
>
  <h6>PHP Store Demo V2</h6>
  <p>Counter: <span data-wp-text="state.<?= $namespace ?>.counter">???</span></p>
  <button
    data-wp-on--click="actions.<?= $namespace ?>.increaseCount"
  >Increase</button>
</div>
