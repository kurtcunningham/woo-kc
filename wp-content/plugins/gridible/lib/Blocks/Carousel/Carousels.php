<?php
namespace Gridible\Plugin\Blocks\Carousel;

class Carousels {
  public static function register() {
    // GalleryCarousel::register();
    QueryLoopCarousel::register();
  }
}
