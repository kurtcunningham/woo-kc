<?php
namespace mbm\theme;

use \mbm\util\FilterHelper;


class ThemeSettings implements \mbm\theme\AutoRegister {
  private static string $manage_options_key = 'manage_options';
  public static ?FilterHelper $manage_options_filter = NULL;
  
  public function register() {
    add_action('after_switch_theme', [$this, 'addCapabilities']);
		add_action('switch_theme', [$this, 'removeCapabilities']);
		add_action('init', [$this, 'addOptionsPage']);
  }

  public function addCapabilities(): void {
    $manage_options_roles = static::manageOptionsFilter()->filter();

    foreach ($manage_options_roles as $role_name) {
      $role = get_role($role_name);

      if (!empty($role)) {
        $role->add_cap(self::$manage_options_key);
      }
    }
  }

  public function removeCapabilities(): void {
    $manage_options_roles = static::manageOptionsFilter()->filter();

    foreach ($manage_options_roles as $role_name) {
      $role = get_role($role_name);

      if (!empty($role)) {
        $role->remove_cap(self::$manage_options_key);
      }
    }
  }

  public function addOptionsPage(): void {
    \mbm\theme\acf\SafeOptionsRegistrar::addOptionsPage([
			'page_title' 	=> 'Theme General Settings',
			'menu_title'	=> 'Theme Settings',
			'capability'	=> self::$manage_options_key, // NOTE: Only admins can see theme options
			'redirect'		=> false,
			'icon_url'    => 'dashicons-hammer',
		]);
  }

  public static function manageOptionsFilter(): FilterHelper {
    return FilterHelper::getStaticFilterHelper(
      self::class,
      'manage_options_filter',
      [
        'filter_name' => 'mbm/theme/ThemeSettings/manage_options_roles',
        'filter_default_value' => ['editor'],
        'filter_args_count' => 1
      ]
    );
  }
}

?>