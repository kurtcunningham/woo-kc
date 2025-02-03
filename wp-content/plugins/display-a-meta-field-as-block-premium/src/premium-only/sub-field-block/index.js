/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "../save";
import { ReactComponent as icon } from "../assets/sfb-icon.svg";
import metadata from "./block.json";
import variations from "./variations";

/**
 * Editor style
 */
import "../assets/editor.scss";

/**
 * Frontend style
 */
import "./style.scss";

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
