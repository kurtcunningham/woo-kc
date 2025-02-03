<?php
namespace mbm\theme\timber\Components;

use \mbm\theme\timber\Rendering\TimberTwigRenderer;


abstract class AbstractTwigComponent {
  public function getTemplatePath(string $container_dir): string {
    // Using get_class($this) allows the call to get the child class. Using
    // self::class will only return this abstract class.
    $fq_class_name = get_class($this);
    $class_name_segments = explode('\\', $fq_class_name);
    $class_name = end($class_name_segments);
    $container_dir = $container_dir ?: dirname(__FILE__);
    $template_file = $container_dir . DIRECTORY_SEPARATOR . "{$class_name}.twig";

    return $template_file;
  }

  public function render($comp_data = [], $container_dir = NULL) {
    $template_file = $this->getTemplatePath($container_dir);
    
    // \Timber\Timber::render( $template_file, $comp_data );
    return TimberTwigRenderer::render(
      template_path: $template_file,
      data: $comp_data,
    );
  }
}

?>
