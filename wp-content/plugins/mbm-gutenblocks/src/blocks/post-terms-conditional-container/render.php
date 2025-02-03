<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

$post_id = $block->context['postId'] ?? NULL;

// Quit early if no post ID.
if (empty($post_id)) {
  return;
}

// If criteria is set to -1, it means no criteria is set.
$no_criteria_flag = -1;

$tag_name = $attributes['tagName'] ?? 'div';
$min_terms_count = $attributes['minTermsCount'] ?? $no_criteria_flag;
$max_terms_count = $attributes['maxTermsCount'] ?? $no_criteria_flag;
$taxonomy = $attributes['taxonomySlug'] ?? 'post_tag';

// Get the terms for the post.
$terms = get_the_terms($post_id, $taxonomy);
// get_the_terms returns false if no terms are found, so use an 
// empty predicate check here instead of count.
$terms_count = !empty($terms)
  ? count($terms)
  : 0;

$meets_min_criteria = $min_terms_count === $no_criteria_flag || $terms_count >= $min_terms_count;
$meets_max_criteria = $max_terms_count === $no_criteria_flag || $terms_count <= $max_terms_count;
$show_contents = $meets_min_criteria && $meets_max_criteria;

if ($show_contents !== TRUE) {
  // Return nothing, hiding contents.
  return;
}

$wrapper_attrs = get_block_wrapper_attributes();
?>

<<?= $tag_name ?> <?= $wrapper_attrs ?>>
  <?= $content ?>
</<?= $tag_name ?>>
