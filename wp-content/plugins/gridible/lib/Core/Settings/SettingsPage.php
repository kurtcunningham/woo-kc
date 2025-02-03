<?php
namespace Gridible\Plugin\Core\Settings;

use \Gridible\Plugin\Core\License\LicenseManager;


/*
 * Credit: lots of this came from two sources:
 * - https://rudrastyh.com/wordpress/creating-options-pages.html
 * - https://wpmudev.com/blog/creating-wordpress-admin-pages/
 */

class SettingsPage {
  public static $PAGE_SLUG = 'gridible_settings';
  public static $LICENSE_SECTION_SLUG = 'gridible_license';
  public static $LICENSE_SECTION_FIELDS_SLUG = 'gridible_license_fields';

  public function register(): void {
    add_action('admin_menu', [$this, 'registerMenuPage']);
  }

  public function registerMenuPage(): void {
    add_options_page(
      'Gridible Settings',
      'Gridible',
      'manage_options',
      self::$PAGE_SLUG,
      [$this, 'renderPage']
    );

    add_settings_section(
      self::$LICENSE_SECTION_SLUG,
      'License',
      NULL,
      self::$PAGE_SLUG
    );

    register_setting(
      self::$LICENSE_SECTION_FIELDS_SLUG,
      Settings::$SETTINGS_KEY_CLIENT_EMAIL,
      [
        'default' => NULL,
        'show_in_rest' => FALSE,
        'sanitize_callback' => function($form_value) {
          return sanitize_email($form_value);
        }
      ]
    );
    register_setting(
      self::$LICENSE_SECTION_FIELDS_SLUG,
      Settings::$SETTINGS_KEY_LICENSE_KEY,
      [
        'default' => NULL,
        'show_in_rest' => FALSE,
        'sanitize_callback' => function($form_value) {
          return sanitize_text_field($form_value);
        }
      ]
    );

    $text_input_field = function($field_args) {
      printf(
        '<input type="%s" id="%s" name="%s" value="%s" />%s',
        $field_args['type'],
        $field_args['name'],
        $field_args['name'],
        get_option($field_args['name']),
        $field_args['description'] ?? '',
      );
    };

    add_settings_field(
      Settings::$SETTINGS_KEY_CLIENT_EMAIL,
      'Client email',
      // function to print the field
      $text_input_field,
      self::$PAGE_SLUG,
      self::$LICENSE_SECTION_SLUG,
      [
        'name' => Settings::$SETTINGS_KEY_CLIENT_EMAIL,
        'type' => 'email',
        'description' => '<p class="description">The email of the account used to purchase this license.</p>'
      ],
    );
    add_settings_field(
      Settings::$SETTINGS_KEY_LICENSE_KEY,
      'License key',
      // function to print the field
      $text_input_field,
      self::$PAGE_SLUG,
      self::$LICENSE_SECTION_SLUG,
      [
        'name' => Settings::$SETTINGS_KEY_LICENSE_KEY,
        'type' => 'text',
      ],
    );
  }

  public function renderPage(): void {
    ?>
      <div class="gridible-settings__header">
        <div class="gridible-settings__header-row">
          <div class="gridible-settings__header-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="109" height="18" fill="#fff" xmlns:v="https://vecta.io/nano"><path d="M0 1.929C0 .884 1.112 0 2.541 0h6.777c1.377 0 2.541.884 2.541 1.929v4.5c0 1.085-1.165 1.929-2.541 1.929H2.541C1.112 8.357 0 7.513 0 6.429v-4.5zm0 9.643c0-1.045 1.112-1.929 2.541-1.929h6.777c1.377 0 2.541.884 2.541 1.929v4.5c0 1.085-1.165 1.929-2.541 1.929H2.541C1.112 18 0 17.156 0 16.071v-4.5zM16.096 0h8.471c1.377 0 2.541.884 2.541 1.929v1.286c0 1.085-1.165 1.929-2.541 1.929h-8.471c-1.43 0-2.541-.844-2.541-1.929V1.929C13.554.884 14.666 0 16.096 0zm-2.541 8.357c0-1.045 1.112-1.929 2.541-1.929h8.471c1.377 0 2.541.884 2.541 1.929v1.286c0 1.085-1.165 1.929-2.541 1.929h-8.471c-1.43 0-2.541-.844-2.541-1.929V8.357zm2.541 4.5h8.471c1.377 0 2.541.884 2.541 1.929v1.286c0 1.085-1.165 1.929-2.541 1.929h-8.471c-1.43 0-2.541-.844-2.541-1.929v-1.286c0-1.045 1.112-1.929 2.541-1.929zm32.605 3.64h2.289v-7.98h-6.321v2.352h3.612v.084c0 1.659-1.533 3.402-3.864 3.402-2.583 0-4.2-2.247-4.2-5.313 0-2.982 1.407-5.334 4.242-5.334 1.932 0 3.045 1.05 3.381 2.499h2.982c-.483-2.94-2.646-5.019-6.426-5.019-2.016 0-3.612.609-4.83 1.722-1.575 1.449-2.457 3.633-2.457 6.132 0 2.268.714 4.2 1.953 5.586 1.239 1.365 3.003 2.184 5.271 2.184 1.785 0 3.192-.609 4.221-2.331h.042l.105 2.016zm6.938-10.773h-2.751v10.773h2.856v-5.25c0-2.268 1.344-3.255 3.213-3.066h.063V5.682c-.168-.063-.357-.084-.672-.084-1.26 0-1.995.63-2.646 1.848h-.063V5.724zm4.611 10.773h2.856V5.724H60.25v10.773zm0-12.453h2.856V1.482H60.25v2.562zm8.728 12.768c1.512 0 2.583-.693 3.213-1.722h.042v1.407h2.751V1.482h-2.856v5.544h-.063c-.588-.903-1.533-1.596-3.045-1.596-2.688 0-4.599 2.331-4.599 5.691 0 3.486 1.848 5.691 4.557 5.691zm.63-2.394c-1.47 0-2.289-1.218-2.289-3.297 0-1.995.798-3.381 2.373-3.381 1.827 0 2.499 1.386 2.499 3.444 0 1.974-.882 3.234-2.583 3.234zm7.233 2.079h2.856V5.724h-2.856v10.773zm0-12.453h2.856V1.482h-2.856v2.562zm10.702 12.768c2.709 0 4.557-2.205 4.557-5.691 0-3.36-1.932-5.691-4.641-5.691-1.491 0-2.415.693-3.003 1.596h-.063V1.482h-2.856v15.015h2.751v-1.344h.042c.63 1.008 1.701 1.659 3.213 1.659zm-.63-2.394c-1.596 0-2.583-1.26-2.583-3.234 0-1.995.672-3.444 2.478-3.444 1.596 0 2.394 1.386 2.394 3.381 0 2.079-.819 3.297-2.289 3.297zm6.56 2.079h2.856V1.482h-2.856v15.015zm9.798.315c2.772 0 4.473-1.617 4.872-3.528h-2.814c-.315.819-.966 1.323-2.079 1.323-1.617 0-2.541-1.029-2.751-2.688h7.812c0-3.843-1.848-6.489-5.313-6.489-3.15 0-5.313 2.478-5.313 5.67 0 3.213 2.016 5.712 5.586 5.712zm-.231-9.177c1.302 0 2.205.945 2.289 2.31h-4.788c.252-1.407.987-2.31 2.499-2.31z"/></svg>
          </div>
          <div class="gridible-settings__header-right">
            <a href="https://gridible.com" target="_blank">Visit Gridible</a>
          </div>
        </div>
      </div>
      <div class="gridible-settings__body">
        <div class="gridible-settings__section">
          <div class="gridible-settings__section-header">
            <h2 class="gridible-settings__section-header__title">Plugin Settings</h2>
          </div>
          <div class="gridible-settings__section-card">
            <form method="post" action="options.php">
              <?php
                settings_fields(self::$LICENSE_SECTION_FIELDS_SLUG);
                do_settings_sections(self::$PAGE_SLUG);
                // "Save Changes" button
                submit_button();
              ?>
            </form>
          </div>
        </div>
        <div class="gridible-settings__bg-grid">
          <div class="gridible-settings__bg-grid__inner">
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
            <div class="gridible-settings__bg-grid__cell"></div>
          </div>
        </div>
      </div>
    <?php
  }
}

?>
