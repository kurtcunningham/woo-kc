<?php
namespace Gridible\Plugin\Core;

use \Gridible\Plugin\Core\WebAssetRegistrar;
use \Gridible\Plugin\Core\BlockPatternRegistrar;
use \Gridible\Plugin\Core\ConfigManager;
use \Gridible\Plugin\Core\UpdateManager;
use \Gridible\Plugin\Core\License\LicenseManager;
use \Gridible\Plugin\Core\Settings\SettingsPage;
use \Gridible\Plugin\Blocks\Carousel\Carousels;
use \Madebymunsters\Gutenberg\Support\Registration\SimpleBlockRegistrar;
use \Madebymunsters\Gutenberg\Support\Registration\BlockMetadataPathBuilder;


class PluginLoader {
  private LicenseManager $license_manager;
  private $plugin_root_file;
  private $plugin_root;

  public function __construct($plugin_root_file) {
    $this->plugin_root_file = $plugin_root_file;
    $this->plugin_root = untrailingslashit(plugin_dir_path($plugin_root_file));

    $config = new ConfigManager();
    $config->initConfig($this->plugin_root . DIRECTORY_SEPARATOR . 'config.json');

    $this->license_manager = new LicenseManager();
  }

  public function init(): void {
    $web_asset_registrar = new WebAssetRegistrar($this->plugin_root);
    $web_asset_registrar->register();

    $settings_page = new SettingsPage();
    $settings_page->register();

    (new UpdateManager())->register();

    (new PluginMetadataManager())->register();

    $this->license_manager->register();

    // Always register blocks, regardless of the license status.
    $block_locations = BlockMetadataPathBuilder::buildBlockPaths(
      base_dir: $this->plugin_root . "/src/blocks",
      relative_block_paths: [
        "container",
        "grid/grid-container",
        "grid/grid-column",
        "responsive-spacer",
        "carousel/CarouselContainer/QueryCarouselContainer",
        "carousel/CarouselContainer/StaticCarouselContainer",
        "carousel/CarouselSlide",
      ],
    );

    $block_registrar = new SimpleBlockRegistrar(
      $block_locations
    );
    $block_registrar->register();

    Carousels::register();
    
    // Check license validity.
    $is_license_valid = $this->license_manager->hasValidLicense();


    // Only register block patterns if we have a valid license.
    if ($is_license_valid) {
      BlockPatternRegistrar::register();
    }

    // If we don't have a valid license, then prevent the blocks from being
    // added in the editor.
    if (!$is_license_valid) {
      add_filter(
        'allowed_block_types_all',
        function(
          mixed $allowed_block_types, 
          \WP_Block_Editor_Context $block_editor_context
        ): mixed {
          $all_registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
          $filterable_blocks = $all_registered_blocks;
          
          unset($filterable_blocks['gridible/container']);
          unset($filterable_blocks['gridible/grid-container']);
          unset($filterable_blocks['gridible/grid-column']);
          unset($filterable_blocks['gridible/responsive-spacer']);
          
          $filtered_blocks = array_keys($filterable_blocks);
  
          return $filtered_blocks;
        },
        10,
        2
      );
    }

    register_activation_hook(
      $this->plugin_root_file,
      [$this, 'onActivate'],
    );

    register_deactivation_hook(
      $this->plugin_root_file,
      [$this, 'onDeactivate'],
    );
  }

  public function onActivate(): void {
    // The license manager handles activation errors.
    $this->license_manager->activate();

    // Clear supporting transients.
    ConfigManager::clearTransients();
    UpdateManager::clearTransients();
  }

  public function onDeactivate(): void {
    // Don't worry if the deactivation fails, it's not a big deal at this point.
    $this->license_manager->deactivate();

    // Clean up after the plugin.
    $this->license_manager->cleanUp();

    // Clear supporting transients.
    ConfigManager::clearTransients();
    UpdateManager::clearTransients();
  }
}

?>
