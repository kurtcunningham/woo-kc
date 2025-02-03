<?php
namespace Madebymunsters\Gutenblocks\Core\Blocks;


class CarouselQuery  {
  public function renderCallback($attributes, $content, $block) {
    $block_output = $this->renderQueryLoop($block);

    return $block_output;
  }

  private function renderQueryLoop($block) {
    // Credit where credit is due: this is heavily copied from the 
    // Gutenberg Post-Template block.
    
    $query_args = [
      'post_type' => 'post',
    ];
    $query = new \WP_Query( $query_args );

    if ( ! $query->have_posts() ) {
      return '';
    }

    $content = '';
    while ( $query->have_posts() ) {
      $query->the_post();
      $block_content = (
        new \WP_Block(
          $block->parsed_block,
          array(
            'postType' => get_post_type(),
            'postId'   => get_the_ID(),
          )
        )
      )->render( array( 'dynamic' => false ) );
      $content .= $block_content;
    }

    wp_reset_postdata();

    return $content;
  }

  private function renderSimpleLoop($content) {
    $loop_max_count = 3;

    // Turn on output buffering.
    ob_start(); 

    for ($i = 1; $i <= $loop_max_count; $i++) {
      echo do_blocks($content);
    }

    // Capture buffered output.
    $block_output = ob_get_contents();
    ob_end_clean();

    return $block_output;
  }
}

?>
