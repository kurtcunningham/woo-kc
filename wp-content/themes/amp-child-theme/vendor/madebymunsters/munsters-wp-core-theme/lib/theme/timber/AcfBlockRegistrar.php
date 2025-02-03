<?php
namespace mbm\theme\timber;

/*
  Example usage:

  $acf_block_registrar = new \mbm\theme\timber\AcfBlockRegistrar();
  $block_config = $acf_block_registrar->addBlockConfig([
    'title' => "Section Heading", 
    'description' => "This block is used to call out new sections of an article. It features a title with a number slightly faded out behind the title.", 
    'icon' => "format-aside", 
    'keywords' => ["heading", "section", "case study"], 
    'render_template' => "blocks/_block-section-heading.twig",
  ]);
  $acf_block_registrar->register();
*/

class AcfBlockRegistrar {
  public function __construct() {
    error_log("[AcfBlockRegistrar] Constructed!");
  }

  public function register() {
    add_action('acf/init', [$this, 'registerBlocksWithAcf']);
  }

  public function addBlockConfig($block_config) {
    // Merge incoming block configuration with default values.
    $default_config_values = [
      // Note: this callback style never worked in this class, for some unknown reason.
			// 'render_callback' => [$this, 'acfBlockRenderCallback'],
      // ...a static callback, like the one below, works fine, though...
			'render_callback' => ['\\mbm\\theme\\timber\\AcfBlockRegistrar::acfBlockRenderCallback'],
      'keywords'        => [],
      'icon'            => NULL,
      'category'        => 'layout',
    ];

    $block_config = array_merge($default_config_values, $block_config);

    // Clean up values
    $block_config['name'] = strtolower(str_replace(" ", "_", $block_config['title']));
    $block_config['title'] = __($block_config['title']);
    $block_config['description'] = __($block_config['description']);

    $this->block_configs[] = $block_config;

    return $block_config;
  }

  public function registerBlocksWithAcf() {
    error_log("[AcfBlockRegistrar#registerBlocksWithAcf] Called...");
    
    // Exit early if ACF registration function isn't available.
    if (!function_exists('acf_register_block_type')) {
      return;
    }
    
    foreach ($this->block_configs as $block_config) {
      // error_log("[AcfBlockRegistrar#registerBlocksWithAcf] Registering: " . print_r($block_config, TRUE));
      acf_register_block_type($block_config);
    }
  }

	public static function acfBlockRenderCallback( $block, $content = '', $is_preview = false ) {
    error_log("[AcfBlockRegistrar#acfBlockRenderCallback] Called...");

    // Exit early if we don't have a render template.
    if (empty($block['render_template']) ) {
      return;
    }

    // Prepare the block context.
    // Note that this context will only apply to this particular block 
    // rendering.
    $context = Timber::get_context();
    $context['block'] = $block;
    $context['fields'] = get_fields();
    $context['is_preview'] = $is_preview;
    
    // Render the block.
    Timber::render( $block['render_template'], $context );
	}
}