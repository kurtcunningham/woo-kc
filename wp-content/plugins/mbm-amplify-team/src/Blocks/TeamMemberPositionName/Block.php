<?php
namespace MBM\Amplify\Team\Blocks\TeamMemberPositionName;

use MBM\Amplify\Team\CustomPosts\Constants;
use MBM\Amplify\Team\Blocks\Common\BlockMetadataAugmenter;
use MBM\Amplify\Team\Blocks\Common\ConditionalRenderFilter;


class Block {
  public static string $ROOT_BLOCK = 'core/paragraph';

  public static function register() {
    ConditionalRenderFilter::registerPostContextFilter(
      target_block_slug: self::$ROOT_BLOCK,
      target_variant_slug: 'amplify-team/team-member-position-name',
      meta_keys: Constants::TEAM_MEMBER_POSITION_NAME,
    );

    BlockMetadataAugmenter::registerAugmenter(
      target_block_slug: self::$ROOT_BLOCK,
      augmentations: [
        'usesContext' => ['postId', 'postType'],
      ],
    );
  }
}

?>
