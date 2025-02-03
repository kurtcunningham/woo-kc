<?php
namespace MBM\NonProfitToolkit\Events;

use \MBM\NonProfitToolkit\Events\EventsHelper;
use \MBM\NonProfitToolkit\Events\Dates\EventDateFormat;
use \MBM\NonProfitToolkit\Events\Dates\PrettyDateRangeFormatter;
use \MBM\NonProfitToolkit\Events\Dates\DateRangeFormatterInterface;


class CustomPostRegistrar {
  public static string $EVENTS_CPT_SLUG = 'mbm_npt_events';
  public static string $EVENTS_CPT_CAT_SLUG = 'mbm_npt_event_cat';

  public static function register(): void {
    add_action(
      'init',
      [self::class, 'registerCustomPosts'],
      10,
      0
    );

    // Need to flush rewrite rules after registering CPT routes.
    register_activation_hook(
      MBM_NPT_EVENTS_PLUGIN_FILE,
      [self::class, 'onActivatePlugin']
    );
    register_deactivation_hook(
      MBM_NPT_EVENTS_PLUGIN_FILE,
      [self::class, 'onDeactivatePlugin']
    );

    // TODO: Refactor/extract these inline functions into static class functions.
    add_filter(
      'manage_' . self::$EVENTS_CPT_SLUG . '_posts_columns',
      function(array $post_columns): array {
        $new_columns = array_merge(
          array_splice($post_columns, 0, array_search('title', array_keys($post_columns)) + 1),
          [
            self::$EVENTS_CPT_SLUG . '_date' => 'Event Date',
            self::$EVENTS_CPT_SLUG . '_register_deadline_date' => 'Registration Deadline',
          ],
          $post_columns,
        );

        unset($new_columns['date']);

        return $new_columns;
      },
      10,
      1
    );

    add_filter(
      'manage_edit-' . self::$EVENTS_CPT_SLUG . '_sortable_columns',
      function(array $post_columns): array {
        $key = self::$EVENTS_CPT_SLUG . '_date';
        $post_columns[$key] = $key;

        return $post_columns;
      },
      10,
      1
    );

    add_filter(
      'manage_' . self::$EVENTS_CPT_SLUG . '_posts_custom_column',
      function(string $column_name, int $post_id): void {
        switch ($column_name) {
          case self::$EVENTS_CPT_SLUG . '_date':
            $formatted_date_range = EventsHelper::getFormattedDateRange(
              post_id: $post_id,
              future_formatter: new PrettyDateRangeFormatter(
                start_only_format: 'M j Y \@ h:i A',
                same_day_format: ['M j, Y \@ h:i A', ' \- h:i A T'],
                same_month_format: ['M j', ' \- j, Y'],
                same_year_format: ['M j', ' \- M j, Y'],
                full_date_format: ['M j Y', ' \- M j Y'],
              ),
              expired_formatter: new PrettyDateRangeFormatter(
                start_only_format: 'M j Y',
                same_day_format: ['M j, Y', ''],
                same_month_format: ['M j', ' \- j, Y'],
                same_year_format: ['M j', ' \- M j, Y'],
                full_date_format: ['M j Y', ' \- M j Y'],
              ),

              // expired_format: new EventDateFormat(
              //   single_format: 'M j Y, h:i A T',
              //   same_day_formats: ['M j Y, h:i A', ' \- h:i A T'],
              //   multi_day_formats: ['M j', ' \- M j Y'],
              // ),

              // future_format: new EventDateFormat(
              //   start_format: 'M j Y, h:i A T',
              //   separator: ' — ',
              //   end_format: 'h:i A T',
              // ),

              /*
              single_day_past_format: new EventDateFormat(
                start_format: 'M j Y, h:i A T',
                end_format: 'h:i A T',
              ),
              single_day_future_format: new EventDateFormat(
                start_format: 'M j Y, h:i A T',
                end_format: 'h:i A T',
              ),
              multi_day_future_format: new EventDateFormat(
                start_format: 'M j Y, h:i A T',
                separator: ' — ',
                end_format: 'h:i A T',
              ),
              single_day_future_format: new EventDateFormat(
                start_format: 'M j Y, h:i A T',
                end_format: 'h:i A T',
              ),
              */

              // same_day_future_format: 'M j Y, h:i A T',
              // same_day_expired_format: 'M j Y',
              no_date_fallback: '—',
            );
            echo $formatted_date_range;

            break;

          case self::$EVENTS_CPT_SLUG . '_register_deadline_date':
            $formatted_register_deadline = EventsHelper::getFormattedDate(
              post_id: $post_id,
              date_key: self::$EVENTS_CPT_SLUG . '_register_deadline_date',
              future_format: 'M j Y, h:i A T',
              expired_format: 'M j Y',
              no_date_fallback: '—',
            );
            echo $formatted_register_deadline;

            break;
        }

        return;
      },
      10,
      2
    );

    add_action(
      'pre_get_posts', 
      function(\WP_Query $query): \WP_Query {
        // Query loop detection technique modified from this
        // answer: https://wordpress.stackexchange.com/a/293403        

        if (!is_admin()) return $query;

        global $pagenow;
        if ('edit.php' != $pagenow) return $query;

        if ($query->get('post_type') !== self::$EVENTS_CPT_SLUG) return $query;

        if ($query->get('orderby') !== self::$EVENTS_CPT_SLUG . '_date') return $query;


        $meta_query = $query->get('meta_query');
        $meta_query = empty($meta_query) ? [] : $meta_query;
        $meta_query[] = [
          'relation' => 'OR',
          [
            'key' => self::$EVENTS_CPT_SLUG . '_start_date',
            'compare' => 'NOT EXISTS',
          ],
          [
            'key' => self::$EVENTS_CPT_SLUG . '_start_date',
          ]
        ];
        $query->set('meta_query', $meta_query);

        return $query;
      },
      10,
      1
    );
  }
  
  public static function registerCustomPosts(): void {
    register_post_type(
      self::$EVENTS_CPT_SLUG,
      array(
        'labels'       => array(
          'name'                => __( 'Events', MBM_NPT_EVENTS_TXT_DOMAIN ),
          'singular_name'       => __( 'Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'add_new'             => __( 'Add New Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'add_new_item'        => __( 'Add New Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'edit_item'           => __( 'Edit Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'new_item'            => __( 'New Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'search_items'        => __( 'Search Events', MBM_NPT_EVENTS_TXT_DOMAIN),
          'view_item'           => __( 'View Event', MBM_NPT_EVENTS_TXT_DOMAIN),
          'view_items'          => __( 'View Events', MBM_NPT_EVENTS_TXT_DOMAIN),
          'not_found'           => __( 'No events found.', MBM_NPT_EVENTS_TXT_DOMAIN),
          'not_found_in_trash'  => __( 'No events found.', MBM_NPT_EVENTS_TXT_DOMAIN),
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'supports'     => array(
          'title',
          'editor',
          'thumbnail',
          'excerpt',
          'custom-fields',
        ),
        // WARN: this renders an icon, but the icon is not responsive to 
        // changing WP admin profile themes.
        // 'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode( file_get_contents( plugin_dir_path( MBM_NPT_EVENTS_PLUGIN_FILE ) . 'assets/icon.svg' ) )
        'menu_icon' => 'dashicons-calendar-alt',
        'rewrite'   => array(
          'slug' => 'events',
        ),
      )
    );

    register_taxonomy(
      self::$EVENTS_CPT_CAT_SLUG, 
      [self::$EVENTS_CPT_SLUG], 
      [
        'hierarchical' => true,
        'rewrite' => ['slug' => 'events-category'],
        'show_admin_column' => true,
        'show_in_rest' => true,
        'labels' => [
          'name' => __('Event Categories', MBM_NPT_EVENTS_TXT_DOMAIN),
          'singular_name' => __('Event Category', MBM_NPT_EVENTS_TXT_DOMAIN),
          'all_items' => __('All Event Categories', MBM_NPT_EVENTS_TXT_DOMAIN),
          'edit_item' => __('Edit Event Category', MBM_NPT_EVENTS_TXT_DOMAIN),
          'view_item' => __('View Event Category', MBM_NPT_EVENTS_TXT_DOMAIN),
          'update_item' => __('Update Category', MBM_NPT_EVENTS_TXT_DOMAIN),
          'add_new_item' => __('Add New Event Category', MBM_NPT_EVENTS_TXT_DOMAIN),
          'new_item_name' => __('New Event Category Name', MBM_NPT_EVENTS_TXT_DOMAIN),
          'search_items' => __('Search Event Categories', MBM_NPT_EVENTS_TXT_DOMAIN),
          'popular_items' => __('Popular Event Categories', MBM_NPT_EVENTS_TXT_DOMAIN),
          'separate_items_with_commas' => __('Separate event categories with comma', MBM_NPT_EVENTS_TXT_DOMAIN),
          'choose_from_most_used' => __('Choose from most used event categories', MBM_NPT_EVENTS_TXT_DOMAIN),
          'not_found' => __('No Event Categories found', MBM_NPT_EVENTS_TXT_DOMAIN),
        ]
      ]
    );
    
    register_post_meta(
      self::$EVENTS_CPT_SLUG,
      self::$EVENTS_CPT_SLUG . '_register_link_url',
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_url',
      )
    );
    register_post_meta(
      self::$EVENTS_CPT_SLUG,
      self::$EVENTS_CPT_SLUG . '_register_deadline_date',
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      )
    );
    register_post_meta(
      self::$EVENTS_CPT_SLUG,
      self::$EVENTS_CPT_SLUG . '_start_date',
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      )
    );
    register_post_meta(
      self::$EVENTS_CPT_SLUG,
      self::$EVENTS_CPT_SLUG . '_end_date',
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      )
    );
  }

  public static function onActivatePlugin(): void {
    self::registerCustomPosts();

    flush_rewrite_rules();
  }

  public static function onDeactivatePlugin(): void {
    flush_rewrite_rules();
  }
}
