<?php
namespace mbm\util\classes;


class ClassFinder {
  public static function findInNamespaces($namespaces) {
    if (!is_array($namespaces) && is_string($namespaces)) {
      $namespaces = [$namespaces];
    }

    $found_classes = [];
    foreach ($namespaces as $current_ns) {
      $ns_classes = \HaydenPierce\ClassFinder\ClassFinder::getClassesInNamespace(
        $current_ns, 
        \HaydenPierce\ClassFinder\ClassFinder::RECURSIVE_MODE
      );

      $found_classes = array_merge($found_classes, $ns_classes);
    }

    return $found_classes;
  }
}

?>