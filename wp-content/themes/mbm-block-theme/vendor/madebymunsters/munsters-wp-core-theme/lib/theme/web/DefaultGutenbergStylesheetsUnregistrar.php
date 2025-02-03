<?php
namespace mbm\theme\web;

use \mbm\util\FilterHelper;


class DefaultGutenbergStylesheetsUnregistrar implements \mbm\theme\AutoRegister {
  public static ?FilterHelper $dequeue_style_handles_filter = NULL;

  public function register(): void {
		add_action('wp_enqueue_scripts', [$this, 'unregisterStyles'], 100);
  }

  public function unregisterStyles(): void {
		$default_style_handles = static::dequeueStyleHandlesFilter()->filter();

		foreach ($default_style_handles as $style_handle) {
			wp_dequeue_style($style_handle);
		}
  }

	public static function dequeueStyleHandlesFilter(): FilterHelper {
		return FilterHelper::getStaticFilterHelper(
			self::class,
			'dequeue_style_handles_filter',
			[
				'filter_name' => 'mbm/theme/web/DefaultGutenbergStylesheetsUnregistrar/dequeue_style_handles',
				'filter_default_value' => [
					'wp-block-library',
					'wp-block-library-theme',
					'wc-block-style',
					'global-styles',
				],
				'filter_args_count' => 1,
			],
		);
	}
}