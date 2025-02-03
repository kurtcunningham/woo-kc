<?php
namespace Gridible\Plugin\Core;

use \stdClass;


class UpdateManager {
  public static string $UPDATE_TRANSIENT_KEY = 'gridible_update_latest_version';
  public static int $UPDATE_TRANSIENT_DURATION = MINUTE_IN_SECONDS * 15;
  private ConfigManager $config_mgr;

  public function __construct() {
    $this->config_mgr = new ConfigManager();
  }

  public function register() {
    add_filter('site_transient_update_plugins', [$this, 'filterUpdateCheck']);
    add_filter('plugins_api', [$this, 'filterPluginsAPI'], 10, 3);
  }

  private function getLatestVersion() {
    $latest_version = get_transient(self::$UPDATE_TRANSIENT_KEY, FALSE);

    if ($latest_version === FALSE) {
      $response = wp_remote_get(
        $this->config_mgr->getConfig()->baseUrl . '/wp-json/gridible/v1/releases/latest',
        [
          'headers' => [
            'Accept' => 'application/json'
          ]
        ]
      );
    
      // Something went wrong!
      if (
        is_wp_error($response) 
        || wp_remote_retrieve_response_code($response) !== 200
      ) {
        return null;
      }
  
      $latest_version = json_decode($response['body'] ?? 'null');

      set_transient(
        self::$UPDATE_TRANSIENT_KEY, 
        $latest_version, 
        self::$UPDATE_TRANSIENT_DURATION
      );
    }

    return $latest_version;
  }

  public static function clearTransients() {
    // Safe transient clear, to be WP Engine compatible
    $latest_version = get_transient(self::$UPDATE_TRANSIENT_KEY, FALSE);
    
    $is_transient_deleted = FALSE;
    if ($latest_version !== FALSE) {
      $is_transient_deleted = delete_transient(self::$UPDATE_TRANSIENT_KEY);
    }

    return $is_transient_deleted;
  }

  public function filterUpdateCheck($transient) {
    // Guard against weird transient bool values.
    // Credit for guards: https://gist.github.com/danielbachhuber/7684646
    if (!is_object($transient)) {
      return $transient;
    }

    $has_plugin_data_function = function_exists('get_plugin_data');
    if (!$has_plugin_data_function) {
      // Can't retrieve installed plugin metadata. This happens when the 
      // page is being read by an administrator but they're outside of the 
      // WP Admin panels. 
      // Ignore this request. For now, we'll only worry about plugin update 
      // checks that are performed from within the WP Admin panels.
      return $transient;
    }

    if (!isset($transient->response) || !is_array($transient->response)) {
      $transient->response = array();
    }

    $current_plugin_data = get_plugin_data(GRIDIBLE_PLUGIN_FILE);
    $plugin_transient_key = GRIDIBLE_PLUGIN_FILE_SLUG;
    
    $latest_version = $this->getLatestVersion();

    if (!empty($latest_version)) {
      $config_mgr = new ConfigManager();

      $plugin_data = new \stdClass();
      $plugin_data->id = GRIDIBLE_PLUGIN_FILE_SLUG;
      $plugin_data->slug = basename(GRIDIBLE_PLUGIN_DIR);
      $plugin_data->plugin = GRIDIBLE_PLUGIN_FILE_SLUG;
      $plugin_data->new_version = $latest_version->latestVersion;
      $plugin_data->package = $latest_version->downloadUrl;
      $plugin_data->url = $this->config_mgr->getConfig()->baseUrl;
      
      $is_newer_version_available = version_compare(
        $plugin_data->new_version, 
        $current_plugin_data["Version"], 
        ">"
      );
      
      if ($is_newer_version_available) {
        $transient->response[$plugin_transient_key] = $plugin_data;
      } else {
        $transient->no_update[$plugin_transient_key] = $plugin_data;
      }
    }
    
    return $transient;
  }

  public function filterPluginsAPI(bool|object|array $result, string $action, object $args) {
    // Basis for this plugins_api filter: https://rudrastyh.com/wordpress/self-hosted-plugin-update.html
    
    // Ignore if it's not a request plugin information
    if ('plugin_information' !== $action) {
      return $result;
    }

    $gridible_slug = basename(GRIDIBLE_PLUGIN_DIR);

    // Ignore if it isn't about our plugin
    if ($args->slug !== $gridible_slug) {
      return $result;
    }

    $update_manager = new UpdateManager();
    $latest_version = $update_manager->getLatestVersion();

    $result = new stdClass();
    $result->name = 'Gridible';
    $result->slug = $gridible_slug;
    $result->author = 'Made by Munsters';
    $result->version = $latest_version->latestVersion;
    $result->tested = '6.2';
    $result->requires = '6.1';
    $result->requires_php = '8.0';
    $result->download_link = $latest_version->downloadUrl;
    $result->trunk = $latest_version->downloadUrl;
    // $result->last_updated = $remote->last_updated;
    $changelog = '<h1>New in version ' . $latest_version->latestVersion . '</h1>' . $latest_version->releaseNotes;
    $result->sections = array(
      'changelog' => $changelog,
    );
    
    return $result;
  }
}

?>
