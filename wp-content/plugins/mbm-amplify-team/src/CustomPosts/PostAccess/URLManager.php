<?php
namespace MBM\Amplify\Team\CustomPosts\PostAccess;

use MBM\Amplify\Team\CustomPosts\Constants;
use MBM\Amplify\Team\Settings\SettingsData;
use MBM\Amplify\Team\Settings\SiteOption;


class URLManager {

  public static function register() {
    (new PostGuard(
      post_type_slug: Constants::TEAM_MEMBER_CPT_SLUG,
      type_access_allowed_setting: SettingsData::getInstance()->teamPostAccessAllowed,
    ))->register();
    (new PostGuard(
      post_type_slug: Constants::CAREER_CPT_SLUG,
      type_access_allowed_setting: SettingsData::getInstance()->careersPostAccessAllowed,
    ))->register();
  }
}

class PostGuard {
  public const POST_ACCESS_ALLOWED_META_KEY = 'amplify_post_access_allowed';

  public function __construct(
    protected string $post_type_slug,
    protected SiteOption $type_access_allowed_setting,
  ) {}

  public function register() {
    add_action(
      'init',
      [$this, 'registerPostMeta'],
      // Fire late to ensure that the post type is registered
      25,
      0
    );

    add_action(
      'template_redirect',
      [$this, 'redirectPostSinglePage'],
      10,
      0
    );
  }

  public function registerPostMeta(): void {
    $meta_key_config = [
      'show_in_rest'       => true,
      'single'             => true,
      'type'               => 'boolean',
      'default'            => true,
      'sanitize_callback'  => 'rest_sanitize_boolean',
    ];

    register_post_meta(
      $this->post_type_slug,
      self::POST_ACCESS_ALLOWED_META_KEY,
      $meta_key_config,
    );
  }

  public function isPostAccessAllowed(\WP_Post $post): bool {
    $access_allowed = get_post_meta(
      $post->ID, 
      self::POST_ACCESS_ALLOWED_META_KEY, 
      true,
    );
    $access_allowed = boolval($access_allowed);

    return $access_allowed;
  }

  protected function redirect(): void {
    // If the post type doesn't have an archive, redirect to the home page.
    $has_archive = false;
    $post_types = get_post_types(['name' => $this->post_type_slug], 'objects');
    $post_type = array_shift($post_types);
    if ($post_type instanceof \WP_Post_Type) {
      $has_archive = $post_type->has_archive;
    }

    $redirect_url = $has_archive
      ? get_post_type_archive_link($this->post_type_slug)
      : home_url();

    wp_redirect(
      location: $redirect_url,
      status: 302 // Moved temporarily
    );

    exit;
  }

  public function redirectPostSinglePage(): void {
    if (is_singular($this->post_type_slug)) {
      global $post;

      if (!($post instanceof \WP_Post)) {
        return;
      }

      // Check if type access is allowed.
      $is_type_access_allowed = boolval($this->type_access_allowed_setting->get());
      if (!$is_type_access_allowed) {
        $this->redirect();
      }

      $is_post_access_allowed = $this->isPostAccessAllowed($post);
      if (!$is_post_access_allowed) {
        $this->redirect();
      }

      return;
    }
  }
}