/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  ToggleControl,
  PanelBody,
  BaseControl,
  __experimentalGrid as Grid,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import {
  InspectorControls,
  useSettings,
  FontSizePicker,
  LineHeightControl,
  getFontSizeObjectByValue,
  __experimentalFontAppearanceControl as FontAppearanceControl,
  __experimentalSpacingSizesControl as SpacingSizesControl,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { prefixSuffixLabel, prefixLabel, suffixLabel } from "../utils";

/**
 * Typography settings control
 * @param {Object}
 */
const TypographySettings = ({
  label,
  fontSizeValue: fontSize,
  fontWeight,
  fontStyle,
  lineHeight,
  onChange,
}) => {
  return (
    <>
      <BaseControl label={label} />
      <Grid
        className="typography-settings"
        columns={2}
        columnGap="8px"
        rowGap="16px"
      >
        <div style={{ gridColumn: "span 2" }}>
          <FontSizePicker
            value={fontSize}
            onChange={onChange("fontSize")}
            withReset={false}
            withSlider
            __nextHasNoMarginBottom
            size="__unstable-large"
          />
        </div>
        <FontAppearanceControl
          value={{
            fontWeight,
            fontStyle,
          }}
          onChange={onChange("fontAppearance")}
          hasFontStyles={true}
          hasFontWeights={true}
          size="__unstable-large"
          __nextHasNoMarginBottom
        />
        <LineHeightControl
          value={lineHeight}
          onChange={onChange("lineHeight")}
          size="__unstable-large"
          __nextHasNoMarginBottom
          __unstableInputWidth="auto"
        />
      </Grid>
    </>
  );
};

/**
 * Display the style settings
 *
 * @param {Object}
 * @returns
 */
export const BlockStyleSettings = ({ setAttributes, attributes }) => {
  const {
    showOutline,
    prefix,
    suffix,
    fieldType,
    labelAsPrefix,
    prefixSettings,
    suffixSettings,
  } = attributes;
  const hasPrefix = !!prefix || (fieldType === "acf" && labelAsPrefix);
  const hasSuffix = !!suffix;
  const fontSizes = useSettings("typography.fontSizes")[0];

  const onTypographyChange =
    (attributeName, attributeValue) => (name) => (value) => {
      if (name !== "fontAppearance") {
        if (name === "fontSize") {
          const fontSizeSlug = getFontSizeObjectByValue(fontSizes, value).slug;
          value = {
            fontSizeValue: value,
            fontSize: fontSizeSlug
              ? `var(--wp--preset--font-size--${fontSizeSlug}, ${value})`
              : value,
          };
        } else {
          value = { [name]: value };
        }
      }
      if (!attributeValue) {
        attributeValue = { ...value };
      } else {
        attributeValue = { ...attributeValue, ...value };
      }
      setAttributes({ [attributeName]: attributeValue });
    };

  const onGapChange = (attributeName, attributeValue) => (gap) => {
    if (!attributeValue) {
      attributeValue = { gap };
    } else {
      attributeValue = { ...attributeValue, gap };
    }
    setAttributes({ [attributeName]: attributeValue });
  };

  const gapLabel = __("Margin", "display-a-meta-field-as-block");
  return (
    <InspectorControls group="styles">
      {(hasPrefix || hasSuffix) && (
        <ToolsPanel
          label={prefixSuffixLabel}
          resetAll={() => {
            setAttributes({
              prefixSettings: undefined,
              suffixSettings: undefined,
            });
          }}
        >
          {hasPrefix && (
            <ToolsPanelItem
              label={prefixLabel}
              hasValue={() => hasPrefix && prefixSettings}
              onDeselect={() =>
                setAttributes({
                  prefixSettings: undefined,
                })
              }
            >
              <TypographySettings
                label={prefixLabel}
                {...prefixSettings}
                onChange={onTypographyChange("prefixSettings", prefixSettings)}
              />
              <div style={{ marginTop: "16px" }}>
                <SpacingSizesControl
                  label={gapLabel}
                  values={prefixSettings?.gap}
                  onChange={onGapChange("prefixSettings", prefixSettings)}
                  sides={["top"]}
                  showSideInLabel={false}
                />
              </div>
            </ToolsPanelItem>
          )}
          {hasSuffix && (
            <ToolsPanelItem
              label={suffixLabel}
              hasValue={() => hasSuffix && suffixSettings}
              onDeselect={() =>
                setAttributes({
                  suffixSettings: undefined,
                })
              }
            >
              <TypographySettings
                label={suffixLabel}
                {...suffixSettings}
                onChange={onTypographyChange("suffixSettings", suffixSettings)}
              />
              <div style={{ marginTop: "16px" }}>
                <SpacingSizesControl
                  label={gapLabel}
                  values={suffixSettings?.gap}
                  onChange={onGapChange("suffixSettings", suffixSettings)}
                  sides={["top"]}
                  showSideInLabel={false}
                />
              </div>
            </ToolsPanelItem>
          )}
        </ToolsPanel>
      )}
      <PanelBody title={__("Block style settings")}>
        <ToggleControl
          label={__("Show block outline", "display-a-meta-field-as-block")}
          checked={showOutline}
          onChange={(showOutline) => setAttributes({ showOutline })}
          help={__(
            "Highlight the block on the Editor only.",
            "display-a-meta-field-as-block",
          )}
        />
      </PanelBody>
    </InspectorControls>
  );
};
