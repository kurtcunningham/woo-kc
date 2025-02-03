/**
 * External dependencies
 */
import { isNil, omit } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { ExternalLink } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { toType } from "./dom";

/**
 * Invalid data type message
 */
export const invalidDataTypeMessage = __(
  "<code>This data type is not supported!</code>",
  "display-a-meta-field-as-block",
);

export const hideEmptyMessage = __(
  "<code>No value</code>",
  "display-a-meta-field-as-block",
);

export const noValueMessage = __(
  "<code>No value</code>",
  "display-a-meta-field-as-block",
);

/**
 * Define field type options
 */
export const fieldTypeOptions = [
  {
    label: __("Default 'meta'", "display-a-meta-field-as-block"),
    value: "meta",
  },
  {
    label: __("ACF - Advanced Custom Fields", "display-a-meta-field-as-block"),
    value: "acf",
  },
  {
    label: __("Dynamic field", "display-a-meta-field-as-block"),
    value: "dynamic",
  },
  {
    label: __("Custom rest field", "display-a-meta-field-as-block"),
    value: "rest_field",
  },
];

/**
 * Define field type messages
 */
export const fieldTypeHelpMessages = {
  meta: (
    <>
      {__("Fields are registered with ", "display-a-meta-field-as-block")}
      <ExternalLink href="https://developer.wordpress.org/reference/functions/register_meta/">
        register_meta
      </ExternalLink>
      {__(
        " and 'show_in_rest' setting is enable.",
        "display-a-meta-field-as-block",
      )}
    </>
  ),
  acf: (
    <>
      {__("Fields are registered with ", "display-a-meta-field-as-block")}
      <ExternalLink href="https://wordpress.org/plugins/advanced-custom-fields/">
        Advanced Custom Fields
      </ExternalLink>
      {__(
        " and 'Show in REST API' setting is ON.",
        "display-a-meta-field-as-block",
      )}
    </>
  ),
  rest_field: (
    <>
      {__("Fields are registered with ", "display-a-meta-field-as-block")}
      <ExternalLink href="https://developer.wordpress.org/reference/functions/register_rest_field/">
        register_rest_field.
      </ExternalLink>
      {__(
        "The 'rest field' and the 'custom field' should be the same name. Or adding a filter for the hook `apply_filters( 'meta_field_block_get_block_content', $content, $attributes, $block, $object_id, $object_type )` to get value for front end.",
        "display-a-meta-field-as-block",
      )}
    </>
  ),
  dynamic: (
    <>
      {__(
        "You can use any field whose value is a string or can be converted to a string. The changes made by the hook `meta_field_block_get_block_content` can be seen on both the front end and the editor. You can also run a shortcode by inputting it in the field name.",
        "display-a-meta-field-as-block",
      )}
    </>
  ),
};

/**
 * Ignore core fields
 */
const coreMetaFields = ["footnotes", "_acf_changed"];

/**
 * Build the help message for field name
 *
 * @param {Object}
 * @returns {String}
 */
export const getFieldNameHelp = ({
  fieldType,
  metaFields,
  ACFFields,
  restFieldNames,
  settingFieldNames,
  additionalHelp = "",
}) => {
  let fieldNameHelp = __(
    "Input the field name. ",
    "display-a-meta-field-as-block",
  );

  let suggestedNames;
  if (fieldType === "meta") {
    if (toType(metaFields) === "object") {
      suggestedNames = Object.keys(metaFields).filter(
        (key) =>
          !(
            coreMetaFields.includes(key) ||
            ["object", "array"].includes(toType(metaFields[key]))
          ),
      );
    }
  } else if (fieldType === "acf") {
    if (toType(ACFFields) === "object") {
      suggestedNames = Object.keys(ACFFields);
    }
  } else if (fieldType === "rest_field") {
    suggestedNames = restFieldNames;
  } else if (fieldType === "option") {
    suggestedNames = settingFieldNames;
  }

  let suggestedValue = null;
  if (suggestedNames && suggestedNames.length) {
    suggestedValue = suggestedNames.map((item, index) => (
      <Fragment key={item}>
        <code key={item}>{item}</code>
        {index < suggestedNames?.length - 1 ? ", " : ""}
      </Fragment>
    ));
  }

  if (suggestedValue) {
    fieldNameHelp = (
      <>
        {fieldNameHelp}
        {__("Suggested values: ", "display-a-meta-field-as-block")}
        <span style={{ lineHeight: 2 }}>{suggestedValue}</span>
      </>
    );
  } else {
    if (additionalHelp) {
      fieldNameHelp = (
        <>
          {fieldNameHelp}
          {additionalHelp}
        </>
      );
    }
    if (fieldType === "acf") {
      fieldNameHelp = (
        <>
          {fieldNameHelp}
          {__(
            "Using the field key as the field name can help the block access the field information without an object id.",
            "display-a-meta-field-as-block",
          )}
        </>
      );
    }
  }

  return fieldNameHelp;
};

/**
 * Get raw value of the field
 *
 * @param {Object}
 * @returns
 */
export const getRawValue = ({
  fieldName,
  fieldType,
  metaFields,
  ACFFields,
  ACFFieldObject,
  restFieldValue,
  settingFieldValue,
  dynamicValue,
}) => {
  let fieldValue;

  if (fieldName) {
    if ("meta" === fieldType) {
      if (toType(metaFields) === "object") {
        fieldValue = metaFields[fieldName] ?? "";
      }
    } else if ("acf" === fieldType) {
      if (toType(ACFFields) === "object" && (ACFFields[fieldName] ?? false)) {
        fieldValue = ACFFields[fieldName];
      } else if (
        toType(ACFFieldObject) === "object" &&
        ACFFieldObject?.field?.key === fieldName
      ) {
        fieldValue = ACFFieldObject;
      }
    } else if ("option" === fieldType) {
      fieldValue = settingFieldValue;
    } else if ("dynamic" === fieldType) {
      fieldValue = dynamicValue;
    } else {
      fieldValue = restFieldValue;
    }
  }

  return fieldValue;
};

/**
 * Get field value for a meta field
 *
 * @param {Object}
 * @returns {String}
 */
export const getFieldValue = ({
  fieldType,
  fieldName,
  hideEmpty,
  emptyMessage,
  rawValue,
}) => {
  let fieldValue;
  if (!fieldName) {
    fieldValue = __(
      'This is the Meta Field Block. Please input "Field Name"',
      "display-a-meta-field-as-block",
    );
  } else if (!isNil(rawValue)) {
    fieldValue = rawValue;

    if ("acf" === fieldType && toType(rawValue) === "object") {
      fieldValue = rawValue?.simple_value_formatted;
    }

    // Handle empty value
    fieldValue = handleEmptyValue({ fieldValue, hideEmpty, emptyMessage });
  } else {
    fieldValue = sprintf(
      __("MFB - <code>%s</code>", "display-a-meta-field-as-block"),
      fieldName,
    );
  }

  return fieldValue;
};

/**
 * Get ACF field label
 *
 * @param {Object}
 * @returns {String}
 */
export const getFieldLabel = (rawValue) => {
  let label = "";
  if (toType(rawValue) === "object") {
    label = rawValue?.field?.label ?? "";
  }

  return label;
};

/**
 * Get value when the value is empty
 *
 * @param {Object}
 * @returns {String}
 */
export const handleEmptyValue = ({ fieldValue, hideEmpty, emptyMessage }) => {
  if (fieldValue && ["object", "array"].includes(toType(fieldValue))) {
    fieldValue = invalidDataTypeMessage;
  }

  if (!fieldValue && fieldValue !== 0) {
    if (hideEmpty) {
      fieldValue = hideEmptyMessage;
    } else {
      if (emptyMessage) {
        fieldValue = emptyMessage;
      } else {
        fieldValue = noValueMessage;
      }
    }
  }

  return fieldValue;
};

/**
 * Prefix and suffix
 */
export const prefixSuffixLabel = __(
  "Prefix and suffix",
  "display-a-meta-field-as-block",
);

export const prefixLabel = __("Prefix", "display-a-meta-field-as-block");

export const suffixLabel = __("Suffix", "display-a-meta-field-as-block");
