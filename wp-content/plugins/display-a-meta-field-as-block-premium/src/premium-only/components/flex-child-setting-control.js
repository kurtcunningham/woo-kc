/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

/**
 * Internal dependencies
 */

/**
 * Select type and id for an object
 *
 * @param {Object}
 * @returns
 */
export const FlexChildSettingControl = ({
  value,
  onChange,
  orientation,
  className,
}) => {
  const label =
    orientation === "vertical"
      ? __("Minimum row height", "display-a-meta-field-as-block")
      : __("Minimum column width", "display-a-meta-field-as-block");

  return (
    <UnitControl
      label={label}
      onChange={onChange}
      value={value}
      min={0}
      className={clsx("flex-child-size", className)}
      help={__(
        "Inputting a minimum value will generate equal flex items automatically.",
        "display-a-meta-field-as-block",
      )}
    />
  );
};
