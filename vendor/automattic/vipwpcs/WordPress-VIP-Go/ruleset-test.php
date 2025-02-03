<?php
/**
 * Ruleset test for the WordPress-VIP-Go ruleset
 *
 * The expected errors, warnings, and messages listed here, should match what is expected to be reported
 * when ruleset-test.inc is run against PHP_CodeSniffer and the WordPress-VIP-Go standard.
 *
 * To run the test, see ../bin/ruleset-tests.
 *
 * @package VIPCS\WordPressVIPMinimum
 */

namespace WordPressVIPMinimum;

// Expected values.
$expected = [
	'errors'   => [
		50  => 1,
		53  => 1,
		56  => 1,
		72  => 1,
		83  => 1,
		165 => 1,
		180 => 1,
		181 => 1,
		187 => 1,
		188 => 1,
		252 => 1,
		255 => 1,
		256 => 1,
		258 => 1,
		259 => 1,
		318 => 1,
		329 => 1,
		334 => 1,
		337 => 1,
		341 => 1,
		342 => 1,
		346 => 1,
		350 => 1,
		351 => 1,
		352 => 1,
		353 => 1,
		354 => 1,
		355 => 1,
		357 => 1,
		358 => 1,
		359 => 1,
		360 => 1,
		362 => 1,
		363 => 1,
		364 => 1,
		365 => 1,
		366 => 1,
		367 => 1,
		368 => 1,
		369 => 1,
		370 => 1,
		371 => 1,
		372 => 1,
		373 => 1,
		374 => 1,
		375 => 1,
		376 => 1,
		377 => 1,
		378 => 1,
		379 => 1,
		380 => 1,
		381 => 1,
		382 => 1,
		383 => 1,
		384 => 1,
		385 => 1,
		386 => 1,
		387 => 1,
		388 => 1,
		389 => 1,
		390 => 1,
		409 => 1,
		410 => 1,
		411 => 1,
		412 => 1,
		413 => 1,
		414 => 1,
		415 => 1,
		431 => 1,
		441 => 1,
		462 => 1,
		466 => 1,
		468 => 1,
		472 => 1,
		474 => 1,
		480 => 1,
		486 => 1,
		494 => 1,
		507 => 1,
		511 => 1,
		512 => 1,
		513 => 1,
		514 => 1,
		515 => 1,
		516 => 1,
		517 => 1,
		518 => 1,
		519 => 1,
		520 => 1,
		521 => 1,
		525 => 1,
		527 => 1,
		545 => 1,
		560 => 1,
		564 => 1,
		565 => 1,
		566 => 1,
		567 => 1,
		572 => 1,
		574 => 1,
	],
	'warnings' => [
		7   => 1,
		10  => 1,
		14  => 1,
		17  => 1,
		20  => 1,
		23  => 1,
		26  => 1,
		29  => 1,
		32  => 1,
		35  => 1,
		38  => 1,
		41  => 1,
		44  => 1,
		47  => 1,
		63  => 1,
		66  => 1,
		83  => 1,
		85  => 1,
		90  => 1,
		94  => 1,
		95  => 1,
		99  => 1,
		102 => 1,
		103 => 1,
		104 => 1,
		106 => 1,
		108 => 1,
		109 => 1,
		112 => 1,
		118 => 1,
		119 => 1,
		123 => 1,
		127 => 1,
		128 => 1,
		129 => 1,
		130 => 1,
		131 => 1,
		139 => 1,
		142 => 1,
		146 => 1,
		150 => 1,
		154 => 1,
		157 => 1,
		161 => 1,
		169 => 1,
		174 => 1,
		175 => 1,
		176 => 1,
		177 => 1,
		191 => 1,
		192 => 1,
		195 => 1,
		196 => 1,
		199 => 1,
		200 => 1,
		201 => 1,
		204 => 1,
		205 => 1,
		206 => 1,
		207 => 1,
		208 => 1,
		212 => 1,
		221 => 1,
		223 => 1,
		225 => 1,
		228 => 1,
		229 => 1,
		230 => 1,
		235 => 1,
		236 => 1,
		237 => 1,
		245 => 1,
		246 => 1,
		247 => 1,
		265 => 1,
		269 => 1,
		273 => 1,
		322 => 1,
		332 => 1,
		392 => 1,
		394 => 1,
		395 => 1,
		398 => 1,
		399 => 1,
		400 => 1,
		401 => 1,
		402 => 1,
		403 => 1,
		404 => 1,
		405 => 1,
		406 => 1,
		407 => 1,
		408 => 1,
		416 => 1,
		417 => 1,
		418 => 1,
		419 => 1,
		421 => 1,
		423 => 1,
		424 => 1,
		425 => 1,
		428 => 1,
		448 => 1,
		453 => 1,
		454 => 1,
		455 => 1,
		456 => 1,
		502 => 1,
		503 => 1,
		530 => 1,
		533 => 1,
		540 => 1,
		550 => 1,
		556 => 1,
		579 => 1,
	],
	'messages' => [
		7   => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as file_put_contents(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		10  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as flock(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		14  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as fputcsv(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		17  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as fputs(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		20  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as fwrite(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		23  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as ftruncate(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		26  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as is_writable(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		29  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as is_writeable(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		32  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as link(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		35  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as rename(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		38  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as symlink(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		41  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as tempnam(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		44  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as touch(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		47  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as unlink(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		50  => [
			'Due to server-side caching, server-side based client related logic might not work. We recommend implementing client side logic in JavaScript instead.',
		],
		53  => [
			'Due to server-side caching, server-side based client related logic might not work. We recommend implementing client side logic in JavaScript instead.',
		],
		56  => [
			'Due to server-side caching, server-side based client related logic might not work. We recommend implementing client side logic in JavaScript instead.',
		],
		63  => [
			'File system operations only work on the `/tmp/` and `wp-content/uploads/` directories. To avoid unexpected results, please use helper functions like `get_temp_dir()`  or `wp_get_upload_dir()` to get the proper directory path when using functions such as fopen(). For more details, please see: https://docs.wpvip.com/technical-references/vip-go-files-system/local-file-operations/',
		],
		66  => [
			'file_get_contents() is uncached. If the function is being used to fetch a remote file (e.g. a URL starting with https://), please use wpcom_vip_file_get_contents() to ensure the results are cached. For more details, please see: https://docs.wpvip.com/technical-references/code-quality-and-best-practices/retrieving-remote-data/',
		],
		90 => [
			'Having more than 100 posts returned per page may lead to severe performance problems.',
		],
		94 => [
			'Having more than 100 posts returned per page may lead to severe performance problems.',
		],
		95 => [
			'Having more than 100 posts returned per page may lead to severe performance problems.',
		],
		123 => [
			'attachment_url_to_postid() is uncached, please use wpcom_vip_attachment_url_to_postid() instead.',
		],
		139 => [
			'get_children() is uncached and performs a no limit query. Please use get_posts or WP_Query instead. Please see: https://docs.wpvip.com/technical-references/caching/uncached-functions/',
		],
		150 => [
			'url_to_postid() is uncached, please use wpcom_vip_url_to_postid() instead.',
		],
		191 => [
			'Scripts should be registered/enqueued via `wp_enqueue_script`. This can improve the site\'s performance due to script concatenation.',
		],
		192 => [
			'Scripts should be registered/enqueued via `wp_enqueue_script`. This can improve the site\'s performance due to script concatenation.',
		],
		195 => [
			'Stylesheets should be registered/enqueued via `wp_enqueue_style`. This can improve the site\'s performance due to styles concatenation.',
		],
		196 => [
			'Stylesheets should be registered/enqueued via `wp_enqueue_style`. This can improve the site\'s performance due to styles concatenation.',
		],
	],
];

require __DIR__ . '/../tests/RulesetTest.php';

// Run the tests!
$test = new RulesetTest( 'WordPress-VIP-Go', $expected );
if ( $test->passes() ) {
	printf( 'All WordPress-VIP-Go tests passed!' . PHP_EOL );
	exit( 0 );
}

exit( 1 );
