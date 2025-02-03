<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
require_once(MBM_NPT_EVENTS_PLUGIN_DIR . '/vendor/autoload.php');

use \MBM\NonProfitToolkit\Events\CustomPostRegistrar;
use \MBM\NonProfitToolkit\Events\EventsHelper;
use \MBM\NonProfitToolkit\Events\Dates\PrettyDateRangeFormatter;

$post_id = $block->context['postId'] ?? NULL;
$post_type = $block->context['postType'] ?? NULL;
$empty_date_fallback = $attributes['emptyDateFallback'] ?? 'N/A';

// Quit early if no post ID, or post type isn't an event.
if (
  (empty($post_id))
  || ($post_type !== CustomPostRegistrar::$EVENTS_CPT_SLUG)
) {
  return;
}

// Get the site default date format.
$default_date_format = get_option('date_format');

$event_date_type = $attributes['eventDateType'] ?? 'start';
$future_date_format = $attributes['futureDateFormat'] ?? $default_date_format;
$past_date_format = $attributes['pastDateFormat'] ?? null;

$event_date_meta_key = $event_date_type === 'end'
  ? 'mbm_npt_events_end_date'
  : 'mbm_npt_events_start_date';
$event_date = get_post_meta($post_id, $event_date_meta_key, true);
$formatted_date = $empty_date_fallback;
if (!empty($event_date)) {
  $is_event_date_passed = EventsHelper::isMetaDatePassed($post_id, $event_date_meta_key);
  $past_date_format = !empty($past_date_format) ? $past_date_format : $future_date_format;
  $date_format = $is_event_date_passed ? $past_date_format : $future_date_format;
  $formatted_date = wp_date($date_format, strtotime($event_date));
}

$wrapper_attrs = get_block_wrapper_attributes();
?>

<p <?= $wrapper_attrs ?>>
  <?= $formatted_date ?>
</p>
