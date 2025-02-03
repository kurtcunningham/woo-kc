<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks\Carousel;


class Carousels {
  public static function register() {
    GalleryCarousel::register();
    QueryLoopCarousel::register();
  }
}

?>
