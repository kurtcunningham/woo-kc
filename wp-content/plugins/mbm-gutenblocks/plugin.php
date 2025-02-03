<?php
/**
 * Plugin Name: 			Amplify - Blocks
 * Plugin URI: 				https://madebymunsters.com/wordpress/mbm-gutenblocks
 * Description: 			Amplify Blocks is a dynamic WordPress plugin designed to elevate your content creation experience by offering a suite of customizable blocks. Whether you're a seasoned developer or a novice user, Amplify Blocks empowers you to effortlessly craft stunning and engaging layouts without any coding hassle.
 * Version: 					4.11.0
 * Requires at least: 6.4
 * Requires PHP: 			8.2
 * Author:            Made by Munsters
 * Author URI:        https://madebymunsters.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package mbm_gutenblocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


define("MBM_GUTENBLOCKS_PLUGIN_FILE", __FILE__);
define("MBM_GUTENBLOCKS_PLUGIN_DIR", plugin_dir_path(MBM_GUTENBLOCKS_PLUGIN_FILE));

// Plugin version idea based on this suggestion: https://wordpress.stackexchange.com/a/285644
$plugin_data = get_file_data(MBM_GUTENBLOCKS_PLUGIN_FILE, ['Version' => 'Version']);
define("MBM_GUTENBLOCKS_VERSION", !empty($plugin_data['Version']) ? $plugin_data['Version'] : '0.0.0');

// Composer autoload.
require_once(plugin_dir_path(__FILE__) . '/vendor/autoload.php');

use \Madebymunsters\Gutenblocks\Core\WebAssetRegistrar;
use \Madebymunsters\Gutenberg\Support\Registration\SimpleBlockRegistrar;
use \Madebymunsters\Gutenberg\Support\Registration\BlockMetadataPathBuilder;
use \Madebymunsters\Gutenblocks\Core\Blocks\ExcludePostQuery;
use \Madebymunsters\Gutenblocks\Core\Blocks\SinglePostVariation;
use \Madebymunsters\Gutenblocks\Core\Blocks\SelectedPostVariation;
use \Madebymunsters\Gutenblocks\Core\Blocks\RelatedPostsVariation;
use \Madebymunsters\Gutenblocks\Core\Blocks\TaxonomyFilter;
use \Madebymunsters\Gutenblocks\Core\Blocks\QueryFilterClearButton;
use \Madebymunsters\Gutenblocks\Core\Blocks\QueryFilterResetButton;
use \Madebymunsters\Gutenblocks\Core\Blocks\QueryFilterSubmitButton;
use \Madebymunsters\Gutenblocks\Core\Blocks\CurrentDate;
use \Madebymunsters\Gutenblocks\Core\Blocks\PostFeaturedImage;
// use \Madebymunsters\Gutenblocks\Core\Blocks\Carousel\Carousels;


$web_asset_registrar = new WebAssetRegistrar(__FILE__);
$web_asset_registrar->register();

// Dynamic block metadata location.
// $block_locations = (new BlockMetadataLocator())->findBlockPaths(dirname(__FILE__) . '/src/blocks/');

// Static block metadata declaration.
$block_locations = BlockMetadataPathBuilder::buildBlockPaths(
	base_dir: dirname(__FILE__) . "/src/blocks",
	relative_block_paths: [
		// "card",
		// "carousel",
		// "carousel/query",
		// "carousel/slide",
		// "chip",
		// "icon",
		// "innerblock-accordion",
		// "innerblock-accordion/body",
		// "innerblock-accordion/indicator",
		// "innerblock-accordion/title",
		
		// "accordion-details-summary",
		// "accordion-group",

		"semantic-wrapper",
		
		"query-result-count",
		"query-filter-container",
		"query-taxonomy-filter",

		"tab-layout/tab-layout",
		"tab-layout/tab-button",
		"tab-layout/tab-buttons",
		"tab-layout/tab-contents",
		"tab-layout/tab-content-pane",

		"post-terms-conditional-container",
	],
);

$block_registrar = new SimpleBlockRegistrar(
	$block_locations
);

$block_registrar->register();

ExcludePostQuery::register();
SinglePostVariation::register();
SelectedPostVariation::register();
RelatedPostsVariation::register();
TaxonomyFilter::register();
QueryFilterClearButton::register();
QueryFilterResetButton::register();
QueryFilterSubmitButton::register();
CurrentDate::register();
PostFeaturedImage::register();
// Carousels::register();


/**
* Settings page.
*/

// Disable settings page for now.
// $settings_page_path = plugin_dir_path( __FILE__ ) . 'settings-page.php';
// require_once $settings_page_path;
