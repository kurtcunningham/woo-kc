<?php
namespace mbm\theme\timber;


interface AutoloadTwigFilter {
  public function getName();
  public function execute(...$params);
}
?>
