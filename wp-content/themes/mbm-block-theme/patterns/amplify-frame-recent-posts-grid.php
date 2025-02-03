<?php
/**
 * Title: Recent Post Query (Grid)
 * Slug: mbmtheme/amplify-frame-recent-posts-grid
 * Categories: amplify-frames
 */
?>

<!-- wp:group {"metadata":{"name":"Recent Post Query (Grid)"},"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:query {"queryId":0,"query":{"perPage":"4","pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"exclude","inherit":false},"align":"wide"} -->
	<div class="wp-block-query alignwide">
		<!-- wp:post-template {"layout":{"type":"grid","columnCount":"4"}} -->
		<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"4/3"} /-->

		<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
		<div class="wp-block-group">
			<!-- wp:post-terms {"term":"category","style":{"elements":{"link":{"color":{"text":"var:preset|color|shade-4"},":hover":{"color":{"text":"var:preset|color|primary-1"}}}}},"textColor":"shade-4","fontSize":"golf"} /-->

			<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|shade-4"}}}},"textColor":"shade-4","fontSize":"golf"} -->
			<p class="has-shade-4-color has-text-color has-link-color has-golf-font-size">|</p>
			<!-- /wp:paragraph -->

			<!-- wp:post-date {"format":"M j, Y","style":{"elements":{"link":{"color":{"text":"var:preset|color|shade-4"}}}},"textColor":"shade-4","fontSize":"golf"} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:gridible/responsive-spacer {"height":"var:preset|spacing|40"} -->
		<div class="wp-block-gridible-responsive-spacer" style="height:var(--wp--preset--spacing--40)" aria-hidden="true"></div>
		<!-- /wp:gridible/responsive-spacer -->

		<!-- wp:post-title {"level":3,"isLink":true,"style":{"elements":{"link":{"color":{"text":"var:preset|color|primary-2"},":hover":{"color":{"text":"var:preset|color|primary-1"}}}},"typography":{"fontStyle":"normal","fontWeight":"700"}},"textColor":"primary-2","fontSize":"echo"} /-->
		<!-- /wp:post-template -->
	</div>
	<!-- /wp:query -->
</div>
<!-- /wp:group -->


