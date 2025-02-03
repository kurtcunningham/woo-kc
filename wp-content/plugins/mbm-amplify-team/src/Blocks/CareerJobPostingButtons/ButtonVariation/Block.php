<?php
namespace MBM\Amplify\Team\Blocks\CareerJobPostingButtons\ButtonVariation;

use MBM\Amplify\Team\CustomPosts\Constants;
use MBM\Amplify\Team\Blocks\Common\BlockMetadataAugmenter;
use MBM\Amplify\Team\Blocks\Common\ConditionalRenderFilter;


class Block {
  public static string $ROOT_BLOCK = 'core/button';

  public static function register() {
    ConditionalRenderFilter::registerPostContextFilter(
      target_block_slug: self::$ROOT_BLOCK,
      target_variant_slug: 'amplify-team/career-job-posting-button',
      meta_keys: Constants::CAREER_JOB_LINK_URL,
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
