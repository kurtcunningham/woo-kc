<?php
namespace mbm\theme\gutenberg\BlockTemplates;

use \Twig\Environment;
use \Timber\Twig_Function;


class BlockTemplatePartsHelper implements \mbm\theme\AutoRegister {
  public function register(): void {
    add_filter('timber/twig', [$this, 'addTwigFunctions'], 10, 1);
  }

  public function addTwigFunctions(Environment $twig): Environment {
    $block_template_part_fn = new Twig_Function(
      'block_template_part',
      'block_template_part'
    );

    $twig->addFunction($block_template_part_fn);

    return $twig;
  }
}

?>
