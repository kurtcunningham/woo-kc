<?php
namespace Gridible\Plugin\Core;


class PluginMetadataManager {
  private ConfigManager $config_mgr;
  
  public function __construct() {
    $this->config_mgr = new ConfigManager();
  }

  public function register() {
    add_filter('plugin_row_meta', [$this, 'filterPluginRowMeta'], 10, 4);
  }

  public function filterPluginRowMeta(array $plugin_meta, string $plugin_file, array $plugin_data, string $status) {
    if ($plugin_file === GRIDIBLE_PLUGIN_FILE_SLUG) {
      // Filter out the 'View details' link.
      $plugin_meta = array_filter(
        $plugin_meta,
        function($meta_item) {
          // Keep the meta item if it doesn't contain 'View details'
          return strpos($meta_item, 'View details') === FALSE;
        }
      );

      // Add 'Visit plugin site' link.
      $plugin_meta[] = '<a target="_blank" href="' . $this->config_mgr->getConfig()?->baseUrl . '">Visit plugin site</a>';

      // Add 'Changelog' link.
      $plugin_meta[] = '<a target="_blank" href="' . $this->config_mgr->getConfig()?->baseUrl . '/my-account/gridible-versions/">Changelog</a>';
    }

    return $plugin_meta;
  }
}

?>
