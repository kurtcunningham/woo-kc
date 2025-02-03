<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
// require_once(get_template_directory() . '/vendor/autoload.php');


// Get block wrapper attributes.
$wrapper_attrs = get_block_wrapper_attributes();

// Pagination page value retrieval copied from core/query-pagination-numbers block:
// https://github.com/WordPress/gutenberg/blob/1239fb6908daef315507843fe81909cd87bc379b/packages/block-library/src/query-pagination-numbers/index.php#L18
$page_key = isset( $block->context['queryId'] ) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page';
$cur_page = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];

// Build query
$query_args       = build_query_vars_from_query_block($block, $cur_page);
$query            = new WP_Query($query_args);

// Determine the post type of the query, and from there the single and plural
// post type names.
$post_type = $query->get('post_type') ?: 'post';
$singular_name = 'post';
$plural_name = 'posts';
$post_type_object = get_post_type_object($post_type);
if ($post_type_object !== null) {
  $singular_name = $post_type_object->labels->singular_name;
  $plural_name = $post_type_object->labels->name;
}

$posts_total = $query->found_posts;

// The post type name is singular if there is exactly one post, and plural otherwise.
$post_type_name = ($posts_total === 1) ? $singular_name : $plural_name;

if ($posts_total === 0) {
  ?>
    <p <?= $wrapper_attrs ?>>
      0 <?= $post_type_name ?> found
    </p>
  <?php
  return;
}

$posts_per_page = $query->get('posts_per_page');
$posts_range_low = (($cur_page - 1) * $posts_per_page) + 1;
$posts_range_high = $posts_range_low + count($query->posts) - 1;
?>

<p <?= $wrapper_attrs ?>>
  Showing <?= $posts_range_low ?> - <?= $posts_range_high ?> of <?= $posts_total ?> <?= $post_type_name ?>
</p>
