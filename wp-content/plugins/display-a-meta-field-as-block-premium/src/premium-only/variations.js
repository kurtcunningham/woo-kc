/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import freeVariations from "../variations";

const variations = [
  {
    name: "gallery-field",
    title: __("Gallery", "display-a-meta-field-as-block"),
    description: __(
      "Display a gallery field.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "gallery",
  },
  {
    name: "layout-field",
    title: __("Layout", "display-a-meta-field-as-block"),
    description: __(
      "Display a complex layout field such as group, repeater, flexible layout.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) =>
      ["group", "repeater", "flexible_content"].includes(
        attributes?.fieldSettings?.type,
      ),
  },
].concat(freeVariations);

export default variations;
