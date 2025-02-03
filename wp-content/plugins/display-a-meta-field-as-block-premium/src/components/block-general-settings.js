/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SelectControl, TextControl } from "@wordpress/components";

/**
 * Display the general settings
 *
 * @param {Object}
 * @returns
 */
export const BlockGeneralSettings = ({
  fieldType,
  fieldTypeOptions,
  fieldTypeHelpMessages,
  setAttributes,
  fieldName,
  setFieldName,
  fieldNameHelp,
}) => {
  return (
    <>
      <SelectControl
        label={__("Field type", "display-a-meta-field-as-block")}
        value={fieldType}
        onChange={(value) => setAttributes({ fieldType: value })}
        options={fieldTypeOptions}
        help={
          fieldTypeHelpMessages[fieldType] ??
          __("Choose a field type", "display-a-meta-field-as-block")
        }
      />
      <TextControl
        autoComplete="off"
        label={__("Field name", "display-a-meta-field-as-block")}
        value={fieldName}
        onChange={setFieldName}
        help={fieldNameHelp}
      />
    </>
  );
};
