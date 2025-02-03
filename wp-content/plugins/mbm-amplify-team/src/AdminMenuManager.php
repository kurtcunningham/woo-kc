<?php
namespace MBM\Amplify\Team;


class AdminMenuManager {
  public static function register(): void {
    // add_action(
    //   'admin_menu',
    //   [self::class, 'registerMenus'],
    //   10,
    //   0
    // );
  }
  
  public static function registerMenus(): void {
    $hook_suffix = add_menu_page(
      page_title: 'Amplify - Team',
      menu_title: 'Team',
      capability: 'edit_posts', 
      menu_slug: 'amplify-team', 
      callback: function() {
        echo '<h1>Amplify - Team</h1><p>Here is some placeholder content...</p>';
      }, 
      // 'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode( file_get_contents( plugin_dir_path( MBM_NPT_Team MemberS_PLUGIN_FILE ) . 'assets/icon.svg' ) )
      icon_url: 'dashicons-groups', 
      position: 20,
    );

    return;
  }
}
