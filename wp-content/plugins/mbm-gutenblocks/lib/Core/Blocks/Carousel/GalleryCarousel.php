<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks\Carousel;


class GalleryCarousel {
  public static function register() {
    add_filter(
      'block_type_metadata', 
      [self::class, 'filterGalleryBlocks'], 
      10,
      1
    );

    add_filter(
      'block_type_metadata', 
      [self::class, 'filterImageBlocks'], 
      10,
      1
    );
  }

  public static function filterGalleryBlocks(array $metadata): array {
    if (($metadata['name'] ?? []) !== 'core/gallery') {
      return $metadata;
    }

    $provides_context = $metadata['providesContext'] ?? [];
    $provides_context['mbmVariation'] = 'mbmVariation';
    $metadata['providesContext'] = $provides_context;

    return $metadata;
  }

  public static function filterImageBlocks(array $metadata): array {
    if (($metadata['name'] ?? []) !== 'core/image') {
      return $metadata;
    }

    $uses_context = $metadata['usesContext'] ?? [];
    $uses_context[] = 'mbmVariation';
    $metadata['usesContext'] = $uses_context;

    return $metadata;
  }
}

?>
