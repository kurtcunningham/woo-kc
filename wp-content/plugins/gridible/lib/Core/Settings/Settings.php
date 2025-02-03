<?php
namespace Gridible\Plugin\Core\Settings;


class Settings {
  public static $SETTINGS_KEY_CLIENT_EMAIL = 'gridible_client_email';
  public static $SETTINGS_KEY_LICENSE_KEY = 'gridible_client_license_key';

  public static function getClientEmail(): string|null {
    return get_option(self::$SETTINGS_KEY_CLIENT_EMAIL);
  }

  public static function getLicenseKey(): string|null {
    return get_option(self::$SETTINGS_KEY_LICENSE_KEY);
  }
}

?>
