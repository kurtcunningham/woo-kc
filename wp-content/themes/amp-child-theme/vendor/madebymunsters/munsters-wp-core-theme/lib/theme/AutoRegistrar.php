<?php
namespace mbm\theme;


class AutoRegistrar {
  public static $autoregister_interface_fqn = 'mbm\\theme\\AutoRegister';

  public static function register($classesAndNamespaces, $debug_log = FALSE) {
    $namespaces = [];
    $all_classes = [];

    if ($debug_log) {
      error_log("[AutoRegistrar] Looking for AutoRegister classes in: " . print_r($classesAndNamespaces, TRUE));
    }
    
    // Determine if the provided values are either classes or namespaces.
    foreach ($classesAndNamespaces as $classOrNamespace) {
      if (class_exists($classOrNamespace)) {
        // Detected a class.
        $all_classes[] = $classOrNamespace;
      } else {
        // Don't recognize the provided string as a class.
        // Either it's a class we couldn't load, or it's a namespace. Assume,
        // for now, that it's a namespace.
        $namespaces[] = $classOrNamespace;
      }
    }

    // For each namespace, attempt to find all classes belonging to that 
    // namespace.
    $classes_in_namespaces = \mbm\util\classes\ClassFinder::findInNamespaces($namespaces);
    
    // Merge found classes together and then map them to interfaces.
    $all_classes = array_merge($all_classes, $classes_in_namespaces);
    $interface_class_map = \mbm\util\classes\InterfaceMapper::mapInClasses($all_classes);

    $autoregister_classes = $interface_class_map[self::$autoregister_interface_fqn] ?? [];
    $class_count = count($autoregister_classes);
    if ($debug_log) {
      error_log("[AutoRegistrar] Found {$class_count} autoregister classes.");
    }

    // For each found AutoRegister class, instantiate and call #register().
    foreach ($autoregister_classes as $autoregister_class) {
      if ($debug_log) {
        error_log("[AutoRegistrar] Registering: {$autoregister_class}");
      }

      $instance = new $autoregister_class();
      $instance->register();
    }
  }
}
?>
