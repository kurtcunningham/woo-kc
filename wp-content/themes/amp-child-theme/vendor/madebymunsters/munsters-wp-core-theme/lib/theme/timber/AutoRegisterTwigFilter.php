<?php
namespace mbm\theme\timber;


trait AutoRegisterTwigFilter {
  use \mbm\theme\timber\AutonamedComponent;

  public function register() {
    add_filter('timber/twig', [$this, 'updateTwig']);
  }

  public function updateTwig($twig) {
    $twig->addFilter(new \Twig\TwigFilter($this->getName(), [$this, 'execute']));
    return $twig;
  }

  abstract public function execute(...$params);
}
?>
