<?php
namespace Gridible\Plugin\Core;

use \stdClass;


class ConfigManager {
  public static string $CONFIG_TRANSIENT_KEY = 'gridible_config';
  public static int $CONFIG_TRANSIENT_DURATION = MINUTE_IN_SECONDS * 30;
  private ?stdClass $config = NULL;

  public function initConfig($config_file = NULL): bool {
    if ($config_file === NULL) {
      $config_file = GRIDIBLE_PLUGIN_DIR . DIRECTORY_SEPARATOR . 'config.json';
    }

    $config_contents_raw = file_get_contents($config_file);
    $config_contents = json_decode($config_contents_raw);
    
    $is_transient_set = set_transient(
      self::$CONFIG_TRANSIENT_KEY, 
      $config_contents, 
      self::$CONFIG_TRANSIENT_DURATION
    );

    return $is_transient_set;
  }

  public function hasConfig(): bool {
    $config = get_transient(self::$CONFIG_TRANSIENT_KEY, FALSE);

    return $config !== FALSE;
  }

  public function getConfig(): stdClass|NULL {
    if (empty($this->config)) {
      if (!$this->hasConfig()) {
        $this->initConfig();
      }

      $this->config = get_transient(self::$CONFIG_TRANSIENT_KEY, NULL);
    }

    return $this->config;
  }

  public static function clearTransients() {
    // Safe transient clear, to be WP Engine compatible
    $config = get_transient(self::$CONFIG_TRANSIENT_KEY, FALSE);
    
    $is_transient_deleted = FALSE;
    if ($config !== FALSE) {
      $is_transient_deleted = delete_transient(self::$CONFIG_TRANSIENT_KEY);
    }

    return $is_transient_deleted;
  }
}

?>
