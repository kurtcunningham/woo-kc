/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */

/**
 * Force block support for color features on the MFB block
 */
addFilter(
  "blockEditor.useSetting.before",
  "MFB/blockEditor.useSetting.before",
  (settingValue, settingName, clientId, blockName) => {
    if (blockName !== "mfb/meta-field-block") {
      return settingValue;
    }

    // Force color attributes
    if (
      ["color.text", "color.background", "color.link"].includes(settingName)
    ) {
      return true;
    }

    return settingValue;
  }
);
