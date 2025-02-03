<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
require_once(MBM_NPT_EVENTS_PLUGIN_DIR . '/vendor/autoload.php');

use \MBM\NonProfitToolkit\Events\EventsHelper;
use \MBM\NonProfitToolkit\Events\Dates\PrettyDateRangeFormatter;


$post_id = $block->context['postId'] ?? NULL;

// Quit early if no post ID.
if (empty($post_id)) {
  return;
}

$wrapper_attrs = get_block_wrapper_attributes();

$formatted_date = EventsHelper::getFormattedDateRange(
  post_id: $post_id,
  future_formatter: new PrettyDateRangeFormatter(),
  expired_formatter: new PrettyDateRangeFormatter(),

  // future_format: 'l, F j \| h:i A T',
  // expired_format: 'F j, Y',
);
?>

<p <?= $wrapper_attrs ?>>
  <?= $formatted_date ?>
</p>
