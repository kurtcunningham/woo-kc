<?php
namespace mbm\util\classes;


class InterfaceMapper {
  public static function mapInNamespaces($namespaces) {
    $classes = \mbm\util\classes\ClassFinder::findInNamespaces($namespaces);

    return self::mapInClasses($classes);
  }

  public static function mapInClasses($classes) {
    $interface_map = [];

    foreach ($classes as $candidate_class) {
      $interfaces = class_implements($candidate_class);
      foreach ($interfaces as $implemented_interface) {
        $interface_map[$implemented_interface] = $interface_map[$implemented_interface] ?? [];
        $interface_map[$implemented_interface][] = $candidate_class;
      }
    }

    return $interface_map;
  }
}

?>