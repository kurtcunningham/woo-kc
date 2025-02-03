<?php
/**
 * Plugin Name: 			Amplify Customizer
 * Description: 			Provides customized components and features built on top of the Amplify framework..
 * Version: 					0.1.0
 * Requires at least: 6.6
 * Requires PHP: 			8.2
 * Author:            Unrelated
 * Author URI:        https://unrelated.co/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("AMP_CLIENT_PLUGIN_PLUGIN_FILE", __FILE__);
define("AMP_CLIENT_PLUGIN_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("AMP_CLIENT_PLUGIN_PLUGIN_FILE_SLUG", basename(AMP_CLIENT_PLUGIN_PLUGIN_DIR) . DIRECTORY_SEPARATOR . basename(AMP_CLIENT_PLUGIN_PLUGIN_FILE));
define("AMP_CLIENT_PLUGIN_TXT_DOMAIN", 'ampclientplugin');

// Composer autoload.
require_once(plugin_dir_path(__FILE__) . '/vendor/autoload.php');


use \Unrelated\Amplify\CustomizerPlugin\PluginLoader;
(new PluginLoader(plugin_root_file: __FILE__))->start();
