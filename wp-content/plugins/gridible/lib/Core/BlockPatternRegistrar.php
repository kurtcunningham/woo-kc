<?php
namespace Gridible\Plugin\Core;


class BlockPatternRegistrar {
  public static function register() {
    add_action('init', [static::class, 'registerBlockPatternCategories'], 10, 0);
    add_action('init', [static::class, 'findAndRegisterBlockPatterns'], 10, 0);
  }

  public static function registerBlockPatternCategories(): bool {
    $gridible_text_domain = 'gridible';

    $registration_success = register_block_pattern_category(
      'gridible',
      [
        'label' => __('Gridible', $gridible_text_domain),
        'description' => __('Our most popular grid-based layouts.', $gridible_text_domain),
      ]
    );

    return $registration_success;
  }

  public static function findAndRegisterBlockPatterns() {
    $default_headers = array(
      'title'         => 'Title',
      'slug'          => 'Slug',
      'description'   => 'Description',
      'viewportWidth' => 'Viewport Width',
      'categories'    => 'Categories',
      'keywords'      => 'Keywords',
      'blockTypes'    => 'Block Types',
      'postTypes'     => 'Post Types',
      'inserter'      => 'Inserter',
      'templateTypes' => 'Template Types',
    );
  
    /*
     * Register patterns for the active theme. If the theme is a child theme,
     * let it override any patterns from the parent theme that shares the same slug.
     */
    $theme = wp_get_theme();
    // $dirpath = $theme->get_stylesheet_directory() . '/patterns/';
    $dirpath = GRIDIBLE_PLUGIN_DIR . '/patterns/';
    if ( ! is_dir( $dirpath ) || ! is_readable( $dirpath ) || ! file_exists( $dirpath ) ) {
      return;
    }

    $all_patterns_registration_success = TRUE;
    $patterns_registered = 0;
    
    $files = glob( $dirpath . '*.php' );
    if ( $files ) {
      foreach ( $files as $file ) {
        $pattern_data = get_file_data( $file, $default_headers );

        if ( empty( $pattern_data['slug'] ) ) {
          _doing_it_wrong(
            '_register_theme_block_patterns',
            sprintf(
            /* translators: %s: file name. */
              __( 'Could not register file "%s" as a block pattern ("Slug" field missing)', 'gutenberg' ),
              $file
            ),
            '6.0.0'
          );
          continue;
        }

        if ( ! preg_match( '/^[A-z0-9\/_-]+$/', $pattern_data['slug'] ) ) {
          _doing_it_wrong(
            '_register_theme_block_patterns',
            sprintf(
            /* translators: %1s: file name; %2s: slug value found. */
              __( 'Could not register file "%1$s" as a block pattern (invalid slug "%2$s")', 'gutenberg' ),
              $file,
              $pattern_data['slug']
            ),
            '6.0.0'
          );
        }

        if ( \WP_Block_Patterns_Registry::get_instance()->is_registered( $pattern_data['slug'] ) ) {
          continue;
        }

        // Title is a required property.
        if ( ! $pattern_data['title'] ) {
          _doing_it_wrong(
            '_register_theme_block_patterns',
            sprintf(
            /* translators: %1s: file name; %2s: slug value found. */
              __( 'Could not register file "%s" as a block pattern ("Title" field missing)', 'gutenberg' ),
              $file
            ),
            '6.0.0'
          );
          continue;
        }

        // For properties of type array, parse data as comma-separated.
        foreach ( array( 'categories', 'keywords', 'blockTypes', 'postTypes', 'templateTypes' ) as $property ) {
          if ( ! empty( $pattern_data[ $property ] ) ) {
            $pattern_data[ $property ] = array_filter(
              preg_split(
                '/[\s,]+/',
                (string) $pattern_data[ $property ]
              )
            );
          } else {
            unset( $pattern_data[ $property ] );
          }
        }

        // Parse properties of type int.
        foreach ( array( 'viewportWidth' ) as $property ) {
          if ( ! empty( $pattern_data[ $property ] ) ) {
            $pattern_data[ $property ] = (int) $pattern_data[ $property ];
          } else {
            unset( $pattern_data[ $property ] );
          }
        }

        // Parse properties of type bool.
        foreach ( array( 'inserter' ) as $property ) {
          if ( ! empty( $pattern_data[ $property ] ) ) {
            $pattern_data[ $property ] = in_array(
              strtolower( $pattern_data[ $property ] ),
              array( 'yes', 'true' ),
              true
            );
          } else {
            unset( $pattern_data[ $property ] );
          }
        }

        // Translate the pattern metadata.
        $text_domain = $theme->get( 'TextDomain' );
        //phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText, WordPress.WP.I18n.NonSingularStringLiteralContext, WordPress.WP.I18n.NonSingularStringLiteralDomain, WordPress.WP.I18n.LowLevelTranslationFunction
        $pattern_data['title'] = translate_with_gettext_context( $pattern_data['title'], 'Pattern title', $text_domain );
        if ( ! empty( $pattern_data['description'] ) ) {
          //phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText, WordPress.WP.I18n.NonSingularStringLiteralContext, WordPress.WP.I18n.NonSingularStringLiteralDomain, WordPress.WP.I18n.LowLevelTranslationFunction
          $pattern_data['description'] = translate_with_gettext_context( $pattern_data['description'], 'Pattern description', $text_domain );
        }

        // The actual pattern content is the output of the file.
        ob_start();
        include $file;
        $pattern_data['content'] = ob_get_clean();
        if ( ! $pattern_data['content'] ) {
          continue;
        }

        $registration_success = register_block_pattern( $pattern_data['slug'], $pattern_data );

        if ($registration_success) {
          $patterns_registered += 1;
        }

        $all_patterns_registration_success = $all_patterns_registration_success && $registration_success;
      }
    }

    return $all_patterns_registration_success;
  }
}

?>
