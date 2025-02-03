<?php
namespace Madebymunsters\Gutenberg\Support\Registration;


class BlockMetadataPathBuilder {
  public static function buildBlockPaths($base_dir, $relative_block_paths = [], $append_block_json = TRUE) {
    // if ($append_block_json === TRUE) {
    //   $relative_block_paths = array_map(
    //     function($relative_path) {
    //       return $relative_path . DIRECTORY_SEPARATOR . "block.json";
    //     },
    //     $relative_block_paths
    //   );
    // }

    $full_block_paths = array_map(
      function($relative_path) use ($base_dir) {
        return $base_dir . DIRECTORY_SEPARATOR . $relative_path;
      },
      $relative_block_paths
    );

    return $full_block_paths;
  }
}

?>