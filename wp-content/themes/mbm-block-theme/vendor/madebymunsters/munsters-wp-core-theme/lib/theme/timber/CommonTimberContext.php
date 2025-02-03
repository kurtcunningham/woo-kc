<?php
namespace mbm\theme\timber;


class CommonTimberContext {
  protected $theme = NULL;

  public function __construct($theme) {
    $this->theme = $theme;
  }

  public function register() {
    add_filter('timber/context', [$this, 'addToContext']);
  }

  public function addToContext($context) {
		if (!empty($this->theme)) {
      $context['site'] = $this->theme;
    }

    if (function_exists('get_fields')) {
      $context['options'] = get_fields('option');
    }

    return $context;
  }
}

?>