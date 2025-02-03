<?php
namespace mbm\theme\timber;


class TimberInitializer {
	public static function safeInit() {
		// Check that Timber is installed and activated.
		if ( ! class_exists( '\\Timber\\Timber' ) ) {
			add_action( 'admin_notices', function() {
				echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
			});
			
			add_filter('template_include', function( $template ) {
				return get_stylesheet_directory() . '/static/no-timber.html';
			});
			
			throw new \Exception('Timber not available');
		}
		
		// Set directory locations
		\Timber\Timber::$dirname = [
			'images',
			'templates',
			'templates/partial',
			'templates/components',
			'views',
		];
		
		\Timber\Timber::$autoescape = false;
	}
}

?>
