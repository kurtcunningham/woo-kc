<?php
namespace mbm\theme\timber;

interface AutoloadTwigFunction {
  public function getName();
  public function execute(...$params);
}

?>