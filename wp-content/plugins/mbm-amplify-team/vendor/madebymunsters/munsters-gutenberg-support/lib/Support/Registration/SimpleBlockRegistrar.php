<?php
namespace Madebymunsters\Gutenberg\Support\Registration;

/*
  This is a simple registration technique than the sister BlockRegistrar.

  This registrar assumes that there are no compatibility checks or polyfills 
  needed. The only thing it does is loop through an array of block definitions
  and register each in turn, reporting (to error logs) any that fail.
 */

class SimpleBlockRegistrar {
  public array $block_defs;
  
  public function __construct($block_defs = []) {
    $this->block_defs = $block_defs;
  }

  public function register() {
    add_action('init', [$this, 'registerBlocks']);
  }

  public function registerBlocks() {
    // error_log("[SimpleBlockRegistrar] Registering blocks...");

    foreach( $this->block_defs as $block_def) {
      $block_args = [];

      $block_register_result = register_block_type(
        block_type: $block_def, 
        args: []
      );

      $is_register_success = $block_register_result !== FALSE;
      if (!$is_register_success) {
        error_log("[SimpleBlockRegistrar] Registration failed for block definition {$block_def}");
      }
    }
    // error_log("[SimpleBlockRegistrar] Done registering");
  }
}

?>