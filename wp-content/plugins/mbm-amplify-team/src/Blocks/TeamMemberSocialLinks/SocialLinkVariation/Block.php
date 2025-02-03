<?php
namespace MBM\Amplify\Team\Blocks\TeamMemberSocialLinks\SocialLinkVariation;

use voku\helper\HtmlDomParser;
use MBM\Amplify\Team\CustomPosts\Constants;
use MBM\Amplify\Team\Blocks\Common\BlockMetadataAugmenter;


function getURLFromPostMeta(int $post_id, string $service) {
  if (empty($post_id)) {
    return NULL;
  }

  $meta_key = NULL;
  switch ($service) {
    // Possible to select either service in Gutenberg's stock social icons.
    case 'x':
    case 'twitter':
      $meta_key = Constants::TEAM_MEMBER_SOCIAL_XTWITTER_URL;
      break;
      
    case 'linkedin':
      $meta_key = Constants::TEAM_MEMBER_SOCIAL_LINKEDIN_URL;
      break;
  }

  if (empty($meta_key)) {
    return NULL;
  }

  $url = get_post_meta($post_id, $meta_key, TRUE);

  return $url;
}

class Block {
  public static string $ROOT_BLOCK = 'core/social-link';

  public static function register() {
    add_filter(
      'render_block_' . self::$ROOT_BLOCK, 
      [self::class, 'filterRenderBlock'], 
      10,
      3
    );

    add_filter(
      'render_block_data', 
      [self::class, 'filterRenderBlockData'], 
      5,
      3
    );

    BlockMetadataAugmenter::registerAugmenter(
      target_block_slug: self::$ROOT_BLOCK,
      augmentations: [
        'usesContext' => ['postId', 'postType', 'amplifyVariation'],
      ],
    );
  }

  public static function filterRenderBlockData(array $parsed_block, array $source_block, \WP_Block|null $parent_block) {
    if ($parsed_block['blockName'] !== self::$ROOT_BLOCK) {
      return $parsed_block;
    }

    $parent_amp_variation = $parent_block?->attributes["amplifyVariation"] ?? FALSE;
    if ($parent_amp_variation !== 'amplify-team/team-member-social-links') {
      return $parsed_block;
    }

    $context_post_type = $parent_block?->context["postType"] ?? '';
    $context_post_id = $parent_block?->context["postId"] ?? FALSE;
    if ($context_post_type !== Constants::TEAM_MEMBER_CPT_SLUG || !is_integer($context_post_id)) {
      return $parsed_block;
    }

    $url = getURLFromPostMeta(
      post_id: $context_post_id,
      service: $parsed_block['attrs']['service'] ?? NULL,
    );

    if (!empty($url)) {
      $parsed_block['attrs']['url'] = $url;
    }

    return $parsed_block;
  }

  public static function filterRenderBlock($block_content, $block, $block_instance) {
    $is_variation = ($block_instance->context["amplifyVariation"] ?? '') === 'amplify-team/team-member-social-links';
    $has_service = !empty($block["attrs"]["service"] ?? '');
    $has_url = !empty($block["attrs"]["url"] ?? '');
    if (!$is_variation || !$has_service || !$has_url) {
      return $block_content;
    }

    $url = getURLFromPostMeta(
      post_id: $block_instance?->context["postId"],
      service: $block['attrs']['service'] ?? NULL,
    );

    if (empty($url)) {
      return "";
    }

    $html_dom = HtmlDomParser::str_get_html($block_content);
    $anchor_tag = $html_dom->findOne('a.wp-block-social-link-anchor');

    if (empty($anchor_tag)) {
      // Could not find the expected anchor tag, don't alter block content.
      return $block_content;
    }

    // Have the link open in a new tab.
    $anchor_tag->target = '_blank';

    return $html_dom->save();
  }
}

?>
