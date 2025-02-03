<?php
namespace mbm\theme\timber;


trait AutoRegisterTwigFunction {
  use \mbm\theme\timber\AutonamedComponent;

  public function register() {
    add_filter('timber/twig', [$this, 'updateTwig']);
  }

  public function updateTwig($twig) {
    $twig->addFunction(new \Twig\TwigFunction($this->getName(), [$this, 'execute']));
    return $twig;
  }

  abstract public function execute(...$params);
}
?>
