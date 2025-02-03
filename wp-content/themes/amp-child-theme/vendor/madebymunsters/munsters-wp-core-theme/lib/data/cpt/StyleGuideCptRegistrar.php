<?php
namespace mbm\data\cpt;


class StyleGuideCptRegistrar implements \mbm\theme\AutoRegister {
  // Custom post types
  public static $mbm_styleguide_post_type       = 'styleguide';

  // Custom taxonomy types
  public static $mbm_styleguide_tax_type        = 'styleguide-category';

  private $text_domain = 'mbm';

  public function register() {
    add_filter('init', [$this, 'registerCpts']);
  }

  public function registerCpts() {
    $this->registerStyleguideCpt();
    $this->registerStyleguideCategoryTax();
  }

  //  Styleguide: Post Type
  private function registerStyleguideCpt() {
    $singular = "Style Guide";
    $plural = "{$singular}";
    $post_type = self::$mbm_styleguide_post_type;
    
    $styleguide_labels = array(
      'name'               => _x( "{$plural} Posts", 'post type general name', $this->text_domain ),
      'singular_name'      => _x( "{$singular} Post", 'post type singular name', $this->text_domain ),
      'menu_name'          => _x( "{$plural}", 'admin menu', $this->text_domain ),
      'name_admin_bar'     => _x( "{$singular} Post", 'add new on admin bar', $this->text_domain ),
      'add_new'            => _x( "Add New", $post_type, $this->text_domain ),
      'add_new_item'       => __( "Add New {$singular}", $this->text_domain ),
      'new_item'           => __( "New {$singular} Post", $this->text_domain ),
      'edit_item'          => __( "Edit {$singular} Post", $this->text_domain ),
      'view_item'          => __( "View {$singular} Post", $this->text_domain ),
      'all_items'          => __( "{$plural}", $this->text_domain ),
      'search_items'       => __( "Search {$plural} Post", $this->text_domain ),
      'parent_item_colon'  => __( "Parent {$singular}:", $this->text_domain ),
      'not_found'          => __( "No {$plural} found.", $this->text_domain ),
      'not_found_in_trash' => __( "No {$plural} found in Trash.", $this->text_domain )
    );
    $template = array(
      array( 'mbm/container',
        array( 'align' => 'wide', 'bottomSpacing' => '16', 'topSpacing' => '0', ),
        array(
          array( 'mbm/grid-container',
            array(),
            array(
              array( 'mbm/grid-column',
                array( 'allSize' => 12 ),
                array(
                  array( 'core/heading',
                    array( 'level' => 1, 'placeholder' => 'Add block name' )
                 ),
                ),
              ),
              array( 'mbm/grid-column',
                array( 'responsive'  => true, 'allSize' => 12, 'smSize' => 12, 'mdSize' => 12, 'lgSize' => 10 ),
                array(
                  array( 'core/paragraph',
                    array( 'textColor' => 'gray-base', 'placeholder' => 'Add short description of block' )
                 ),
                ),
              ),
            ),
          ),
          array( 'mbm/responsive-spacer',
            array( 'allSize' => '32' ),
          ),
          array( 'core/separator',
            array(),
          ),
        ),
      ),
      array( 'mbm/container',
        array( 'align' => 'wide', 'bottomSpacing' => '0', 'topSpace' => '0', ),
        array(
          array( 'mbm/grid-container',
            array(),
            array(
              array( 'mbm/grid-column',
                array( 'responsive'  => true, 'allSize' => 12, 'smSize' => 12, 'mdSize' => 10, 'lgSize' => 10 ),
                array(
                  array( 'core/paragraph',
                    array( 'placeholder' => 'Add reference information about the block' )
                 ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    /*
      Perform a check on the current user's capabilities. If they have the 
      switch_themes capability, then they should be able to view the Appearance
      menu. In that case, put the Style Guide under that top-level menu item.
      Otherwise, make the Style Guide it's own top-level menu item. 

      If users _don't_ have Appearance menu access and the Style Guide is placed
      under that menu, then they will be able to see the Style Guide option but 
      will be prevented from accessing the page.
    */
    $current_user = wp_get_current_user();
    $has_appearance_access = $current_user->has_cap('switch_themes');

    CptSupport::registerCpt(
      self::$mbm_styleguide_post_type,
      $singular,
      $plural,
      $this->text_domain,
      [
  			'has_archive'    => false,
        'public'         => true,
        'labels'         => $styleguide_labels,
  			'show_in_rest'	 => true,
        'show_ui'        => true,
        'show_in_menu'   => $has_appearance_access ? 'themes.php' : true,
  			'supports'       => [
  				'editor',
  				'title',
  			],
        'rewrite' => [
  				'slug'       => 'styleguide',
  				'with_front' => false,
  			],
        'template'     => $template,
      ],
    );
  }

  // Styleguide: Taxonomy
  private function registerStyleguideCategoryTax() {
    $singular = "Style Guide Category";
    $plural   = "Style Guide Categories";

    CptSupport::registerTaxonomy(
      self::$mbm_styleguide_tax_type,
      [self::$mbm_styleguide_post_type],
      $singular,
      $plural,
      $this->text_domain,
      [
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => false,
        'show_in_rest'               => true,
      ],
    );
  }
}
?>
