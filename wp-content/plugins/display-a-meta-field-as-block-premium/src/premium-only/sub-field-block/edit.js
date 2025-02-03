/**
 * External dependencies
 */
import { isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  AlignmentControl,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { PanelBody } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { useState, useMemo } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import {
  TagNameDropdown,
  BasicField,
  BlockEmptySettings,
  BlockOtherSettings,
  BlockStyleSettings,
} from "../../components";
import { handleEmptyValue } from "../../utils";

import {
  DisplaySettings,
  SubFieldSettings,
  GroupField,
  RepeaterField,
} from "../components";
import {
  isStaticBlock,
  isRepeaterBlock,
  isQueryBlock,
  findQueryBlock,
  getSubFieldValue,
  getSubField,
  isLayoutField,
  getFieldOptions,
  buildTemplateForACFField,
} from "../utils/blocks";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
  clientId,
  attributes,
  attributes: {
    fieldPath,
    fieldSettings = {},
    hideEmpty,
    emptyMessage = "",
    tagName: TagName = "div",
    textAlign,
    labelAsPrefix,
    prefix: customPrefix,
    suffix,
    prefixSettings,
    suffixSettings,
    displayLayout = "",
    showOutline = false,
  },
  setAttributes,
  isSelected,
  context: {
    "mfb/value": rootValue,
    "mfb/metaType": metaType,
    "mfb/rootName": rootName,
    "mfb/objectId": objectId,
    "mfb/repeaterIndex": repeaterIndex,
  },
  __unstableLayoutClassNames,
}) {
  const { getBlocks } = useSelect((select) => select(blockEditorStore), []);
  const { updateBlockAttributes, replaceInnerBlocks, replaceBlock } =
    useDispatch(blockEditorStore);
  const [isEdit, setIsEdit] = useState(!fieldPath?.length);

  // Get block value
  const blockValue = useMemo(
    () => (rootValue ? getSubFieldValue(rootValue, fieldPath) : false),
    [rootValue, fieldPath],
  );

  // Get raw value
  const rawValue = useMemo(
    () => getSubField(rootValue, fieldPath, "restValue"),
    [rootValue, fieldPath],
  );

  // On update field name
  const separator = "/";
  const onFieldPathChange = (newFieldPath) => {
    const fieldPath = newFieldPath.split(separator);
    const field = getSubField(rootValue, fieldPath);
    let updatingValue = {
      fieldPath,
      fieldSettings: {
        ...fieldSettings,
        type: undefined,
        key: undefined,
        name: undefined,
        label: undefined,
        as: undefined,
        isStatic: false,
      },
    };

    if (field) {
      const type = field?.type;
      const isStatic = isLayoutField(type);
      updatingValue = {
        ...updatingValue,
        fieldSettings: {
          ...fieldSettings,
          type,
          key: field?.key,
          name: field?.name,
          isStatic,
          options: getFieldOptions(field, fieldSettings?.options ?? {}),
        },
      };

      if (isStatic) {
        let template = buildTemplateForACFField(field, fieldPath.slice(0, -1));
        replaceBlock(clientId, createBlocksFromInnerBlocksTemplate(template));
      } else {
        replaceInnerBlocks(clientId, []);
      }
    }

    setAttributes(updatingValue);
  };

  const isLoading = isEmpty(rootValue);
  const isStatic = isStaticBlock(attributes);

  // Get prefix
  const prefix = customPrefix
    ? customPrefix
    : labelAsPrefix
    ? fieldSettings?.label
    : "";

  let FieldValueControl = null;
  if (isRepeaterBlock(attributes)) {
    const blocks = getBlocks(clientId);
    if (blockValue) {
      FieldValueControl = (
        <RepeaterField
          name={fieldPath?.length ? fieldPath[fieldPath.length - 1] : rootName}
          blocks={blocks}
          value={Object.values(blockValue)}
          textAlign={textAlign}
          showOutline={showOutline}
          layoutClassNames={__unstableLayoutClassNames}
          type={fieldSettings?.type}
        />
      );
    }
  } else if (isStatic) {
    FieldValueControl = (
      <GroupField
        textAlign={textAlign}
        showOutline={showOutline}
        type={fieldSettings?.type}
        fieldSettings={fieldSettings}
      />
    );

    if (isQueryBlock(attributes)) {
      // Update query params on the fly if it is nested inside a repeater.
      if (repeaterIndex) {
        const blocks = getBlocks(clientId);
        const queryBlock = findQueryBlock(blocks);
        if (queryBlock) {
          const { postIds: include = [0], postType = "post" } =
            rawValue?.field?.blockContexts ?? {};

          const {
            clientId: queryBlockId,
            attributes: { query = {} },
          } = queryBlock;

          if (query?.postType !== postType || query?.include !== include) {
            updateBlockAttributes(queryBlockId, {
              query: { ...query, postType, include, perPage: include?.length },
            });
          }
        }
      }
    }
  } else {
    const fieldValue = handleEmptyValue({
      fieldValue: blockValue,
      hideEmpty,
      emptyMessage,
    });

    const formattedValue = applyFilters(
      "MFB.formatValue",
      fieldValue,
      rawValue,
      fieldSettings,
    );

    FieldValueControl = (
      <BasicField
        isLoading={isLoading}
        value={formattedValue}
        fieldType="acf"
        TagName={TagName}
        textAlign={textAlign}
        prefix={prefix}
        suffix={suffix}
        prefixSettings={prefixSettings}
        suffixSettings={suffixSettings}
        displayLayout={displayLayout}
        showOutline={showOutline}
        type={fieldSettings?.type}
      />
    );
  }

  return (
    <>
      {isSelected && (
        <>
          <BlockControls group="block">
            {!isStatic && (
              <TagNameDropdown
                value={TagName}
                onChange={(tagName) => setAttributes({ tagName })}
              />
            )}
            <AlignmentControl
              value={textAlign}
              onChange={(nextAlign) => setAttributes({ textAlign: nextAlign })}
            />
          </BlockControls>
          <InspectorControls group="settings">
            <PanelBody
              title={__("Sub field settings", "display-a-meta-field-as-block")}
            >
              <SubFieldSettings
                fieldPath={fieldPath.join(separator)}
                setFieldPath={onFieldPathChange}
                fieldSettings={fieldSettings}
                isEditable={"repeater-item" !== fieldSettings?.type}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
              <DisplaySettings
                clientId={clientId}
                attributes={attributes}
                setAttributes={setAttributes}
                fieldSettings={fieldSettings}
                replaceInnerBlocks={replaceInnerBlocks}
                blockValue={rawValue}
                layoutSupport={true}
                fieldPath={fieldPath}
                metaType={metaType}
                rootName={rootName}
                objectId={objectId}
              />
              <BlockEmptySettings
                setAttributes={setAttributes}
                hideEmpty={hideEmpty}
                emptyMessage={emptyMessage}
              />
            </PanelBody>
            {!isStatic && (
              <>
                <PanelBody
                  title={__(
                    "Prefix and suffix",
                    "display-a-meta-field-as-block",
                  )}
                  initialOpen={!!(prefix || suffix)}
                >
                  <BlockOtherSettings
                    setAttributes={setAttributes}
                    prefix={customPrefix}
                    suffix={suffix}
                    labelAsPrefix={labelAsPrefix}
                    fieldType="acf"
                    displayLayout={displayLayout}
                  />
                </PanelBody>
              </>
            )}
          </InspectorControls>
          <BlockStyleSettings
            setAttributes={setAttributes}
            attributes={attributes}
          />
        </>
      )}
      {FieldValueControl}
    </>
  );
}
