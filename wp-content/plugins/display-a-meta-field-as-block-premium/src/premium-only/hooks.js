/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";
import { select } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { createHigherOrderComponent, useInstanceId } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import { BLOCK_BINDINGS_ALLOWED_BLOCKS, canBindBlock } from "./utils/constants";
import { getSubFieldValue, getSubFieldRestValue } from "./utils/blocks";

/**
 * Force removing block support for color features on the SFB block
 */
addFilter(
  "blockEditor.useSetting.before",
  "SFB/blockEditor.useSetting.before",
  (settingValue, settingName, clientId, blockName) => {
    if (blockName !== "mfb/sub-field-block") {
      return settingValue;
    }

    if (!["layout", "spacing.blockGap"].includes(settingName)) {
      return settingValue;
    }

    const { getBlockAttributes } = select(blockEditorStore);
    const attributes = getBlockAttributes(clientId);

    // Only apply gap to static blocks
    if (settingName === "spacing.blockGap") {
      return attributes?.fieldSettings?.isStatic;
    }

    // Add support for allowSizingOnChildren on 'group' blocks
    if (settingName === "layout") {
      if (
        ["group", "flexible_content-layout", "repeater-item"].includes(
          attributes?.fieldSettings?.type,
        )
      ) {
        return { allowSizingOnChildren: true };
      }
    }

    return settingValue;
  },
);

/**
 * Format value for simple value
 */
addFilter(
  "MFB.formatValue",
  `MFB.formatValue`,
  (value, rawValue, fieldSettings) => {
    const {
      type,
      as,
      options: { [type]: settingValue = {} } = {},
    } = fieldSettings;
    if (["url", "email"].includes(type)) {
      if (as === "link") {
        const originalValue = value;
        if (!value) {
          return value;
        } else {
          if (type === "email") {
            value = `mailto:${value}`;
          }
        }

        let { title, target } = settingValue;
        if (!title) {
          title = originalValue;
        }
        let attrs = "";
        if (target) {
          attrs = ` target="${target}"`;
        }

        return `<a href="${value}"${attrs}>${title}</a>`;
      }
    } else if (type === "true_false") {
      if (settingValue?.onText || settingValue?.offText) {
        return rawValue?.value_formatted
          ? settingValue?.onText
          : settingValue?.offText;
      }
    } else if (type === "file") {
      const { url } = rawValue?.value_formatted ?? {};
      if (url) {
        let { title, target } = settingValue;
        if (!title) {
          title = value;
        }

        let attrs = "";
        if (target) {
          attrs = ` target="${target}"`;
        }

        return `<a href="${url}"${attrs}>${title}</a>`;
      }
    } else if (type === "link") {
      if (!as || as === "link") {
        if (!value) {
          return value;
        }

        if (!settingValue?.useCustomTitle) {
          return value;
        }

        if (!rawValue?.value?.url) {
          return value;
        }

        let { title, target } = settingValue;
        if (!title) {
          title = rawValue?.value?.title ?? "";
        }

        let attrs = "";
        if (target) {
          attrs = ` target="${target}"`;
        }

        return `<a href="${rawValue.value.url}"${attrs}>${title}</a>`;
      }
    } else if (type === "gallery") {
      if (rawValue?.value_formatted?.length) {
        const {
          columns = 3,
          gap: { top: gap = "1em" } = {},
          sizeSlug = "medium",
          layout = "cropped",
          randomOrder = false,
        } = settingValue;
        const basis =
          columns > 0 ? (100 / (columns + 1) + 0.1).toFixed(4) : 100;
        const galleryStyle = `--mfb-gallery-columns:${columns};--mfb-gallery-gap:${gap};--mfb-gallery-item-width:${basis}%;`;

        const image_ids = rawValue?.value_formatted;
        if (randomOrder) {
          image_ids.sort(() => Math.random() - 0.5);
        }

        const images_markup = image_ids.reduce((prev, item) => {
          const { sizes: { [sizeSlug]: imageSize } = {} } = item;
          prev += `<figure class="wp-block-image size-${sizeSlug}"><img src="${
            imageSize ? imageSize?.src : item?.url
          }" alt="${item?.alt}" /></figure>`;

          return prev;
        }, "");
        value = `<figure class="mfb-block-gallery is-${layout}" style="${galleryStyle}">${images_markup}</figure>`;
      }
    }

    return value;
  },
);

/**
 * Add class, style for the children of flex layout.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withFlexLayoutStyle = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (props.name !== "mfb/sub-field-block") {
      return <BlockListBlock {...props} />;
    }

    const id = useInstanceId(BlockListBlock);

    if (props?.attributes?.layout?.type !== "flex") {
      return <BlockListBlock {...props} />;
    }

    const {
      attributes: {
        fieldSettings: { layout: { flex: { flexSize = "" } = {} } = {} } = {},
      } = {},
    } = props;

    if (flexSize === "") {
      return <BlockListBlock {...props} />;
    }

    const layoutClass = `wp-container-${id}`;
    const style = `.${layoutClass}>*{flex:${flexSize}}`;

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, layoutClass)}
        />
        {style && <style>{style}</style>}
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `MFB/flexLayout/withFlexLayoutStyle`,
  withFlexLayoutStyle,
);

/**
 * Filters registered block settings, extending attributes with custom attributes
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 * @param {String} name Block name
 *
 * @return {Object} Filtered block settings.
 */
export function addBlockBindingsAttribute(settings, name) {
  if (canBindBlock(name)) {
    if ("type" in (settings.attributes?.mfb ?? {})) {
      return settings;
    }

    // Custom attribute for replacing dynamic value
    settings.attributes = {
      ...settings.attributes,
      mfb: {
        type: "object",
      },
    };

    // Use context from MFB or SFB
    if (!settings?.usesContext) {
      settings.usesContext = [];
    }

    settings.usesContext.push("mfb/value", "mfb/fieldSettings");
  }

  return settings;
}
addFilter(
  "blocks.registerBlockType",
  "MFB/blockBindings/attribute",
  addBlockBindingsAttribute,
);

/**
 * Override value for mfb binding blocks
 *
 * @param {Component} BlockEdit Original component.
 *
 * @return {Component} Wrapped component.
 */
const withDynamicValue = createHigherOrderComponent((BlockEdit) => (props) => {
  const { name, attributes, context = [] } = props;
  if (canBindBlock(name) && context?.["mfb/value"]) {
    const boundAttributes = {};
    // Only support block binding for heading and paragraph
    if (["core/heading", "core/paragraph"].includes(name)) {
      const bindings = attributes?.metadata?.bindings;
      if (bindings) {
        const contextValue = context?.["mfb/value"];
        const supportedAttributes = BLOCK_BINDINGS_ALLOWED_BLOCKS[name];
        supportedAttributes.forEach((attributeName) => {
          if (
            bindings?.[attributeName]?.source === "mfb/bindings" &&
            bindings?.[attributeName]?.args?.path
          ) {
            if (attributeName === "content") {
              boundAttributes[attributeName] = getSubFieldValue(
                contextValue,
                bindings?.[attributeName]?.args?.path,
              );
            }
          }
        });
      }
    } else {
      const contextValue = context?.["mfb/value"];
      const path = attributes?.mfb?.path;
      if (path) {
        const restValue = getSubFieldRestValue(contextValue, path);
        if (restValue?.value_formatted) {
          const fieldType = restValue?.field?.type;
          const supportedAttributes = BLOCK_BINDINGS_ALLOWED_BLOCKS[name];
          if (name === "core/image") {
            if (fieldType === "image") {
              supportedAttributes.forEach((attributeName) => {
                if (restValue.value_formatted?.[attributeName]) {
                  let attributeValue = restValue.value_formatted[attributeName];
                  if (
                    attributeName === "url" &&
                    attributes?.sizeSlug &&
                    restValue.value_formatted?.sizes?.[attributes?.sizeSlug]
                      ?.src
                  ) {
                    attributeValue =
                      restValue.value_formatted.sizes[attributes.sizeSlug].src;
                  }
                  boundAttributes[attributeName] = attributeValue;
                }
              });
            } else if (fieldType === "url") {
              boundAttributes["url"] = restValue.value_formatted;
            }
          } else if (name === "core/button") {
            const options =
              context?.["mfb/fieldSettings"]?.options?.[fieldType];
            if (fieldType === "link") {
              boundAttributes["url"] = restValue.value_formatted["url"] ?? "#";
              if (
                !options?.useCustomTitle &&
                restValue.value_formatted?.title
              ) {
                boundAttributes["text"] = restValue.value_formatted.title;
              }
            } else if (fieldType === "email") {
              boundAttributes["url"] = `mailto:${restValue.value_formatted}`;
              if (options?.useValueAsText) {
                boundAttributes["text"] = restValue.value_formatted;
              }
            } else if (fieldType === "url") {
              boundAttributes["url"] = restValue.value_formatted;
              if (options?.useValueAsText) {
                boundAttributes["text"] = restValue.value_formatted;
              }
            } else if (fieldType === "file") {
              if (restValue.value_formatted?.url) {
                boundAttributes["url"] = restValue.value_formatted.url;
              }
            }
          } else if (name === "core/video") {
            if (restValue.value_formatted?.url) {
              boundAttributes["src"] = restValue.value_formatted.url;
              boundAttributes["poster"] =
                restValue.value_formatted?.poster ?? "";
              boundAttributes["caption"] =
                restValue.value_formatted?.caption ?? "";
            }
          }
        }
      }
    }

    if (Object.keys(boundAttributes).length !== 0) {
      props = {
        ...props,
        attributes: {
          ...props.attributes,
          ...boundAttributes,
        },
      };
    }
  }

  return <BlockEdit {...props} />;
});
addFilter(
  "editor.BlockEdit",
  "mfb/blockBindings/with-dynamic-value",
  withDynamicValue,
);
