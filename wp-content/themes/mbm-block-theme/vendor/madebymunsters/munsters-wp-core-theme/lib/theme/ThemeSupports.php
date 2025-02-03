<?php
namespace mbm\theme;


abstract class ThemeSupports {
  protected $initialized = FALSE;
  protected $theme_supports_config = [];
  
  public function register() {
		add_action('after_setup_theme', [$this, 'configureThemeSupports']);
  }

  abstract public function loadConfig();

  protected function setConfig($new_config) {
    $this->theme_supports_config = $new_config;
    $this->initialized = TRUE;
  }

  public function configureThemeSupports() {
    if (!$this->initialized) {
      $this->loadConfig();
    }

    foreach ($this->theme_supports_config as $key => $value) {
      if (is_integer($key)) {
        // Theme support without args.
        // Theme support name is in value.
        add_theme_support($value);
      } else {
        // Theme support with args.
        // Theme support name is in key, the args are in value.
        add_theme_support($key, $value);
      }
    }
  }
}

?>