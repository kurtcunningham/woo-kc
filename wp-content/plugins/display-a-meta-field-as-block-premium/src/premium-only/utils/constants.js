/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { group, stack, row, grid } from "@wordpress/icons";
import { ExternalLink } from "@wordpress/components";

/**
 * Internal dependencies
 */

/**
 * Supported meta types
 */
export const metaTypes = [
  {
    value: "",
    label: __("Auto", "display-a-meta-field-as-block"),
  },
  {
    value: "post",
    label: __("Post meta field", "display-a-meta-field-as-block"),
  },
  {
    value: "term",
    label: __("Term meta field", "display-a-meta-field-as-block"),
  },
  {
    value: "user",
    label: __("User meta field", "display-a-meta-field-as-block"),
  },
  {
    value: "option",
    label: __("Setting field", "display-a-meta-field-as-block"),
  },
];

/**
 * Define field type options for setting meta type
 */
export const settingFieldTypeOptions = [
  {
    label: __("Default 'setting'", "display-a-meta-field-as-block"),
    value: "option",
  },
  {
    label: __("ACF - Advanced Custom Fields", "display-a-meta-field-as-block"),
    value: "acf",
  },
];

/**
 * Define setting field type help text
 */
export const settingFieldTypeHelp = {
  option: (
    <>
      {__("Fields are registered with ", "display-a-meta-field-as-block")}
      <ExternalLink href="https://developer.wordpress.org/reference/functions/register_setting/">
        register_setting
      </ExternalLink>
      {__(
        " and 'show_in_rest' setting is enable.",
        "display-a-meta-field-as-block",
      )}
    </>
  ),
};

/**
 * Define layout
 */
export const LayoutOptions = {
  group: {
    icon: group,
    value: "group",
    label: __("Group", "display-a-meta-field-as-block"),
  },
  stack: {
    icon: stack,
    value: "stack",
    label: __("Stack", "display-a-meta-field-as-block"),
  },
  row: {
    icon: row,
    value: "row",
    label: __("Row", "display-a-meta-field-as-block"),
  },
  grid: {
    icon: grid,
    value: "grid",
    label: __("Grid", "display-a-meta-field-as-block"),
  },
};

/**
 * Text value for true_false fields
 */
export const TrueFalseOptions = {
  onText: __("Yes", "display-a-meta-field-as-block"),
  offText: __("No", "display-a-meta-field-as-block"),
};

/**
 * Default file label
 */
export const FileLabel = __("Download file", "display-a-meta-field-as-block");

/**
 * List of ignored fields exposed by REST API
 */
export const ExcludeSettingFields = [
  "title",
  "url",
  "description",
  "date_format",
  "default_category",
  "default_comment_status",
  "default_ping_status",
  "default_post_format",
  "email",
  "language",
  "page_for_posts",
  "page_on_front",
  "posts_per_page",
  "show_on_front",
  "site_icon",
  "site_logo",
  "start_of_week",
  "time_format",
  "timezone",
  "use_smilies",
  // Boldblocks
  "boldblocks_pattern_categories",
  "boldblocks_pattern_categories_all_label",
  "be_allowed_blocks",
  "be_breakpoints",
  "CBBBreakpoints",
  "EnableTypography",
  "UseBunnyFonts",
  "BoldBlocksTypography",
  "IsMaintenance",
  "MaintenanceSlug",
  "MaintananceEnableCustomPage",
  "MaintanancePageId",
];

/**
 * Block binding allowed blocks
 */
export const BLOCK_BINDINGS_ALLOWED_BLOCKS = {
  "core/paragraph": ["content"],
  "core/heading": ["content"],
  "core/image": ["id", "url", "title", "alt"],
  "core/button": ["url", "text", "linkTarget", "rel"],
  "core/video": ["src", "poster", "caption"],
};

/**
 * Based on the given block name,
 * check if it is possible to bind the block.
 *
 * @param {string} blockName - The block name.
 * @return {boolean} Whether it is possible to bind the block to sources.
 */
export function canBindBlock(blockName) {
  return blockName in BLOCK_BINDINGS_ALLOWED_BLOCKS;
}

/**
 * Labels
 */
export const GroupLabel = __("Group", "display-a-meta-field-as-block");
export const RepeaterLabel = __("Repeater", "display-a-meta-field-as-block");
export const FlexibleContentLabel = __(
  "Flexible content",
  "display-a-meta-field-as-block",
);
export const FlexibleLayoutLabel = __(
  "Flexible layout",
  "display-a-meta-field-as-block",
);
