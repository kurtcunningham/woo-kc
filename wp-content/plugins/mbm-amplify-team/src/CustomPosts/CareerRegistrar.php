<?php
namespace MBM\Amplify\Team\CustomPosts;


class CareerRegistrar {
  public static function registerCustomData(string $slug, bool $has_archive): void {
    self::registerDataTypes($slug, $has_archive);
    self::registerMetaData();
  }

  protected static function registerDataTypes(string $slug, bool $has_archive): void {
    register_post_type(
      Constants::CAREER_CPT_SLUG,
      array(
        'labels'       => array(
          'name'                => __( 'Careers', Constants::TEXT_DOMAIN),
          'all_items'           => __( 'All Careers', Constants::TEXT_DOMAIN),
          'singular_name'       => __( 'Career', Constants::TEXT_DOMAIN),
          'add_new'             => __( 'Add New Career', Constants::TEXT_DOMAIN),
          'add_new_item'        => __( 'Add New Career', Constants::TEXT_DOMAIN),
          'edit_item'           => __( 'Edit Career', Constants::TEXT_DOMAIN),
          'new_item'            => __( 'New Career', Constants::TEXT_DOMAIN),
          'search_items'        => __( 'Search Careers', Constants::TEXT_DOMAIN),
          'view_item'           => __( 'View Career', Constants::TEXT_DOMAIN),
          'view_items'          => __( 'View Careers', Constants::TEXT_DOMAIN),
          'not_found'           => __( 'No careers found.', Constants::TEXT_DOMAIN),
          'not_found_in_trash'  => __( 'No careers found.', Constants::TEXT_DOMAIN),
        ),
        'public'       => true,
        'has_archive'  => $has_archive,
        'show_in_rest' => true,
        'supports'     => array(
          'title',
          'editor',
          'thumbnail',
          'excerpt',
          'custom-fields',
        ),
        'show_in_menu' => 'edit.php?post_type=' . Constants::TEAM_MEMBER_CPT_SLUG,
        'rewrite'   => array(
          'slug' => $slug,
        ),
      )
    );

    register_taxonomy(
      Constants::CAREER_CAT_SLUG,
      [Constants::CAREER_CPT_SLUG], 
      [
        'hierarchical' => true,
        'rewrite' => ['slug' => 'career-category'],
        'show_admin_column' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'labels' => [
          'name' => __('Career Categories', Constants::TEXT_DOMAIN),
          'singular_name' => __('Career Category', Constants::TEXT_DOMAIN),
          'all_items' => __('All Career Categories', Constants::TEXT_DOMAIN),
          'edit_item' => __('Edit Career Category', Constants::TEXT_DOMAIN),
          'view_item' => __('View Career Category', Constants::TEXT_DOMAIN),
          'update_item' => __('Update Category', Constants::TEXT_DOMAIN),
          'add_new_item' => __('Add New Career Category', Constants::TEXT_DOMAIN),
          'new_item_name' => __('New Career Category Name', Constants::TEXT_DOMAIN),
          'search_items' => __('Search Career Categories', Constants::TEXT_DOMAIN),
          'popular_items' => __('Popular Career Categories', Constants::TEXT_DOMAIN),
          'separate_items_with_commas' => __('Separate career categories with comma', Constants::TEXT_DOMAIN),
          'choose_from_most_used' => __('Choose from most used career categories', Constants::TEXT_DOMAIN),
          'not_found' => __('No career categories found', Constants::TEXT_DOMAIN),
        ]
      ]
    );
  }

  protected static function registerMetaData(): void {
    $cpt_root = Constants::CAREER_CPT_SLUG;

    register_post_meta(
      $cpt_root,
      Constants::CAREER_JOB_LINK_URL,
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_url',
      )
    );

    add_filter(
      'manage_' . $cpt_root . '_posts_columns',
      function(array $post_columns): array {
        $new_columns = array_merge(
          array_splice($post_columns, 0, array_search('title', array_keys($post_columns)) + 1),
          [
            Constants::CAREER_JOB_LINK_URL => __('Job Posting Link')
          ],
          $post_columns,
        );

        $new_columns['title'] = __( 'Position/Title');

        return $new_columns;
      },
      10,
      1
    );

    add_filter(
      'manage_' . $cpt_root . '_posts_custom_column',
      function(string $column_name, int $post_id): void {
        switch ($column_name) {
          case Constants::CAREER_JOB_LINK_URL:
            $link_url = get_post_meta($post_id, Constants::CAREER_JOB_LINK_URL, TRUE);

            if (
              (!empty($link_url)) && 
              (($parsed_url = parse_url($link_url)) !== FALSE)
            ) {
              $domain = $parsed_url['host'] ?? 'Link';
              echo '<a href="' . $link_url . '" target="_blank">' . $domain .'</a>';
              break;
            }

            echo 'None';
            break;
        }

        return;
      },
      10,
      2
    );

    add_filter(
      'manage_edit-' . $cpt_root . '_sortable_columns',
      function(array $post_columns): array {
        $key = Constants::CAREER_JOB_LINK_URL;
        $post_columns[$key] = $key;

        return $post_columns;
      },
      10,
      1
    );
    
    MetaColumnSorter::register(
      cpt_slug: $cpt_root,
      meta_key: Constants::CAREER_JOB_LINK_URL,
    );
  }
}
