<?php
namespace mbm\theme\timber;


trait AutonamedComponent {
  public function getName() {
    $fqn = get_class($this);
    $fqn_parts = explode('\\', $fqn);
    return lcfirst(end($fqn_parts));
  }
}

?>