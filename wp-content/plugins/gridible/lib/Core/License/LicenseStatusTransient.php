<?php
namespace Gridible\Plugin\Core\License;



class LicenseStatusTransient {
  public static string $TRANSIENT_KEY_LICENSE_STATUS = 'gridible_license_status';
  public static int $TRANSIENT_DURATION_DEFAULT = DAY_IN_SECONDS;
  public static int $TRANSIENT_DURATION_SHORT = 30;

  private $license_status = NULL;
  private $is_status_expired = TRUE;
  
  private function getStatus(): array|bool {
    return get_transient(self::$TRANSIENT_KEY_LICENSE_STATUS);
  }

  private function getStatusSafe(): array {
    $license_status = $this->getStatus();
    return $license_status === FALSE ? [] : $license_status;
  }

  public function isStatusExpired(): bool {
    return empty($this->getStatus()) ? TRUE : FALSE;
  }

  public function isStatusValid(): bool {
    $check_result = $this->getStatusSafe()['check_result'] ?? FALSE;

    return $check_result;
  }

  public function setCheckResult($new_check_result = TRUE): bool {
    $new_status = $this->getStatusSafe();

    // Check result is only good for a few seconds if it's false. We want to 
    // recheck in a hurry.
    $transient_duration = $new_check_result ? self::$TRANSIENT_DURATION_DEFAULT : self::$TRANSIENT_DURATION_SHORT;

    $new_status['check_result'] = $new_check_result;
    $transient_persistence_result = set_transient(
      self::$TRANSIENT_KEY_LICENSE_STATUS, 
      $new_status, 
      $transient_duration
    );

    return $transient_persistence_result;
  }

  public function cleanUp(): bool {
    $success = FALSE;

    if ($this->getStatus() !== FALSE) {
      // Only attempt to delete the transient if it's present.
      // This avoid an error on WPE: https://wordpress.org/support/topic/undefined-array-key-delete/
      $success = delete_transient(self::$TRANSIENT_KEY_LICENSE_STATUS);
    }
    
    return $success;
  }
}

?>
