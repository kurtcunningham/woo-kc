/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  SelectControl,
  TextControl,
  ToggleControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { prefixLabel, suffixLabel } from "../utils";

/**
 * Display the general settings
 *
 * @param {Object}
 * @returns
 */
export const BlockOtherSettings = ({
  setAttributes,
  labelAsPrefix,
  prefix,
  suffix,
  fieldType,
  displayLayout,
}) => {
  return (
    <>
      {fieldType === "acf" && (
        <ToggleControl
          label={__(
            "Use field label as prefix",
            "display-a-meta-field-as-block",
          )}
          checked={labelAsPrefix}
          onChange={(labelAsPrefix) => setAttributes({ labelAsPrefix })}
        />
      )}
      <TextControl
        label={prefixLabel}
        value={prefix}
        onChange={(prefix) => setAttributes({ prefix })}
        help={__(
          "Display before the field value.",
          "display-a-meta-field-as-block",
        )}
      />
      <TextControl
        label={suffixLabel}
        value={suffix}
        onChange={(suffix) => setAttributes({ suffix })}
        help={__(
          "Display after the field value.",
          "display-a-meta-field-as-block",
        )}
      />
      <SelectControl
        label={__("Display layout", "display-a-meta-field-as-block")}
        options={[
          { value: "inline-block", label: __("Inline block") },
          { value: "block", label: __("Block") },
          { value: "", label: __("Auto") },
        ]}
        value={displayLayout}
        onChange={(value) => setAttributes({ displayLayout: value })}
        help={__(
          "Choose basic layout for prefix, value and suffix. This block does not provide any CSS style for the meta field.",
          "display-a-meta-field-as-block",
        )}
      />
    </>
  );
};
