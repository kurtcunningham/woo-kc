<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class CurrentDate {
  public static string $ROOT_BLOCK = 'core/paragraph';

  public static function register() {
    register_block_bindings_source(
      source_name: 'amplify-blocks/data-current-date',
      source_properties: [
        'label' => 'Current Date',
        'get_value_callback' => [self::class, 'getCurrentDate'],
      ]
    );
  }

  public static function getCurrentDate(
    array $source_args, 
    \WP_Block $block_instance, 
    string $attribute_name
  ): string {
    // Ensure "now" is in the timezone configured for the site/app.
    $start_date = new \DateTime('now', new \DateTimeZone(wp_timezone_string()));
    
    $date_format = $block_instance->parsed_block["attrs"]["dateFormat"] ?? 'Y';

    $date_text = $start_date->format($date_format);

    $copyright_prefix = trim($block_instance->parsed_block["attrs"]["copyrightPrefix"] ?? '');
    
    if (empty($copyright_prefix)) {
      return $date_text;
    }

    if ($copyright_prefix === 'copy_symbol') {
      $copyright_prefix = '&copy;';
    } elseif ($copyright_prefix === 'copyright_text') {
      $copyright_prefix = 'Copyright';
    }

    return "{$copyright_prefix} {$date_text}";
  }
}

?>
