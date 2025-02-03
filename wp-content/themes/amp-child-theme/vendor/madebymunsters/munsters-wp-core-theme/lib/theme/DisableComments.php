<?php
namespace mbm\theme;

class DisableComments implements \mbm\theme\AutoRegister {
  public function register() {
    add_action('admin_menu', [$this, 'removeFromAdminMenus']);
    add_action('init', [$this, 'removeCommentSupport'], 100);
    add_action('wp_before_admin_bar_render', [$this, 'removeFromAdminBar']);
  }
  
  // Removes from admin menu
  public function removeFromAdminMenus() {
    remove_menu_page('edit-comments.php');
  }
  
  // Removes from post and pages
  function removeCommentSupport() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
  }

  // Removes from admin bar
  function removeFromAdminBar() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
  }
}
?>
