<?php
namespace Gridible\Plugin\Core\License;

use \Gridible\Plugin\Core\Settings\Settings;
use \Gridible\Plugin\Core\Settings\SettingsPage;
use \Gridible\Plugin\Core\ConfigManager;


class LicenseManager {
  private LicenseStatusTransient $license_status;
  private string $site;

  public function __construct($site = NULL) {
    $this->site = !empty($site) ? $site : site_url();

    $this->license_status = new LicenseStatusTransient();
  }
  
  public function register(): void {
    add_action(
      'admin_notices',
      [$this, 'renderAdminNotice']
    );

    // WARN: this is a weird place to put settings page listeners.
    add_action(
      'add_option_' . Settings::$SETTINGS_KEY_CLIENT_EMAIL,
      [$this, 'onSettingsUpdate'],
      10, 
      2
    );
    add_action(
      'add_option_' . Settings::$SETTINGS_KEY_LICENSE_KEY,
      [$this, 'onSettingsUpdate'],
      10, 
      2
    );
    add_action(
      'update_option_' . Settings::$SETTINGS_KEY_CLIENT_EMAIL,
      [$this, 'onSettingsUpdate'],
      10, 
      2
    );
    add_action(
      'update_option_' . Settings::$SETTINGS_KEY_LICENSE_KEY,
      [$this, 'onSettingsUpdate'],
      10, 
      2
    );

    // Force activation checks on any plugin settings page persistence op
    // that is performed with enough config values to make an activation 
    // request.
    add_action(
      'pre_update_option_' . Settings::$SETTINGS_KEY_LICENSE_KEY,
      function(mixed $value, mixed $old_value, string $option): mixed {
        // Conditionally force license check.
        $has_email = !empty(Settings::getClientEmail());
        $has_license_key = !empty($value);

        // If we have both email value (from options cache) and license key 
        // (directly from options page save form values), then go ahead and 
        // try to activate license.
        if ($has_email && $has_license_key) {
          $this->activate();
        }

        // Always return the value. We're not really filtering here, just using
        // this as a hook to ensure we can force activation status checks from
        // the plugin settings page without actually changing configuration 
        // values.
        return $value;
      },
      10,
      3
    );
  }

  public function hasRequiredLicenseConfigValues(): bool {
    $client_email = Settings::getClientEmail();
    $license_key = Settings::getLicenseKey();

    $has_client_email = !empty($client_email);
    $has_license_key = !empty($license_key);

    return $has_client_email && $has_license_key;
  }

  public function onSettingsUpdate($old_value, $new_value): void {
    if ($this->hasRequiredLicenseConfigValues()) {
      $this->activate();
    } else {
      // We don't have enough license information, clear license status.
      $this->license_status->setCheckResult(FALSE);
    }
  }
  
  public function renderAdminNotice(): void {
    if (!$this->hasValidLicense()) {
      $class = 'notice notice-error';
      $settings_page_url = menu_page_url(SettingsPage::$PAGE_SLUG, FALSE);

      $settings_page_link = "<a href=\"{$settings_page_url}\">Gridible Settings page</a>";

      $has_necessary_license_values = $this->hasRequiredLicenseConfigValues();
      if ($has_necessary_license_values) {
        $message = __("Gridible is unlicensed. The provided license key details could not be validated. Please update your license key details on the {$settings_page_link}", 'gridible');
      } else {
        $message = __("Gridible is unlicensed. Please provide your license key details on the {$settings_page_link}", 'gridible');
      }
    
      printf(
        '<div class="%1$s"><p>%2$s</p></div>', 
        esc_attr($class), 
        $message,
      ); 
    }
  }

  public function hasValidLicense(): bool {
    $is_status_valid = $this->license_status->isStatusValid();

    if ($is_status_valid === TRUE) {
      // Status is currently valid, move on.
      return $is_status_valid;
    }

    // If status is invalid, then check if it's expired.
    $is_status_expired = $this->license_status->isStatusExpired();
    
    if ($is_status_expired === FALSE) {
      // Status isn't expired, so license check is accurate and site is 
      // unlicensed.
      return $is_status_valid;
    }
    
    // Status is expired, so attempt to refresh.
    $license_check_result = $this->isSiteActive();
    if ($license_check_result) {
      $this->license_status->setCheckResult($license_check_result);
    } else {
      $license_check_result = $this->activate();
    }

    return $license_check_result;
  }

  private function makeRequest($action, $extra_query_args = []): array|\WP_Error {
    $config_mgr = new ConfigManager();
    $config = $config_mgr->getConfig();
    $base_url = $config?->baseUrl;
    
    $query_args = [
      'wc-api' => 'software-api',
      'request' => $action,
      'product_id' => $config?->productId,
      // Client-specific config. Read from site settings.
      'email' => Settings::getClientEmail(),
      'license_key' => Settings::getLicenseKey(),
    ];
    $query_args = array_merge($query_args, $extra_query_args);
    $query_string = http_build_query($query_args);

    $request_url = "{$base_url}?{$query_string}";

    $headers = [];

    if (
      !empty($config?->dev?->authUsername)
      && !empty($config?->dev?->authPassword)
    ) {
      $authentication_username = $config->dev->authUsername;
      $authentication_password = $config->dev->authPassword;

      $headers['Authorization'] = 'Basic ' . base64_encode($authentication_username . ':' . $authentication_password);
    }

    $request_args = [
      'headers' => $headers,
    ];
    $response = wp_remote_get($request_url, $request_args);

    return $response;
  }

  public function deactivate(): bool {
    // Assume that the license is deactivated, can resolve later if that's wrong.
    $this->license_status->setCheckResult(FALSE);

    $response = $this->makeRequest('deactivation');

    if (
      $response instanceof \WP_Error
      || wp_remote_retrieve_response_code($response) !== 200
    ) {
      // Failure during/to deactivate. Just return FALSE for now.
      return FALSE;
    }

    // At this point, expect to have a successful response.
    $body = wp_remote_retrieve_body($response);
    $body_json = json_decode($body);

    return FALSE;
  }

  public function cleanUp(): bool {
    return $this->license_status->cleanUp();
  }

  public function activate(string $instance = NULL): bool {
    // Start with a cleared license.
    $this->license_status->cleanUp();

    if (empty($instance)) {
      $instance = site_url();
    }
    
    $response = $this->makeRequest(
      'activation',
      [
        'instance' => $instance,
      ]
    );

    if (
      $response instanceof \WP_Error
      || wp_remote_retrieve_response_code($response) !== 200
    ) {
      // Failure during/to deactivate. Just return FALSE for now.
      $this->license_status->setCheckResult(FALSE);

      return FALSE;
    }

    // At this point, expect to have a successful response.
    $body = wp_remote_retrieve_body($response);
    $body_json = json_decode($body);

    $is_activated = $body_json->activated;
    $this->license_status->setCheckResult($is_activated);

    return $is_activated;
  }

  public function isSiteActive(): bool {
    $response = $this->makeRequest('check');

    // There's some kind of error talking to the server, assume that the
    // license is good. Don't want to disable the plugin just because of a
    // license server error.

    if ($response instanceof \WP_Error) {
      // Some kind of error in even making the request (e.g., unable to 
      // resolve hostname).
      return true;
    }

    // Check for a non-success response code (only proceeding if we receive 
    // status code 200).
    if (wp_remote_retrieve_response_code($response) !== 200) {
      return true;
    }

    // At this point, expect to have a successful response.
    $body = wp_remote_retrieve_body($response);
    $body_json = json_decode($body);

    if (!isset($body_json->activations)) {
      // Request denied, no activations found. Consider site inactive.
      return FALSE;
    }
    
    $site_url = site_url();
    $is_activated = FALSE;
    foreach ($body_json->activations as $activation) {
      if ($site_url === $activation->instance) {
        $is_activated = true;
        break;
      }
    }

    return $is_activated;
  }
}

?>
