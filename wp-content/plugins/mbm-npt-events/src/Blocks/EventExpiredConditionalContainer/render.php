<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
require_once(MBM_NPT_EVENTS_PLUGIN_DIR . '/vendor/autoload.php');

use \MBM\NonProfitToolkit\Events\EventsHelper;


$post_id = $block->context['postId'] ?? NULL;

// Quit early if no post ID.
if (empty($post_id)) {
  return;
}

$wrapper_attrs = get_block_wrapper_attributes();

$is_expired = EventsHelper::isEventExpired(get_post($post_id));

$tag_name = $attributes['tagName'] ?? 'div';
$show_mode = $attributes['showMode'] ?? NULL;

// Default to showing contents.
$show_contents = TRUE;

// Only hide contents in specific configurations and event values.
if (
  ($show_mode === 'only_future' && $is_expired) 
  || ($show_mode === 'only_past' && !$is_expired)
) {
  $show_contents = FALSE;
}

if ($show_contents !== TRUE) {
  // Return nothing, hiding contents.
  return;
}

?>

<<?= $tag_name ?> <?= $wrapper_attrs ?>>
  <?= $content ?>
</<?= $tag_name ?>>
