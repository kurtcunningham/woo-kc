<?php
namespace mbm\data\cpt;


class CptSupport {
  public static function registerCpt($post_type, $singular, $plural, $text_domain = 'mbm', $register_meta = []) {
    $labels = [
      'name'               => _x( "{$plural}", 'post type general name', $text_domain ),
      'singular_name'      => _x( "{$singular}", 'post type singular name', $text_domain ),
      'menu_name'          => _x( "{$plural}", 'admin menu', $text_domain ),
      'name_admin_bar'     => _x( "{$singular}", 'add new on admin bar', $text_domain ),
      'add_new'            => _x( "Add New", $post_type, $text_domain ),
      'add_new_item'       => __( "Add New {$singular}", $text_domain ),
      'new_item'           => __( "New {$singular}", $text_domain ),
      'edit_item'          => __( "Edit {$singular}", $text_domain ),
      'view_item'          => __( "View {$singular}", $text_domain ),
      'all_items'          => __( "All {$plural}", $text_domain ),
      'search_items'       => __( "Search {$plural}", $text_domain ),
      'parent_item_colon'  => __( "Parent {$singular}:", $text_domain ),
      'not_found'          => __( "No {$plural} found.", $text_domain ),
      'not_found_in_trash' => __( "No {$plural} found in Trash.", $text_domain )
    ];

    $base_register_meta = [
      'labels'         => $labels,
      'public'         => true,
      'show_ui'        => true,
      'show_in_menu'   => true,
      'has_archive'    => false,
      'supports'       => [
        'author',
        'title',
        'editor',
      ],
      'description'    => __("Custom post type for {$plural}."),
    ];
    $combo_register_meta = array_merge([], $base_register_meta, $register_meta);

    register_post_type(
      $post_type,
      $combo_register_meta
  	);
  }

  public static function registerTaxonomy($tax_type, $assoc_post_types, $singular, $plural, $text_domain = 'mbm', $register_meta = []) {
    $labels = [
  		'name'              => _x( "{$plural}", 'taxonomy general name', $text_domain ),
  		'singular_name'     => _x( "{$singular}", 'taxonomy singular name', $text_domain ),
  		'search_items'      => __( "Search {$plural}", $text_domain ),
  		'all_items'         => __( "All {$plural}", $text_domain ),
  		'parent_item'       => __( "Parent {$singular}", $text_domain ),
  		'parent_item_colon' => __( "Parent {$singular}:", $text_domain ),
  		'edit_item'         => __( "Edit {$singular}", $text_domain ),
  		'update_item'       => __( "Update {$singular}", $text_domain ),
  		'add_new_item'      => __( "Add New {$singular}", $text_domain ),
  		'new_item_name'     => __( "New {$singular} Name", $text_domain ),
  		'menu_name'         => __( "{$plural}", $text_domain ),
    ];

    $base_register_meta = [
      'hierarchical'      => false,
  		'labels'            => $labels,
  		'show_ui'           => true,
  		'show_admin_column' => true,
  		'query_var'         => true,
    ];
    $combo_register_meta = array_merge([], $base_register_meta, $register_meta);

  	register_taxonomy(
      $tax_type,
      $assoc_post_types,
      $combo_register_meta
    );
  }
}

?>
