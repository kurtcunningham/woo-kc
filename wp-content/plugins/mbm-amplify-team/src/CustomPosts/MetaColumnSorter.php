<?php
namespace MBM\Amplify\Team\CustomPosts;


// TODO: extract to a common Composer library!

class MetaColumnSorter {
  public static function register(string $cpt_slug, string $meta_key): void {
    add_action(
      'pre_get_posts', 
      function(\WP_Query $query) use ($cpt_slug, $meta_key): \WP_Query {
        // Query loop detection technique modified from this
        // answer: https://wordpress.stackexchange.com/a/293403        

        if (!is_admin()) return $query;

        global $pagenow;
        if ('edit.php' != $pagenow) return $query;

        if ($query->get('post_type') !== $cpt_slug) return $query;

        if ($query->get('orderby') !== $meta_key) return $query;


        $meta_query = $query->get('meta_query');
        $meta_query = empty($meta_query) ? [] : $meta_query;
        $meta_query[] = [
          'relation' => 'OR',
          [
            'key' => $meta_key,
            'compare' => 'NOT EXISTS',
          ],
          [
            'key' => $meta_key,
          ]
        ];
        $query->set('meta_query', $meta_query);

        return $query;
      },
      10,
      1
    );
  }
}
