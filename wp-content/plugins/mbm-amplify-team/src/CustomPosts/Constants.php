<?php
namespace MBM\Amplify\Team\CustomPosts;


class Constants {
  // Team Member - Post
  public const TEAM_MEMBER_CPT_SLUG = 'mbmamp_team_member';
  // Team Member - Taxonomies
  public const TEAM_MEMBER_CAT_SLUG = 'mbmamp_team_cat';
  // Team Member - Meta fields
  public const TEAM_MEMBER_POST_ACCESS_ALLOWED = self::TEAM_MEMBER_CPT_SLUG . '_post_access_allowed';
  public const TEAM_MEMBER_POSITION_NAME = self::TEAM_MEMBER_CPT_SLUG . '_position_name';
  public const TEAM_MEMBER_CONTACT = self::TEAM_MEMBER_CPT_SLUG . '_contact';
  public const TEAM_MEMBER_CONTACT_PHONE = self::TEAM_MEMBER_CPT_SLUG . '_contact_phone';
  public const TEAM_MEMBER_CONTACT_EMAIL = self::TEAM_MEMBER_CPT_SLUG . '_contact_email';
  public const TEAM_MEMBER_SOCIAL = self::TEAM_MEMBER_CPT_SLUG . '_social';
  public const TEAM_MEMBER_SOCIAL_LINKEDIN_URL = self::TEAM_MEMBER_CPT_SLUG . '_social_linkedin_url';
  public const TEAM_MEMBER_SOCIAL_XTWITTER_URL = self::TEAM_MEMBER_CPT_SLUG . '_social_xtwitter_url';


  // Career - Post
  public const CAREER_CPT_SLUG = 'mbmamp_team_career';
  // Career - Taxonomies
  public const CAREER_CAT_SLUG = 'mbmamp_team_car_cat';
  // Career - Meta fields
  public const CAREER_JOB_LINK_URL = self::CAREER_CPT_SLUG . '_job_link_url';
  

  // Common
  public const TEXT_DOMAIN = MBM_AMP_TEAM_TXT_DOMAIN;
}
