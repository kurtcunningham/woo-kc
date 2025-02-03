<?php
namespace mbm\theme\timber;

use \Timber\Timber;


class MunstersTimberTheme extends \Timber\Site {
	public function __construct($options = []) {
		$package_name = "madebymunsters/munsters-wp-core-theme";
		$pretty_version = \Composer\InstalledVersions::getPrettyVersion($package_name);
		// Only last 8 chars of Git commit hash, to improve readability.
		$git_reference = substr(\Composer\InstalledVersions::getReference($package_name), -8);
		$full_package_version = "{$pretty_version} @ {$git_reference}";
		error_log("MunstersTheme - version: {$full_package_version}");

		parent::__construct();

		// Initialize Timber
		Timber::init();
	}
}
