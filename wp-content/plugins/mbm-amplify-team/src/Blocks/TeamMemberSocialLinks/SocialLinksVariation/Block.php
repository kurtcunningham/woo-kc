<?php
namespace MBM\Amplify\Team\Blocks\TeamMemberSocialLinks\SocialLinksVariation;

use MBM\Amplify\Team\Blocks\Common\BlockMetadataAugmenter;


class Block {
  public static string $ROOT_BLOCK = 'core/social-links';

  public static function register() {
    BlockMetadataAugmenter::registerAugmenter(
      target_block_slug: self::$ROOT_BLOCK,
      augmentations: [
        'usesContext' => ['postId', 'postType'],
        'providesContext' => [
          'amplifyVariation' => 'amplifyVariation',
        ],
      ],
    );
  }
}

?>
