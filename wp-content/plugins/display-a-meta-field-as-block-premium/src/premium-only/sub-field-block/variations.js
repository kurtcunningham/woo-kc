/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import freeVariations from "../../variations";
import {
  GroupLabel,
  RepeaterLabel,
  FlexibleContentLabel,
  FlexibleLayoutLabel,
} from "../utils/constants";

const variations = freeVariations.concat([
  {
    name: "group-field",
    title: GroupLabel,
    description: __("Display a group field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "group",
  },
  {
    name: "repeater-field",
    title: RepeaterLabel,
    description: __(
      "Display a repeater field.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "repeater",
  },
  {
    name: "repeater-item-field",
    title: __("Repeater item", "display-a-meta-field-as-block"),
    description: __(
      "Display a repeater item field.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) =>
      attributes?.fieldSettings?.type === "repeater-item",
  },
  {
    name: "flexible-field",
    title: FlexibleContentLabel,
    description: __(
      "Display a flexible content field.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) =>
      attributes?.fieldSettings?.type === "flexible_content",
  },
  {
    name: "flexible-item-field",
    title: FlexibleLayoutLabel,
    description: __(
      "Display a flexible layout.",
      "display-a-meta-field-as-block",
    ),
    scope: [],
    isActive: (attributes) =>
      attributes?.fieldSettings?.type === "flexible_content-layout",
  },
  {
    name: "content-field",
    title: __("Content", "display-a-meta-field-as-block"),
    description: __("Display a simple field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => !attributes?.fieldSettings?.isStatic,
  },
]);

export default variations;
