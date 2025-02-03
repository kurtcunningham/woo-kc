<?php
/**
 * Plugin Name: 			Amplify - Team
 * Description: 			Amplify Team is a comprehensive plugin designed to streamline team management within your platform. Whether you're running a small startup or a large organization, Amplify Team empowers you to effortlessly add, organize, and showcase your team members and their bios. With intuitive features and customizable options, it becomes easier than ever to highlight the diverse talents and expertise within your team.
 * Version: 					0.3.2
 * Requires at least: 6.5
 * Requires PHP: 			8.2
 * Author:            Made by Munsters
 * Author URI:        https://madebymunsters.com/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("MBM_AMP_TEAM_PLUGIN_FILE", __FILE__);
define("MBM_AMP_TEAM_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("MBM_AMP_TEAM_PLUGIN_FILE_SLUG", basename(MBM_AMP_TEAM_PLUGIN_DIR) . DIRECTORY_SEPARATOR . basename(MBM_AMP_TEAM_PLUGIN_FILE));
define("MBM_AMP_TEAM_TXT_DOMAIN", 'mbmampteam');

// Composer autoload.
require_once(plugin_dir_path(__FILE__) . '/vendor/autoload.php');


use \MBM\Amplify\Team\PluginLoader;
(new PluginLoader(plugin_root_file: __FILE__))->start();
