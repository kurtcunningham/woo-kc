/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockVariation } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { MFB_QUERY_LOOP } from "./utils/blocks";

// Register a custom variation for MFB
registerBlockVariation("core/query", {
  name: MFB_QUERY_LOOP,
  title: __("The Query Loop for MFB", "display-a-meta-field-as-block"),
  description: __("Displays a list of posts", "display-a-meta-field-as-block"),
  isActive: ({ namespace }) => namespace === MFB_QUERY_LOOP,
  attributes: {
    namespace: MFB_QUERY_LOOP,
  },
  innerBlocks: [["core/post-template", {}, [["core/post-title"]]]],
  scope: [],
  allowedControls: [],
});
