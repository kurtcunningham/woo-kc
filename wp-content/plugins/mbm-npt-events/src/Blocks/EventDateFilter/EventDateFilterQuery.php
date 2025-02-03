<?php
namespace MBM\NonProfitToolkit\Events\Blocks\EventDateFilter;


class EventDateFilterQuery {
  public static function register() {
    add_filter(
      'pre_render_block', 
      [self::class, 'filterPreRenderBlock'], 
      10, 
      2
    );
  }

  public static function filterPreRenderBlock($pre_render, $parsed_block) {
    // Only investigate Query Loop blocks.
    if ($parsed_block['blockName'] !== 'core/query') {
      return $pre_render;
    }

    $event_date_filter = $parsed_block['attrs']['mbmNptEventDateFilter'] ?? FALSE;
    $is_configured_event_date_filter = !empty($event_date_filter);

    $is_events_query_loop = ($parsed_block["attrs"]["query"]["postType"] ?? '') === "mbm_npt_events";
    $query_loop_query_id = $parsed_block['attrs']['queryId'] ?? FALSE;
    $has_query_loop_query_id = $query_loop_query_id !== FALSE;

    if (!$is_events_query_loop || !$has_query_loop_query_id) return $pre_render;

    add_filter(
      'query_loop_block_query_vars',
      function(array $query, \WP_Block $block) use ($parsed_block, $query_loop_query_id, $event_date_filter) {
        global $post;

        if (($block->context['queryId'] ?? NULL) !== $query_loop_query_id) {
          return $query;
        }

        $build_event_meta_query = function($compare_operator): array {
          $db_date_format = 'Y-m-d\\TH:i:s';

          return [
            'relation' => 'OR',
            [
              [
                'key'     => 'mbm_npt_events_end_date',
                'value'   => (new \DateTime('now'))->format($db_date_format),
                'compare' => $compare_operator,
                'type'    => 'DATETIME',
              ],
            ],
            [
              'relation' => 'AND',
              [
                'key'     => 'mbm_npt_events_start_date',
                'value'   => (new \DateTime('now'))->format($db_date_format),
                'compare' => $compare_operator,
                'type'    => 'DATETIME',
              ],
              [
                'key'     => 'mbm_npt_events_end_date',
                'compare' => 'NOT EXISTS',
              ],
            ],
            [
              'relation' => 'AND',
              [
                'key'     => 'mbm_npt_events_start_date',
                'value'   => (new \DateTime('now'))->format($db_date_format),
                'compare' => $compare_operator,
                'type'    => 'DATETIME',
              ],
              [
                'key'     => 'mbm_npt_events_end_date',
                'compare' => 'LIKE',
                'value'   => '',
              ],
            ]
          ];
        };

        if (\is_string($event_date_filter)) {
          $meta_query = [];
          if ($event_date_filter === 'show_only_future') {
            $meta_query = $build_event_meta_query('>');
          } elseif ($event_date_filter === 'show_only_past') {
            $meta_query = $build_event_meta_query('<');
          }

          if (!empty($query['meta_query'])) {
            $meta_query = [
              'relation' => 'AND',
              $meta_query,
              $query['meta_query'],
            ];
          }
          $query['meta_query'] = $meta_query;
        }

        // If publish date is the configured sort order, override that and
        // instead sort by event start date.
        // WARN: this will exclude any events which have no start date.
        if ($query['orderby'] === 'date') {
          $query['orderby'] = 'meta_value';
          $query['meta_key'] = 'mbm_npt_events_start_date';
        }

        return $query;
      },
      10,
      2
    );

    return $pre_render;
  }
}
