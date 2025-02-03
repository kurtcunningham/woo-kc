<?php
namespace MBM\Amplify\Team\CustomPosts;

use \MBM\Amplify\Team\Settings\SettingsData;
use \MBM\Amplify\Team\CustomPosts\PostAccess\URLManager;

class CustomPostRegistrar {
  public static function register(): void {
    add_action(
      'init',
      [self::class, 'registerCustomData'],
      20,
      0
    );

    URLManager::register();

    // Need to flush rewrite rules after registering CPT routes.
    register_activation_hook(
      MBM_AMP_TEAM_PLUGIN_FILE,
      [self::class, 'onActivatePlugin']
    );
    register_deactivation_hook(
      MBM_AMP_TEAM_PLUGIN_FILE,
      [self::class, 'onDeactivatePlugin']
    );
  }
  
  public static function registerCustomData(): void {
    $settings_data = SettingsData::getInstance();

    TeamMemberRegistrar::registerCustomData(
      slug: $settings_data->teamSlug->get(),
      has_archive: $settings_data->teamArchiveEnabled->get(),
    );
    CareerRegistrar::registerCustomData(
      slug: $settings_data->careersSlug->get(),
      has_archive: $settings_data->careersArchiveEnabled->get(),
    );
  }

  public static function onActivatePlugin(): void {
    self::registerCustomData();

    flush_rewrite_rules();
  }

  public static function onDeactivatePlugin(): void {
    $cpt_slugs = [
      Constants::TEAM_MEMBER_CPT_SLUG,
      Constants::CAREER_CPT_SLUG,
    ];

    $unregister_results = array_map(
      function(string $cpt_slug) {
        return unregister_post_type($cpt_slug);
      },
      $cpt_slugs
    );

    flush_rewrite_rules();
  }
}
