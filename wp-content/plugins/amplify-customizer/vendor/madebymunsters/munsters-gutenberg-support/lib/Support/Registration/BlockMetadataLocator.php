<?php
namespace Madebymunsters\Gutenberg\Support\Registration;


class BlockMetadataLocator {
  public function __construct($filename_checker = NULL) {
    $this->filename_checker = $filename_checker;

    if (empty($this->filename_checker)) {
      $this->filename_checker = function($normalized_filename) {
        return $normalized_filename === 'block.json';
      };
    }
  }

  public function findBlockPaths($base_dir) {
    $base_dir = realpath($base_dir . DIRECTORY_SEPARATOR);
    $scan_results = scandir($base_dir);
    $scan_results = array_diff($scan_results, ['.', '..']);

    // Inspiration from this example:
    // https://www.php.net/manual/en/function.scandir.php#126663
    $scan_results = array_map(
      function($fs_entry) use ($base_dir) {
        return $base_dir . DIRECTORY_SEPARATOR . $fs_entry;
      },
      $scan_results
    );

    $found_block_paths = [];
    $filename_checker = $this->filename_checker;
    foreach ($scan_results as $fs_entry) {
      if (is_dir($fs_entry)) {
        $found_block_paths = array_merge(
          $found_block_paths, 
          $this->findBlockPaths($fs_entry)
        );
      } elseif (is_file($fs_entry)) {
        $filename = strtolower(basename($fs_entry));

        if ($filename_checker($filename)) {
          $found_block_paths[] = $fs_entry;
        }
      }
    }

    return $found_block_paths;
  }
}

?>