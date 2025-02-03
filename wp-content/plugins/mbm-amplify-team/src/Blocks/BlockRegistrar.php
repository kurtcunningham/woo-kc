<?php
namespace MBM\Amplify\Team\Blocks;


class BlockRegistrar {
  public static function register() {
    \MBM\Amplify\Team\Blocks\CareerJobPostingButtons\Block::register();
    \MBM\Amplify\Team\Blocks\TeamMemberContactButtons\Block::register();
    \MBM\Amplify\Team\Blocks\TeamMemberPositionName\Block::register();
    \MBM\Amplify\Team\Blocks\TeamMemberSocialLinks\Block::register();
  }
}

?>
