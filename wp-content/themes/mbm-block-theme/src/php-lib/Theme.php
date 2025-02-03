<?php
namespace madebymunsters\BlockTheme;

use \Madebymunsters\Gutenberg\Support\Registration\SimpleBlockRegistrar;
use \Madebymunsters\Gutenberg\Support\Registration\BlockMetadataPathBuilder;
use \mbm\theme\gutenberg\CustomBlockPatternCategoriesRegistrar;
use \madebymunsters\BlockTheme\Blocks\CounterPHPStore;


class Theme {
  public string $theme_root;

  public function __construct($theme_root_file) {
    $this->theme_root = untrailingslashit($theme_root_file);
  }
  
  public function init() {
    $web_assets_registrar = new ThemeWebAssetsRegistrar();
    $web_assets_registrar->register();

    (new CustomBlockPatternCategoriesRegistrar(
      categories_json_path: $this->theme_root . '/patterns/categories.json'
    ))->register();
    
    $this->registerBlocks();

    $this->registerCPTs();

    // CounterPHPStore::register();

    // Remove core block patterns.
    add_action(
      'after_setup_theme',
      function() {
        remove_theme_support('core-block-patterns');
      }
    );
  }

  private function registerBlocks() {
    $block_locations = BlockMetadataPathBuilder::buildBlockPaths(
      base_dir: $this->theme_root . "/src/blocks",
      relative_block_paths: [
        // 'project-namespace/block-name',
        // 'demo/counter-ssr',
        // 'demo/counter-js',
        // 'demo/counter-php-store-v1',
        // 'demo/counter-php-store-v2',
        // 'demo/counter-global-v1',
        // 'demo/counter-global-v2',
      ],
    );
    
    $block_registrar = new SimpleBlockRegistrar($block_locations);
    $block_registrar->register();
  }

  private function registerCPTs() {
    // Add CPT config
    $cpt_config = [
      'post_types' => [
      ],
      'taxonomies' => [
      ],
    ];
		(new \mbm\data\cpt\CptRegistrar($cpt_config))->register();
  }
}
