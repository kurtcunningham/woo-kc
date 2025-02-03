<?php
/**
 * Plugin Name: 			Gridible
 * Plugin URI: 				https://gridible.com
 * Description: 			The WordPress plugin that makes creating layouts simple, fast, and efficient.  A flexible, responsive grid plugin built specifically for the Gutenberg editor. No more defining patterns or special blocks to create complex layouts. Simply add a group of columns, tinker with the column widths per breakpoint, and then sit back and watch the magic in action.
 * Version: 					2.3.0
 * Requires at least: 6.1
 * Requires PHP: 			8.0
 * Author:            Made by Munsters
 * Author URI:        https://madebymunsters.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package gridible
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("GRIDIBLE_PLUGIN_FILE", __FILE__);
define("GRIDIBLE_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("GRIDIBLE_PLUGIN_FILE_SLUG", basename(GRIDIBLE_PLUGIN_DIR) . DIRECTORY_SEPARATOR . basename(GRIDIBLE_PLUGIN_FILE));

// Plugin version idea based on this suggestion: https://wordpress.stackexchange.com/a/285644
$plugin_data = get_file_data(GRIDIBLE_PLUGIN_FILE, ['Version' => 'Version']);
define("GRIDIBLE_VERSION", !empty($plugin_data['Version']) ? $plugin_data['Version'] : '0.0.0');


// Composer autoload.
require_once(plugin_dir_path(__FILE__) . '/vendor/autoload.php');

use \Gridible\Plugin\Core\PluginLoader;
(new PluginLoader(plugin_root_file: __FILE__))->init();

function gridible_admin_style() {
  wp_register_style( 'custom_wp_admin_css', plugin_dir_url( __FILE__ ) . '/src/styles/admin/plugin-settings.css', false, '1.0.0' );
  wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'gridible_admin_style' );
