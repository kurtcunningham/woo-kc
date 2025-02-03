<?php
namespace MBM\NonProfitToolkit\Events;

use \MBM\NonProfitToolkit\Events\Dates\DateRangeFormatterInterface;

class EventsHelper {
  public static function isDateTimePassed(\DateTime $date): bool {
    $now = new \DateTime('now');

    $is_passed = $date < $now;

    return $is_passed;
  }

  public static function isMetaDatePassed(int $post_id, string $meta_key): bool|null {
    $date_raw = get_post_meta($post_id, $meta_key, TRUE);
    
    // Return NULL if no date is set.
    if (empty($date_raw)) return NULL;

    // Return NULL if the date isn't valid.
    if (FALSE === strtotime($date_raw)) return NULL;

    return self::isDateTimePassed(new \DateTime($date_raw));
  }

  public static function isEventExpired(\WP_Post $event): bool {
    $is_event_end_date_passed = self::isMetaDatePassed(
      post_id: $event->ID,
      meta_key: 'mbm_npt_events_end_date',
    );

    if ($is_event_end_date_passed !== NULL) return $is_event_end_date_passed;

    $is_event_start_date_passed = self::isMetaDatePassed(
      post_id: $event->ID,
      meta_key: 'mbm_npt_events_start_date',
    );

    if ($is_event_start_date_passed === NULL) return FALSE;
    
    return $is_event_start_date_passed;
  }

  public static function getFormattedDate(
    int $post_id,
    string $date_key,
    string $future_format,
    string $expired_format,
    string $no_date_fallback = 'N/A',
  ): string {
    if (empty($post_id)) return $no_date_fallback;

    // Retrieve and convert raw date to site timezone.
    $date_raw = get_post_meta($post_id, $date_key, TRUE);

    if (empty($date_raw)) return $no_date_fallback;

    $meta_date = self::getDateInSiteTimezone($date_raw);

    $is_expired = EventsHelper::isDateTimePassed($meta_date);
    $date_format = $is_expired ? $expired_format : $future_format;

    return $meta_date->format($date_format);
  }

  public static function getFormattedStartDate(
    int $post_id, 
    string $future_format, 
    string $expired_format,
    string $no_date_fallback = 'N/A',
  ) {
    return self::getFormattedDate(
      $post_id,
      'mbm_npt_events_start_date',
      $future_format,
      $expired_format,
      $no_date_fallback,
    );
  }

  public static function isEventSameDay(int $post_id): bool {
    $start_date_raw = get_post_meta($post_id, 'mbm_npt_events_start_date', TRUE);
    $end_date_raw = get_post_meta($post_id, 'mbm_npt_events_end_date', TRUE);

    if (empty($start_date_raw) || empty($end_date_raw)) return FALSE;

    $start_date = new \DateTime($start_date_raw);
    $end_date = new \DateTime($end_date_raw);

    $is_same_day = $start_date->format('Y-m-d') === $end_date->format('Y-m-d');

    return $is_same_day;
  }

  public static function getDateInSiteTimezone(string $date_raw): \DateTime|null {
    if (empty($date_raw)) return NULL;
    
    // Create timestamp in UTC timezone
    $date = new \DateTime($date_raw);
    // Convert to site timezone
    $date->setTimezone(new \DateTimeZone(wp_timezone_string()));

    return $date;
  }

  public static function getEventDates(int $post_id): array {
    $start_date_raw = get_post_meta($post_id, 'mbm_npt_events_start_date', TRUE);
    $end_date_raw = get_post_meta($post_id, 'mbm_npt_events_end_date', TRUE);

    $start_date = self::getDateInSiteTimezone($start_date_raw);
    $end_date = self::getDateInSiteTimezone($end_date_raw);

    return [
      'start' => $start_date,
      'end' => $end_date,
    ];
  }

  public static function getFormattedDateRange(
    int $post_id,
    DateRangeFormatterInterface $future_formatter,
    DateRangeFormatterInterface $expired_formatter,

    // EventDateFormat $single_day_future_format,
    // EventDateFormat $single_day_past_format,
    // EventDateFormat $multi_day_future_format,
    // EventDateFormat $multi_day_past_format,

    string $no_date_fallback = 'N/A',
  ): string {
    $event_dates = self::getEventDates($post_id);
    $is_expired = self::isEventExpired(get_post($post_id));
    
    if ($is_expired) {
      return $expired_formatter->formatDateRange($event_dates['start'], $event_dates['end']);
    }

    return $future_formatter->formatDateRange($event_dates['start'], $event_dates['end']);

    /*
      $is_same_day = self::isEventSameDay($post_id);
      $is_expired = self::isEventExpired(get_post($post_id));

      if ($is_same_day) {
        if ($is_expired) {
          return self::getFormattedDate(
            $post_id,
            'mbm_npt_events_start_date',
            $single_day_past_format->start_format,
            $single_day_past_format->end_format,
            $no_date_fallback,
          );
        }

        return self::getFormattedDate(
          $post_id,
          'mbm_npt_events_start_date',
          $single_day_future_format->start_format,
          $single_day_future_format->end_format,
          $no_date_fallback,
        );
      }

      if ($is_expired) {
        return self::getFormattedDate(
          $post_id,
          'mbm_npt_events_start_date',
          $multi_day_past_format->start_format,
          $multi_day_past_format->end_format,
          $no_date_fallback,
        );
      }

      return self::getFormattedDate(
        $post_id,
        'mbm_npt_events_start_date',
        $multi_day_future_format->start_format,
        $multi_day_future_format->end_format,
        $no_date_fallback,
      );
    */
  }
}
