<?php
namespace MBM\Amplify\Team\CustomPosts;


class TeamMemberRegistrar {
  public static function registerCustomData(string $slug, bool $has_archive): void {
    self::registerTypes($slug, $has_archive);
    self::registerMetaData();
  }

  protected static function registerTypes(string $slug, bool $has_archive): void {
    register_post_type(
      Constants::TEAM_MEMBER_CPT_SLUG,
      array(
        'labels'       => array(
          'menu_name'           => __( 'Team', Constants::TEXT_DOMAIN ),
          'all_items'           => __( 'All Team Members', Constants::TEXT_DOMAIN),
          'name'                => __( 'Team Members', Constants::TEXT_DOMAIN ),
          'singular_name'       => __( 'Team Member', Constants::TEXT_DOMAIN),
          'add_new'             => __( 'Add New Team Member', Constants::TEXT_DOMAIN),
          'add_new_item'        => __( 'Add New Team Member', Constants::TEXT_DOMAIN),
          'edit_item'           => __( 'Edit Team Member', Constants::TEXT_DOMAIN),
          'new_item'            => __( 'New Team Member', Constants::TEXT_DOMAIN),
          'search_items'        => __( 'Search Team Members', Constants::TEXT_DOMAIN),
          'view_item'           => __( 'View Team Member', Constants::TEXT_DOMAIN),
          'view_items'          => __( 'View Team Members', Constants::TEXT_DOMAIN),
          'not_found'           => __( 'No team members found.', Constants::TEXT_DOMAIN),
          'not_found_in_trash'  => __( 'No team members found.', Constants::TEXT_DOMAIN),
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
        'menu_icon' => 'dashicons-groups',
        // 'show_in_menu' => 'admin.php?page=amplify-team',
        'show_in_menu' => true,
        'rewrite'   => array(
          'slug' => $slug,
        ),
      )
    );

    register_taxonomy(
      Constants::TEAM_MEMBER_CAT_SLUG,
      [Constants::TEAM_MEMBER_CPT_SLUG], 
      [
        'hierarchical' => true,
        'rewrite' => ['slug' => 'team-category'],
        'show_admin_column' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'labels' => [
          'name' => __('Team Member Categories', Constants::TEXT_DOMAIN),
          'singular_name' => __('Team Member Category', Constants::TEXT_DOMAIN),
          'all_items' => __('All Team Member Categories', Constants::TEXT_DOMAIN),
          'edit_item' => __('Edit Team Member Category', Constants::TEXT_DOMAIN),
          'view_item' => __('View Team Member Category', Constants::TEXT_DOMAIN),
          'update_item' => __('Update Category', Constants::TEXT_DOMAIN),
          'add_new_item' => __('Add New Team Member Category', Constants::TEXT_DOMAIN),
          'new_item_name' => __('New Team Member Category Name', Constants::TEXT_DOMAIN),
          'search_items' => __('Search Team Member Categories', Constants::TEXT_DOMAIN),
          'popular_items' => __('Popular Team Member Categories', Constants::TEXT_DOMAIN),
          'separate_items_with_commas' => __('Separate team member categories with comma', Constants::TEXT_DOMAIN),
          'choose_from_most_used' => __('Choose from most used team member categories', Constants::TEXT_DOMAIN),
          'not_found' => __('No team member categories found', Constants::TEXT_DOMAIN),
        ]
      ]
    );
  }

  protected static function registerMetaData(): void {
    $cpt_root = Constants::TEAM_MEMBER_CPT_SLUG;

    register_post_meta(
      $cpt_root,
      Constants::TEAM_MEMBER_POSITION_NAME,
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      )
    );
    register_post_meta(
      $cpt_root,
      Constants::TEAM_MEMBER_CONTACT_PHONE,
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      )
    );
    register_post_meta(
      $cpt_root,
      Constants::TEAM_MEMBER_CONTACT_EMAIL,
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_email',
      )
    );
    register_post_meta(
      $cpt_root,
      Constants::TEAM_MEMBER_SOCIAL_LINKEDIN_URL,
      array(
        'show_in_rest'       => true,
        'single'             => true,
        'type'               => 'string',
        'sanitize_callback'  => 'sanitize_url',
      )
    );
    register_post_meta(
      $cpt_root,
      Constants::TEAM_MEMBER_SOCIAL_XTWITTER_URL,
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
            Constants::TEAM_MEMBER_POSITION_NAME => __('Position/Title'),
            Constants::TEAM_MEMBER_CONTACT => __('Contact'),
            Constants::TEAM_MEMBER_SOCIAL => __('Social'),
          ],
          $post_columns,
        );

        $new_columns['title'] = __( 'Name');

        return $new_columns;
      },
      10,
      1
    );

    add_filter(
      'manage_' . $cpt_root . '_posts_custom_column',
      function(string $column_name, int $post_id): void {
        switch ($column_name) {
          case Constants::TEAM_MEMBER_POSITION_NAME:
            $position_name = get_post_meta($post_id, Constants::TEAM_MEMBER_POSITION_NAME, TRUE);
            echo empty($position_name) ? 'N/A' : $position_name;
            break;

          case Constants::TEAM_MEMBER_CONTACT:
            $meta_values = [
              Constants::TEAM_MEMBER_CONTACT_EMAIL => 'Email',
              Constants::TEAM_MEMBER_CONTACT_PHONE => 'Phone',
            ];
            foreach ($meta_values as $key => $label) {
              $raw_value = get_post_meta($post_id, $key, TRUE);
              $txt_value = empty($raw_value) ? 'N/A' : $raw_value;
              echo "{$label}: {$txt_value}<br>";
            }
            break;
            
          case Constants::TEAM_MEMBER_SOCIAL:
            $meta_values = [
              Constants::TEAM_MEMBER_SOCIAL_LINKEDIN_URL => 'LinkedIn',
              Constants::TEAM_MEMBER_SOCIAL_XTWITTER_URL => 'X/Twitter',
            ];
            foreach ($meta_values as $key => $label) {
              $raw_value = get_post_meta($post_id, $key, TRUE);
              if (empty($raw_value)) {
                echo "{$label}: N/A<br>";
              } else {
                $parsed_url = parse_url($raw_value);
                $domain = $parsed_url['host'] ?? 'Link';
                echo '<a href="' . $raw_value . '" target="_blank">' . $domain .'</a><br>';
              }
            }

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
        $key = Constants::TEAM_MEMBER_POSITION_NAME;
        $post_columns[$key] = $key;

        return $post_columns;
      },
      10,
      1
    );
    
    MetaColumnSorter::register(
      cpt_slug: $cpt_root,
      meta_key: Constants::TEAM_MEMBER_POSITION_NAME,
    );
  }
}
