<?php
namespace Madebymunsters\Gutenberg\Support\Registration;


class CapabilitiesChecker {
  private $is_init = FALSE;
  private $has_render_prop_support = FALSE;

  public function init() {
    // Version check for has render prop support.
    global $wp_version;

    $minimum_has_render_prop_support_version = 6.1;
    $version_matches = [];
    $is_match = preg_match('/^(\d+\.\d+).*/', $wp_version, $version_matches);
    if ($is_match) {
      $version_major_minor = $version_matches[1];
      $this->has_render_prop_support = floatval($version_major_minor) >= $minimum_has_render_prop_support_version;
    }

    $this->is_init = TRUE;
  }

  public function hasRenderPropSupport() {
    if (!$this->is_init) {
      $this->init();
    }

    return $this->has_render_prop_support;
  }
}

?>