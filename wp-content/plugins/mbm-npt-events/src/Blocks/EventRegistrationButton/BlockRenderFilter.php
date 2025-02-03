<?php
namespace MBM\NonProfitToolkit\Events\Blocks\EventRegistrationButton;

use \MBM\NonProfitToolkit\Events\EventsHelper;
use voku\helper\HtmlDomParser;


class BlockRenderFilter {
  public static string $ROOT_BLOCK = 'core/buttons';
  public static string $NO_RENDER_RESULT = '';

  public static function register() {
    add_filter(
      'render_block', 
      [self::class, 'filterRenderBlock'], 
      10,
      3
    );

    // Add postId and postType to the button block's context. We'll need that
    // information in order to retrieve the registration URL from the post meta.
    add_filter(
      'block_type_metadata', 
      function($metadata) {
        if (($metadata['name'] ?? []) !== self::$ROOT_BLOCK) {
          return $metadata;
        }

        $uses_context = $metadata['usesContext'] ?? [];
        $uses_context[] = 'postId';
        $uses_context[] = 'postType';
        $metadata['usesContext'] = $uses_context;

        return $metadata;
      },
      10,
      1
    );
  }

  public static function filterRenderBlock(
    string $block_content, 
    array $block, 
    \WP_Block $block_instance
  ): string {
    // Filter by block type
    if ($block['blockName'] === self::$ROOT_BLOCK) {
      $variation_name = 'event-registration-buttons';
      $variation_marker = $block['attrs']['eventRegistrationButton'] ?? '';

      $is_target_block = $variation_marker === $variation_name;

      if (!$is_target_block) {
        return $block_content;
      }

      $post_id = $block_instance->context['postId'] ?? NULL;
      $registration_url = get_post_meta($post_id, 'mbm_npt_events_register_link_url', TRUE);

      if (empty($registration_url)) {
        // No registration URL found for the event, return empty result.
        return self::$NO_RENDER_RESULT;
      }

      // Is the event registration deadline passed?
      $is_reg_deadline_passed = EventsHelper::isMetaDatePassed(
        post_id: $post_id,
        meta_key: 'mbm_npt_events_register_deadline_date',
      );
      if ($is_reg_deadline_passed) {
        // Registration deadline has passed, return empty result.
        return self::$NO_RENDER_RESULT;
      }

      // Is the event expired?
      $is_event_expired = EventsHelper::isEventExpired(get_post($post_id));
      if ($is_event_expired) {
        // Event is expired, return empty result.
        return self::$NO_RENDER_RESULT;
      }

      $html_dom = HtmlDomParser::str_get_html($block_content);
      $anchor_tag = $html_dom->findOne('a.wp-block-button__link');

      if (empty($anchor_tag)) {
        // Could not find the expected anchor tag, don't alter block content.
        return $block_content;
      }

      // Point the link to the provided registration URL, and have the page
      // open in a new tab.
      $anchor_tag->href = $registration_url;
      $anchor_tag->target = '_blank';

      return $html_dom->save();
    }

    return $block_content;
  }
}

?>
