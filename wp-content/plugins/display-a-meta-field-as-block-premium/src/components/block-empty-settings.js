/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextControl, ToggleControl } from "@wordpress/components";

/**
 * Display the general settings
 *
 * @param {Object}
 * @returns
 */
export const BlockEmptySettings = ({
  setAttributes,
  hideEmpty,
  emptyMessage,
}) => {
  return (
    <>
      <ToggleControl
        label={__(
          "Hide block if the value is empty",
          "display-a-meta-field-as-block",
        )}
        checked={hideEmpty}
        onChange={(hideEmpty) => setAttributes({ hideEmpty })}
      />
      {!hideEmpty && (
        <TextControl
          label={__("Empty message", "display-a-meta-field-as-block")}
          value={emptyMessage}
          onChange={(emptyMessage) => setAttributes({ emptyMessage })}
          help={__(
            "Display this text if the value is empty.",
            "display-a-meta-field-as-block",
          )}
        />
      )}
    </>
  );
};
