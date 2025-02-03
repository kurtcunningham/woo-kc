<?php
/**
 * Plugin Name: 			Amplify - Events
 * Description: 			Amplify Events is a versatile and powerful WordPress plugin designed to streamline the management and promotion of events on your website. Whether you're organizing conferences, workshops, meetups, or community gatherings, Amplify Events provides all the tools you need to create, showcase, and manage your events with ease.
 * Version: 					0.3.0
 * Requires at least: 6.1
 * Requires PHP: 			8.2
 * Author:            Made by Munsters
 * Author URI:        https://madebymunsters.com/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("MBM_NPT_EVENTS_PLUGIN_FILE", __FILE__);
define("MBM_NPT_EVENTS_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("MBM_NPT_EVENTS_PLUGIN_FILE_SLUG", basename(MBM_NPT_EVENTS_PLUGIN_DIR) . DIRECTORY_SEPARATOR . basename(MBM_NPT_EVENTS_PLUGIN_FILE));
define("MBM_NPT_EVENTS_TXT_DOMAIN", 'mbmnptevents');

// Composer autoload.
require_once(plugin_dir_path(__FILE__) . '/vendor/autoload.php');


use \MBM\NonProfitToolkit\Events\PluginLoader;
(new PluginLoader(plugin_root_file: __FILE__))->start();
// (new PluginLoader())->init();
