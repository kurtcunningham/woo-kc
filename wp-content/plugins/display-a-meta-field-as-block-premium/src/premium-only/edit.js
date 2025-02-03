/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  AlignmentControl,
  BlockContextProvider,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { useDispatch } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

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
} from "../components";
import {
  useMaybeCurrentPost,
  useDebounceField,
  fieldTypeOptions as metaFieldTypeOptions,
  fieldTypeHelpMessages as metaFieldTypeHelpMessages,
  getFieldNameHelp,
  getRawValue,
  getFieldValue,
  getFieldLabel,
  toType,
  useDynamicValue,
} from "../utils";
import { DisplaySettings, GroupField, CustomObjectControl } from "./components";
import {
  metaTypes,
  settingFieldTypeOptions,
  settingFieldTypeHelp,
  buildTemplateForACFField,
  isLayoutField,
  isStaticBlock,
  useMFBDataPro,
  isACFFieldKey,
  refineFieldValue,
  getFieldOptions,
  getPostParam,
} from "./utils";
import { store as MFBStore } from "./store";

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
    metaType = "",
    fieldType = "meta",
    fieldName,
    isCustomSource = false,
    objectId,
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
  // Get post param from query string
  const postParamId = getPostParam();

  const { loadACFField } = useDispatch(MFBStore);
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  // Get postType, postId.
  const { postId, postType } = useMaybeCurrentPost({
    postId: contextPostId,
    postType: contextPostType,
  });

  const { data: dynamicValue, loading: isLoadingDynamicValue } =
    useDynamicValue(
      attributes,
      {
        postId,
      },
      [metaType],
    );

  // Context data
  const {
    ACFFields,
    ACFFieldObject,
    isLoading,
    metaFields,
    restFieldNames,
    restFieldValue,
    settingFieldValue,
    settingFieldNames,
    customEntity,
  } = useMFBDataPro({
    metaType,
    postType,
    postId,
    fieldName,
    fieldType,
    objectId,
    isCustomSource,
    postParamId,
  });

  // On update field name
  const onFieldNameChange = async (newFieldName) => {
    const resetFieldSettings = {
      ...fieldSettings,
      type: undefined,
      key: undefined,
      as: undefined,
      isStatic: false,
    };

    let updatingValue = {
      fieldName: newFieldName,
      fieldSettings: resetFieldSettings,
    };

    if (fieldType === "acf") {
      const ACFFieldObject =
        fieldType === "acf" && isACFFieldKey(newFieldName)
          ? await loadACFField(newFieldName)
          : null;

      const rawValue = getRawValue({
        fieldType,
        fieldName: newFieldName,
        ACFFields,
        ACFFieldObject,
      });

      let type;
      let isStatic;
      if (toType(rawValue) === "object") {
        const field = rawValue?.field ?? {};
        type = field?.type;
        isStatic = isLayoutField(type);
        updatingValue = {
          ...updatingValue,
          fieldSettings: {
            ...resetFieldSettings,
            type,
            key: field?.key,
            isStatic,
            options: getFieldOptions(field, resetFieldSettings?.options ?? {}),
          },
        };
      }

      if (isStatic) {
        let template = buildTemplateForACFField(rawValue?.field, []);

        replaceInnerBlocks(
          clientId,
          createBlocksFromInnerBlocksTemplate(template),
        );
      }
    }

    setAttributes(updatingValue);
  };

  // Field name
  const [tmpFieldName, setTmpFieldName] = useDebounceField({
    value: fieldName,
    onChange: onFieldNameChange,
  });

  const fieldTypeOptions =
    metaType === "option" ? settingFieldTypeOptions : metaFieldTypeOptions;

  const fieldTypeHelpMessages = {
    ...metaFieldTypeHelpMessages,
    ...settingFieldTypeHelp,
  };

  // Raw value
  const rawValue = getRawValue({
    fieldType,
    fieldName,
    metaFields,
    ACFFields,
    ACFFieldObject,
    restFieldValue,
    settingFieldValue,
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
    metaType,
    fieldType,
    metaFields,
    ACFFields,
    restFieldNames,
    settingFieldNames,
    additionalHelp:
      !metaType && !postId && !postParamId ? (
        <strong>
          {__(
            "You should explicitly choose the meta type (not auto value) and input a sample ID for the block to load field information. ",
            "display-a-meta-field-as-block",
          )}
        </strong>
      ) : (
        ""
      ),
  });

  // Get prefix
  const prefix = customPrefix
    ? customPrefix
    : fieldType === "acf" && labelAsPrefix
    ? getFieldLabel(rawValue)
    : "";

  const isStatic = isStaticBlock(attributes);

  const typeClass = clsx({
    [`is-${fieldSettings?.type}-field`]: fieldSettings?.type,
  });

  let FieldValueControl = null;
  if (!fieldName) {
    FieldValueControl = (
      <BasicField
        value={fieldValue}
        fieldType={fieldType}
        TagName={TagName}
        textAlign={textAlign}
        prefix={prefix}
        suffix={suffix}
        prefixSettings={prefixSettings}
        suffixSettings={suffixSettings}
        displayLayout={displayLayout}
        showOutline={showOutline}
        className={typeClass}
      />
    );
  } else {
    if (isStatic) {
      FieldValueControl = (
        <GroupField
          textAlign={textAlign}
          showOutline={showOutline}
          className={typeClass}
          fieldSettings={fieldSettings}
        />
      );
    } else {
      const formattedValue = applyFilters(
        "MFB.formatValue",
        fieldValue,
        rawValue,
        fieldSettings,
      );

      FieldValueControl = (
        <BasicField
          isLoading={isLoading || isLoadingDynamicValue}
          value={formattedValue}
          fieldType={fieldType}
          TagName={TagName}
          textAlign={textAlign}
          prefix={prefix}
          suffix={suffix}
          prefixSettings={prefixSettings}
          suffixSettings={suffixSettings}
          displayLayout={displayLayout}
          showOutline={showOutline}
          className={typeClass}
        />
      );
    }
  }

  if (!isStatic) {
    replaceInnerBlocks(clientId, []);
  }

  const customIdLabel = isCustomSource
    ? __("Custom %s id", "display-a-meta-field-as-block")
    : __("Sample %s id", "display-a-meta-field-as-block");

  const hasCustomSource = ["post", "user", "term"].includes(metaType);
  const hasSampleId =
    ["user", "term"].includes(metaType) ||
    isCustomSource ||
    (!postId && !postParamId);

  const customIdhelp = isCustomSource
    ? __(
        "The block will display the meta field from this item, not the one from the context.",
        "display-a-meta-field-as-block",
      )
    : __(
        "You need to input a sample item ID for the block to load data on the editor.",
        "display-a-meta-field-as-block",
      );

  // Object Id
  const [tmpObjectId, setTmpObjectId] = useDebounceField({
    value: objectId,
    onChange: (rawValue) => {
      const objectId = rawValue.trim() === "" ? "" : parseInt(rawValue);
      if (objectId === "" || !isNaN(objectId)) {
        setAttributes({ objectId });
      }
    },
  });

  let contextId = postId;
  if (["term", "user"].includes(metaType) || !postId || isCustomSource) {
    contextId = objectId;
  }

  // Memorize raw value
  const memoizedValue = useMemo(() => rawValue, [JSON.stringify(rawValue)]);

  // Memorize field settings
  const memoizedSettings = useMemo(
    () => fieldSettings,
    [JSON.stringify(fieldSettings)],
  );

  // Memorize it
  const refinedValue = useMemo(
    () => ({
      "mfb/value": refineFieldValue(memoizedValue),
      "mfb/metaType": metaType,
      "mfb/rootName": fieldName,
      "mfb/objectId": contextId,
      "mfb/fieldSettings": memoizedSettings,
    }),
    [memoizedValue, metaType, fieldName, contextId, memoizedSettings],
  );

  return (
    <BlockContextProvider value={refinedValue}>
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
              title={__("Meta field settings", "display-a-meta-field-as-block")}
            >
              <SelectControl
                label={__("Meta type", "display-a-meta-field-as-block")}
                options={metaTypes}
                value={metaType}
                onChange={(metaType) => {
                  let updatingObject = { metaType };
                  if (metaType === "option") {
                    if (!["acf", "option"].includes(fieldType)) {
                      updatingObject = {
                        ...updatingObject,
                        fieldType: "option",
                      };
                    }
                  } else {
                    if (fieldType === "option") {
                      updatingObject = { ...updatingObject, fieldType: "meta" };
                    }
                  }
                  setAttributes(updatingObject);
                }}
                help={__(
                  "Choose whether we should display post meta, term meta, user meta, or setting fields.",
                  "display-a-meta-field-as-block",
                )}
                disabled={isLoading}
              />
              {hasCustomSource && (
                <>
                  <ToggleControl
                    label={sprintf(
                      __(
                        "Display field from a custom %s",
                        "display-a-meta-field-as-block",
                      ),
                      metaType,
                    )}
                    checked={isCustomSource}
                    onChange={(isCustomSource) =>
                      setAttributes({ isCustomSource })
                    }
                  />
                  {hasSampleId && (
                    <CustomObjectControl
                      label={sprintf(customIdLabel, metaType)}
                      value={tmpObjectId}
                      onChange={setTmpObjectId}
                      help={customIdhelp}
                      metaType={metaType}
                      entityRecord={customEntity}
                      isLoading={isLoading}
                    />
                  )}
                </>
              )}
              <BlockGeneralSettings
                setAttributes={setAttributes}
                fieldType={fieldType}
                fieldTypeOptions={fieldTypeOptions}
                fieldTypeHelpMessages={fieldTypeHelpMessages}
                fieldName={tmpFieldName}
                setFieldName={setTmpFieldName}
                fieldNameHelp={fieldNameHelp}
              />
              <DisplaySettings
                clientId={clientId}
                attributes={attributes}
                setAttributes={setAttributes}
                fieldSettings={fieldSettings}
                replaceInnerBlocks={replaceInnerBlocks}
                blockValue={rawValue}
                fieldPath={[fieldName]}
                metaType={metaType}
                rootName={fieldName}
                objectId={contextId}
              />
              <BlockEmptySettings
                setAttributes={setAttributes}
                hideEmpty={hideEmpty}
                emptyMessage={emptyMessage}
              />
            </PanelBody>
            {!isStatic && (
              <PanelBody
                title={__("Prefix and suffix", "display-a-meta-field-as-block")}
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
            )}
          </InspectorControls>
          <BlockStyleSettings
            setAttributes={setAttributes}
            attributes={attributes}
          />
        </>
      )}
      {FieldValueControl}
    </BlockContextProvider>
  );
}
