/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { isStaticBlock } from "./utils/blocks";

export default function save({ attributes }) {
  if (isStaticBlock(attributes)) {
    return <InnerBlocks.Content />;
  } else {
    return null;
  }
}
