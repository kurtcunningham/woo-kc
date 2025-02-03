<?php
namespace mbm\theme\timber;

class TwigAutoRegistrar {
  protected $namespaces = [];
  protected $twig_initialized = FALSE;

  public function __construct($namespaces = []) {
    if (is_string($namespaces)) {
      $namespaces = [$namespaces];
    }

    $this->namespaces = $namespaces;
  }

  public function register() {
    add_filter('timber/twig', [$this, 'updateTwig']);
  }
  
  protected static function twigComponentMapper($twig_class, $twig_component_class) {
    $twig_component = new $twig_component_class();
    return new $twig_class($twig_component->getName(), [$twig_component, 'execute']);
  }

  public function updateTwig($twig) {
    if ($this->twig_initialized) {
      return $twig;
    }

    $this->twig_initialized = TRUE;

    $filter_interface_fqn = 'mbm\\theme\\timber\\AutoloadTwigFilter';
    $function_interface_fqn = 'mbm\\theme\\timber\\AutoloadTwigFunction';
    $interface_class_map = \mbm\util\classes\InterfaceMapper::mapInNamespaces($this->namespaces);
    
    $twig_filters = array_map(
      function ($impl_class) {
        return self::twigComponentMapper('\Twig\TwigFilter', $impl_class);
      },
      $interface_class_map[$filter_interface_fqn] ?? []
    );
    $twig_functions = array_map(
      function ($impl_class) {
        return self::twigComponentMapper('\Twig\TwigFunction', $impl_class);
      },
      $interface_class_map[$function_interface_fqn] ?? []
    );

    $count = count($twig_filters);
    // error_log("[TwigAutoRegistrar] Registering {$count} filters.");
    foreach ($twig_filters as $filter) {
      $twig->addFilter($filter);
    }
    $count = count($twig_functions);
    // error_log("[TwigAutoRegistrar] Registering {$count} functions.");
    foreach ($twig_functions as $twig_func) {
      $twig->addFunction($twig_func);
    }

    return $twig;
  }
}