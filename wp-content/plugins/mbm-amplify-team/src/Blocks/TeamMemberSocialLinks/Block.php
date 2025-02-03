<?php
namespace MBM\Amplify\Team\Blocks\TeamMemberSocialLinks;

use voku\helper\HtmlDomParser;
use MBM\Amplify\Team\CustomPosts\Constants;


class Block {
  public static function register() {
    \MBM\Amplify\Team\Blocks\TeamMemberSocialLinks\SocialLinksVariation\Block::register();
    \MBM\Amplify\Team\Blocks\TeamMemberSocialLinks\SocialLinkVariation\Block::register();
  }
}

?>
