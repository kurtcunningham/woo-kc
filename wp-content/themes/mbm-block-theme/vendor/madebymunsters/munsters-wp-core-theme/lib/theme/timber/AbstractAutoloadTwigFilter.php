<?php
namespace mbm\theme\timber;


abstract class AbstractAutoloadTwigFilter implements AutoloadTwigFilter {
  use AutonamedComponent;

  abstract public function execute(...$params);
}
?>