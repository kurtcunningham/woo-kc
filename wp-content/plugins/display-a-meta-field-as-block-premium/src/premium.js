/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";
import "./premium-only/style.scss";

/**
 * Internal dependencies
 */

// General hooks.
import "./hooks";

// Premium hooks.
import "./premium-only/hooks";

import edit from "./premium-only/edit";
import save from "./premium-only/save";
import { ReactComponent as icon } from "./premium-only/assets/block-icon.svg";
import metadata from "./block.json";
import variations from "./premium-only/variations";

// Additional features
import "./premium-only/query-loop";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata, {
  icon,
  edit,
  save,
  variations,
});
