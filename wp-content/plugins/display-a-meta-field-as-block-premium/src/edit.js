/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  AlignmentControl,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  TagNameDropdown,
  BasicField,
  BlockGeneralSettings,
  BlockEmptySettings,
  BlockOtherSettings,
  BlockStyleSettings,
} from "./components";
import {
  useMaybeCurrentPost,
  useDebounceField,
  useMFBData,
  fieldTypeOptions,
  fieldTypeHelpMessages,
  getFieldNameHelp,
  getRawValue,
  getFieldValue,
  getFieldLabel,
  toType,
  useDynamicValue,
  prefixSuffixLabel,
} from "./utils";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
  attributes,
  attributes: {
    fieldType = "meta",
    fieldName,
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
  context: { postId: contextPostId, postType: contextPostType },
}) {
  // Get postType, postId.
  const { postId, postType } = useMaybeCurrentPost({
    postId: contextPostId,
    postType: contextPostType,
  });

  const { data: dynamicValue, loading: isLoadingDynamicValue } =
    useDynamicValue(attributes, {
      postId,
    });

  // Context data
  const { ACFFields, metaFields, restFieldNames, restFieldValue } = useMFBData({
    name: postType,
    id: postId,
    fieldName,
  });

  // On update field name
  const onFieldNameChange = (newFieldName) => {
    let updatingValue = {
      fieldName: newFieldName,
      fieldSettings: {
        ...fieldSettings,
        type: undefined,
        key: undefined,
      },
    };
    if (fieldType === "acf") {
      const rawValue = getRawValue({
        fieldType,
        fieldName: newFieldName,
        ACFFields,
      });

      if (toType(rawValue) === "object") {
        const field = rawValue?.field ?? {};
        updatingValue = {
          ...updatingValue,
          fieldSettings: {
            ...fieldSettings,
            type: field?.type,
            key: field?.key,
          },
        };
      }
    }

    setAttributes(updatingValue);
  };

  // Field name
  const [tmpFieldName, setTmpFieldName] = useDebounceField({
    value: fieldName,
    onChange: onFieldNameChange,
  });

  // Raw value
  const rawValue = getRawValue({
    fieldType,
    fieldName,
    metaFields,
    ACFFields,
    restFieldValue,
    dynamicValue,
  });

  // Field value
  const fieldValue = getFieldValue({
    rawValue,
    fieldType,
    fieldName,
    hideEmpty,
    emptyMessage,
  });

  // Help message for fieldName
  const fieldNameHelp = getFieldNameHelp({
    fieldType,
    metaFields,
    ACFFields,
    restFieldNames,
  });

  // Get prefix
  const prefix = customPrefix
    ? customPrefix
    : fieldType === "acf" && labelAsPrefix
    ? getFieldLabel(rawValue)
    : "";

  return (
    <>
      {isSelected && (
        <>
          <BlockControls group="block">
            <TagNameDropdown
              value={TagName}
              onChange={(tagName) => setAttributes({ tagName })}
            />
            <AlignmentControl
              value={textAlign}
              onChange={(nextAlign) => setAttributes({ textAlign: nextAlign })}
            />
          </BlockControls>
          <InspectorControls group="settings">
            <PanelBody
              title={__("Meta field settings", "display-a-meta-field-as-block")}
            >
              <BlockGeneralSettings
                setAttributes={setAttributes}
                fieldType={fieldType}
                fieldTypeOptions={fieldTypeOptions}
                fieldTypeHelpMessages={fieldTypeHelpMessages}
                fieldName={tmpFieldName}
                setFieldName={setTmpFieldName}
                fieldNameHelp={fieldNameHelp}
              />
              <BlockEmptySettings
                setAttributes={setAttributes}
                hideEmpty={hideEmpty}
                emptyMessage={emptyMessage}
              />
            </PanelBody>
            <PanelBody
              title={prefixSuffixLabel}
              initialOpen={!!(prefix || suffix)}
            >
              <BlockOtherSettings
                setAttributes={setAttributes}
                prefix={customPrefix}
                suffix={suffix}
                labelAsPrefix={labelAsPrefix}
                fieldType={fieldType}
                displayLayout={displayLayout}
              />
            </PanelBody>
          </InspectorControls>
          <BlockStyleSettings
            setAttributes={setAttributes}
            attributes={attributes}
          />
        </>
      )}
      <BasicField
        value={fieldValue}
        fieldType={fieldType}
        isLoading={isLoadingDynamicValue}
        TagName={TagName}
        textAlign={textAlign}
        prefix={prefix}
        suffix={suffix}
        prefixSettings={prefixSettings}
        suffixSettings={suffixSettings}
        displayLayout={displayLayout}
        showOutline={showOutline}
      />
    </>
  );
}
