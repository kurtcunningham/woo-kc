<?php
namespace mbm\theme\timber\Components;

use \Twig\Environment;
use \Timber\Twig_Function;


class RenderComponent implements \mbm\theme\AutoRegister {
  public function register(): void {
    add_filter('timber/twig', [$this, 'addTwigFunctions'], 10, 1);
  }

  public function addTwigFunctions(Environment $twig): Environment {
    $render_fn = new Twig_Function(
      'renderComponent',
      [$this, 'renderComponent']
    );

    $twig->addFunction($render_fn);

    return $twig;
  }

  public function renderComponent($comp_class, $comp_data = []) {
    $component = new $comp_class();

    return $component->render($comp_data);
  }
}

?>
