<?php
namespace MBM\Amplify\Team\Blocks\TeamMemberContactButtons\ButtonVariation;

use MBM\Amplify\Team\CustomPosts\Constants;
use MBM\Amplify\Team\Blocks\Common\BlockMetadataAugmenter;
use MBM\Amplify\Team\Blocks\Common\ConditionalRenderFilter;


class Block {
  public static string $ROOT_BLOCK = 'core/button';

  public static function register() {
    ConditionalRenderFilter::registerPostContextFilter(
      target_block_slug: self::$ROOT_BLOCK,
      target_variant_slug: 'amplify-team/team-member-contact-button',
      meta_keys: Constants::TEAM_MEMBER_CONTACT_EMAIL,
    );

    BlockMetadataAugmenter::registerAugmenter(
      target_block_slug: self::$ROOT_BLOCK,
      augmentations: [
        'usesContext' => ['postId', 'postType'],
      ],
    );

    add_action(
      'init',
      function() {
        if (!function_exists('register_block_bindings_source')) {
          return;
        }

        register_block_bindings_source(
          'amplify-team/team-member-contact-button-url',
          [
            'label' => "Team Member Contact Button",
            'get_value_callback' => [self::class, 'contactButtonBindingCallback'], 
            'uses_context' => ['postId', 'postType'],
          ]
        );
      },
      10,
      0
    );
  }

  public static function contactButtonBindingCallback(
    array $source_args, 
    \WP_Block $block_instance, 
    string $attribute_name
  ): string {
    $default_return_value = '';

    if (
      ($attribute_name !== 'url') ||
      (empty($source_args['key'] ?? ''))
    ) {
      return $default_return_value;
    }

    $context_post_id = $block_instance?->context["postId"] ?? FALSE;

    if (!is_integer($context_post_id)) {
      return $default_return_value;
    }

    $meta_value = get_post_meta($context_post_id, $source_args['key'], TRUE);
    
    if (empty($meta_value)) {
      return $default_return_value;
    }
    
    $prefix = $source_args['prefix'] ?? '';

    $url = empty($prefix) ? $meta_value : "{$prefix}:{$meta_value}";

    return $url;
  }
}

?>
