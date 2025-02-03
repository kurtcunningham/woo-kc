<?php
/**
 * The Pro files
 *
 * @package   MetaFieldBlock
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2023, Phi Phan
 */

namespace MetaFieldBlock;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register pro components
 *
 * @param array $components
 * @return array
 */
function load_pro_components( $components ) {
	// Pro files.
	require_once __DIR__ . '/pro.php';
	$components[] = Pro::class;

	// Load ACF PRo required files.
	require_once __DIR__ . '/acf-fields-pro.php';

	$components[] = ACFFieldsPro::class;

	return $components;
}
add_filter( 'meta_field_block_get_components', __NAMESPACE__ . '\\load_pro_components' );




