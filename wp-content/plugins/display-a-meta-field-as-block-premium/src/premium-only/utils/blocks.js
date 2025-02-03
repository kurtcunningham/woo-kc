/**
 * External dependencies
 */
import { isNil, get } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { toType } from "../../utils";
import {
  TrueFalseOptions,
  FileLabel,
  GroupLabel,
  RepeaterLabel,
  FlexibleContentLabel,
  FlexibleLayoutLabel,
} from "./constants";

export const MFB_QUERY_LOOP = "mfb/query-loop";

export const isValidACFFieldValue = (field) =>
  toType(field) === "object" &&
  field?.name &&
  field?.type &&
  MFBACF.ALL_SUPPORTED_FIELDS.includes(field.type);

/**
 * Build inner blocks template for fields
 *
 * @param {Object} field
 * @param {Array} fieldPath
 * @returns
 */
export const buildTemplateForACFField = (field, fieldPath) => {
  const templateList = [];

  // Invalid value
  if (!isValidACFFieldValue(field)) {
    return templateList;
  }

  const { type } = field;

  fieldPath = [...fieldPath, field.name];

  if (MFBACF.BASIC_FIELDS.includes(type)) {
    templateList.push([
      "mfb/sub-field-block",
      {
        fieldPath,
        fieldSettings: {
          type,
          name: field.name,
          key: field.key,
          label: field?.label,
          isStatic: false,
          options: getFieldOptions(field),
        },
      },
    ]);
  } else if (MFBACF.CHOICE_FIELDS.includes(type)) {
    let attributes = {
      fieldPath,
      fieldSettings: {
        type,
        name: field.name,
        key: field.key,
        label: field?.label,
        isStatic: false,
        options: getFieldOptions(field),
      },
    };

    templateList.push(["mfb/sub-field-block", attributes]);
  } else if (MFBACF.QUERY_FIELDS.includes(type)) {
    const attributes = {
      fieldPath,
      fieldSettings: {
        type,
        name: field.name,
        key: field.key,
        label: field?.label,
        isStatic: false,
      },
    };

    templateList.push(["mfb/sub-field-block", attributes]);
  } else if (MFBACF.LAYOUT_FIELDS.includes(type)) {
    const innerBocks = [];
    if (type === "group") {
      const subFields = field?.sub_fields ?? [];
      const attributes = {
        fieldPath,
        fieldSettings: {
          type,
          name: field.name,
          key: field.key,
          label: field?.label,
          isStatic: true,
        },
        layout: { type: "default" },
        metadata: { name: `${GroupLabel} - ${field?.label}` },
      };

      const groupInnerBlocks = [];
      subFields.forEach((subField) => {
        groupInnerBlocks.push(...buildTemplateForACFField(subField, fieldPath));
      });

      innerBocks.push(["mfb/sub-field-block", attributes, groupInnerBlocks]);
    } else if (type === "repeater") {
      const subFields = field?.sub_fields ?? [];
      const attributes = {
        fieldPath,
        fieldSettings: {
          type,
          name: field.name,
          key: field.key,
          label: field?.label,
          isStatic: true,
        },
        layout: { type: "default" },
        metadata: { name: `${RepeaterLabel} - ${field?.label}` },
      };

      const repeaterInnerBlocks = [];
      if (toType(subFields) === "array") {
        subFields.forEach((subField) => {
          repeaterInnerBlocks.push(
            ...buildTemplateForACFField(subField, [field.name]),
          );
        });
      }
      const repeaterItemBlock = [
        [
          "mfb/sub-field-block",
          {
            fieldPath,
            fieldSettings: {
              type: "repeater-item",
              name: `${field.name}-item`,
              key: field.key,
              label: `${field?.label} - item`,
              isStatic: true,
            },
            layout: { type: "default" },
          },
          repeaterInnerBlocks,
        ],
      ];

      innerBocks.push(["mfb/sub-field-block", attributes, repeaterItemBlock]);
    } else if (type === "flexible_content") {
      const attributes = {
        fieldPath,
        fieldSettings: {
          type: "flexible_content",
          name: field.name,
          key: field.key,
          label: field?.label,
          isStatic: true,
        },
        metadata: { name: `${FlexibleContentLabel} - ${field?.label}` },
      };

      const { layouts = [] } = field;
      const layoutBlocks = [];
      Object.values(layouts)
        // .reverse()
        .forEach((layout) => {
          const {
            name: layoutName,
            key: layoutKey,
            label: layoutLabel,
            sub_fields: subFields = [],
          } = layout;
          const layoutInnerBlocks = [];
          subFields.forEach((subField) => {
            layoutInnerBlocks.push(
              ...buildTemplateForACFField(subField, [...fieldPath, layoutName]),
            );
          });

          layoutBlocks.push([
            "mfb/sub-field-block",
            {
              fieldPath: [...fieldPath, layoutName],
              fieldSettings: {
                type: "flexible_content-layout",
                name: layoutName,
                key: layoutKey,
                label: layoutLabel,
                isStatic: true,
              },
              layout: { type: "default" },
              metadata: { name: `${FlexibleLayoutLabel} - ${layoutLabel}` },
            },
            layoutInnerBlocks,
          ]);
        });

      innerBocks.push(["mfb/sub-field-block", attributes, layoutBlocks]);
    } else if (type === "flexible_content-layout") {
      const subFields = field?.sub_fields ?? [];
      const attributes = {
        fieldPath,
        fieldSettings: {
          type: "flexible_content-layout",
          name: field.name,
          key: field.key,
          label: field?.label,
          isStatic: true,
        },
        metadata: { name: `${FlexibleLayoutLabel} - ${field?.label}` },
      };

      const layoutInnerBlocks = [];
      subFields.forEach((subField) => {
        layoutInnerBlocks.push(
          ...buildTemplateForACFField(subField, [...fieldPath]),
        );
      });

      innerBocks.push(["mfb/sub-field-block", attributes, layoutInnerBlocks]);
    }

    if (innerBocks.length) {
      templateList.push(...innerBocks);
    }
  }

  return templateList;
};

/**
 * Get options for a field
 */
export const getFieldOptions = (field, options = {}) => {
  if (field?.type === "true_false") {
    let onText = field?.ui_on_text;
    let offText = field?.ui_off_text;
    if (!onText && !offText) {
      onText = TrueFalseOptions.onText;
      offText = TrueFalseOptions.offText;
    }
    options = {
      ...options,
      [field.type]: {
        onText,
        offText,
      },
    };
  } else if (field?.type === "file") {
    options = {
      ...options,
      [field.type]: {
        title: FileLabel,
        target: "_blank",
      },
    };
  }

  return options;
};

/**
 * Refine the field value
 */
export const refineFieldValue = (fieldValue) => {
  let arrayValue = {};

  // Invalid value
  if (!isValidACFFieldValue(fieldValue?.field)) {
    return arrayValue;
  }

  const {
    field,
    field: { type },
  } = fieldValue;

  if (MFBACF.BASIC_FIELDS.includes(type)) {
    arrayValue[field.name] = {
      value: fieldValue?.simple_value_formatted ?? "",
      field,
      restValue: fieldValue,
    };
  } else if (MFBACF.CHOICE_FIELDS.includes(type)) {
    arrayValue[field.name] = {
      value: fieldValue?.simple_value_formatted ?? "",
      field,
      restValue: fieldValue,
    };
  } else if (MFBACF.QUERY_FIELDS.includes(type)) {
    arrayValue[field.name] = {
      value: fieldValue?.simple_value_formatted ?? "",
      field,
      restValue: fieldValue,
    };
  } else if (MFBACF.LAYOUT_FIELDS.includes(type)) {
    let innerValue = {};
    const valueFormatted = fieldValue?.value_formatted ?? null;
    if (!isNil(valueFormatted)) {
      if (type === "flexible_content") {
        let flexValue = {};
        const layouts = Object.values(field.layouts).reduce(
          (accumulator, current) => {
            const { name } = current;
            accumulator[name] = { ...current, type: "flexible_content-layout" };
            return accumulator;
          },
          {},
        );

        valueFormatted.forEach(({ acf_fc_layout, ...otherFields }) => {
          if (!(flexValue[acf_fc_layout] ?? false)) {
            let flexItemValue = {};
            Object.values(otherFields).forEach((subField) => {
              flexItemValue = {
                ...flexItemValue,
                ...refineFieldValue(subField),
              };
            });
            flexValue = {
              ...flexValue,
              [acf_fc_layout]: {
                value: flexItemValue,
                field: layouts[acf_fc_layout] ?? {},
                restValue: fieldValue,
              },
            };
          }
        });
        innerValue = { ...innerValue, ...flexValue };
      } else if (type === "group") {
        let groupValue = {};
        Object.values(valueFormatted).forEach((subField) => {
          groupValue = { ...groupValue, ...refineFieldValue(subField) };
        });

        innerValue = { ...innerValue, ...groupValue };
      } else if (type === "repeater") {
        let repeaterValue = {};
        valueFormatted.forEach((subFields, index) => {
          let repeaterItemValue = {};
          Object.values(subFields).forEach((subField) => {
            repeaterItemValue = {
              ...repeaterItemValue,
              ...refineFieldValue(subField),
            };
          });

          repeaterValue = {
            ...repeaterValue,
            [index]: repeaterItemValue,
          };
        });

        innerValue = { ...innerValue, ...repeaterValue };
      }
    }

    arrayValue[field.name] = {
      value: { ...innerValue },
      field,
      restValue: fieldValue,
    };
  }

  return arrayValue;
};

/**
 * Get sub field value
 */
export const getSubFieldValue = (rootValue, fieldPath) => {
  const paths = fieldPath.reduce((accumulator, current) => {
    accumulator.push(...[current, "value"]);

    return accumulator;
  }, []);

  return get(rootValue, paths);
};

/**
 * Get sub field rest value
 */
export const getSubFieldRestValue = (rootValue, fieldPath) => {
  const paths = fieldPath.reduce((accumulator, current) => {
    accumulator.push(...[current, "value"]);

    return accumulator;
  }, []);

  // Replace last value with restValue
  paths[paths.length - 1] = "restValue";

  return get(rootValue, paths);
};

/**
 * Get sub field value
 */
export const getSubField = (rootValue, fieldPath, prop = "field") => {
  const pathLength = fieldPath.length;
  const paths = fieldPath.reduce((accumulator, current, index) => {
    accumulator.push(current);

    if (index < pathLength - 1) {
      accumulator.push("value");
    } else {
      accumulator.push(prop);
    }

    return accumulator;
  }, []);

  return get(rootValue, paths);
};

/**
 * Find query block
 */
export const findQueryBlock = (innerBlocks = []) => {
  let foundBlock = null;
  for (const block of innerBlocks) {
    if (block.name === "core/query") {
      foundBlock = block;
      break;
    } else if (block.innerBlocks.length) {
      foundBlock = findQueryBlock(block.innerBlocks);
    }
  }
  return foundBlock;
};

/**
 * Check whether the the block is a static block?
 */
export const isStaticBlock = (attributes) =>
  attributes?.fieldSettings?.isStatic;

/**
 * Detect if a field type is a layout field or not
 *
 * @param {String} type
 * @returns {Boolean}
 */
export const isLayoutField = (type) => MFBACF.LAYOUT_FIELDS.includes(type);

/**
 * Check whether the the block is a repeater block?
 */
export const isRepeaterBlock = (attributes) =>
  attributes?.fieldSettings?.type === "repeater";

/**
 * Check whether the the block is a query block?
 */
export const isQueryBlock = (attributes) =>
  MFBACF.QUERY_FIELDS.includes(attributes?.fieldSettings?.type);

/**
 * Check whether the id is a ACF field key?
 */
export const isACFFieldKey = (id) =>
  toType(id) === "string" && id.startsWith("field_");

/**
 * Get post id from the post query string
 */
export const getPostParam = () => {
  let postParam = new URLSearchParams(window.location.search).get("post") ?? "";
  if (postParam) {
    postParam = parseInt(postParam);
    if (isNaN(postParam)) {
      postParam = "";
    }
  }

  return postParam;
};
