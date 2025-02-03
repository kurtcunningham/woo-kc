<?php
namespace mbm\util;


use \Closure;

class FilterHelper {
  public function __construct(public string $filter_name, public $filter_default_value = NULL, public $filter_args_count = 1) { }

  public function add(Closure $filter_fn, $priority = 10, $args_count = NULL) {
    $args_count = isset($args_count) ? $args_count : $this->filter_args_count;
    add_filter($this->filter_name, $filter_fn, $priority, $args_count);
  }
  
  public function filter() {
    return apply_filters($this->filter_name, $this->filter_default_value);
  }

  public static function getStaticFilterHelper($class_name, $prop_name, $filter_args) {
    $static_prop = new \ReflectionProperty($class_name, $prop_name);
    $static_value = $static_prop->getValue();

    if ($static_value == NULL) {
      $static_value = new FilterHelper(...$filter_args);
      $static_prop->setValue($static_value);
    }

    return $static_value;
  }
}

?>
