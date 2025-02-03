<?php
namespace mbm\theme\timber;

use \Timber\Timber;


class TimberCustomMenus implements \mbm\theme\AutoRegister {
  public static $default_menus = [
    "topbar_main" => [
      "depth"	=>	1
    ],
    "footer_main" => [
      "depth"	=>	1
    ],
  ];
  public static $menus_filter = 'mbm/TimberCustomMenus/menus_filter';
  protected $menus = NULL;

  public function register() {
    add_action('init', [$this, 'registerMenus']);
    add_filter('timber/context', [$this, 'addToContext']);
  }

  public function registerMenus() {
    $menus = $this->getMenus();

    foreach ($menus as $menuName => $menuOpts) {
      $parsedName = ucwords(str_replace("_", " ", $menuName));
      register_nav_menu($menuName, __($parsedName, 'lt'));
    }
  }

  public function addToContext($context) {
    $menus = $this->getMenus();

		foreach ($menus as $menuName => $menuOpts) {
			$context[$menuName] = Timber::get_menu($menuName, $menuOpts);
		}

    return $context;
  }

  protected function getMenus() {
    if ($this->menus === NULL) {
      $this->menus = apply_filters(self::$menus_filter, self::$default_menus);
    }

    return $this->menus;
  }
}
?>
