<?php
namespace MBM\Amplify\Team\Blocks\Common;


class BlockMetadataAugmenter {
  public static function registerAugmenter(
    string $target_block_slug, 
    array $augmentations
  ): void {
    add_filter(
      'block_type_metadata', 
      function(array $metadata) use ($target_block_slug, $augmentations): array {
        if (($metadata['name'] ?? []) !== $target_block_slug) {
          return $metadata;
        }

        $new_metadata = array_merge_recursive(
          $metadata,
          $augmentations,
        );

        return $new_metadata;
      },
      10,
      1
    );
  }
}

?>
