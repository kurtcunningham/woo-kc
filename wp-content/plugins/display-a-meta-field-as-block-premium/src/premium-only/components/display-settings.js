/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  ToggleControl,
  TextControl,
  RangeControl,
  SelectControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import {
  store as blockEditorStore,
  __experimentalSpacingSizesControl as SpacingSizesControl,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { toType } from "../../utils";
import { MFB_QUERY_LOOP } from "../utils/blocks";
import { LayoutOptions } from "../utils/constants";
import { FlexChildSettingControl } from "./flex-child-setting-control";

/**
 * Constants
 */
const ButtonLabel = __("Button", "display-a-meta-field-as-block");
const LinkLabel = __("Link", "display-a-meta-field-as-block");
const ImageLabel = __("Image", "display-a-meta-field-as-block");

/**
 * Link settings
 *
 * @param {Object} props
 * @returns
 */
export const LinkSettings = (props) => {
  const { value: { title, target } = {}, onChange } = props;

  return (
    <>
      <TextControl
        label={__("Title", "display-a-meta-field-as-block")}
        value={title ?? ""}
        onChange={(title) => {
          onChange({ title });
        }}
        autoComplete="off"
      />
      <ToggleControl
        label={__("Open in new tab", "display-a-meta-field-as-block")}
        checked={target === "_blank"}
        onChange={(value) => {
          onChange({ target: value ? "_blank" : undefined });
        }}
      />
    </>
  );
};

/**
 * Button settings
 *
 * @param {Object} props
 * @returns
 */
export const ButtonSettings = (props) => {
  const { value: { useValueAsText = false } = {}, onChange } = props;

  return (
    <ToggleControl
      label={__(
        "Use the value as button text",
        "display-a-meta-field-as-block",
      )}
      checked={useValueAsText}
      onChange={(useValueAsText) => onChange({ useValueAsText })}
    />
  );
};

/**
 * Link to post settings
 *
 * @param {Object} props
 * @returns
 */
export const ImageLinkSettings = (props) => {
  const {
    value: {
      linkToPost = false,
      linkToField = false,
      fieldPath = "",
      openInNewTab = false,
    } = {},
    onChange,
  } = props;

  return (
    <VStack className="image-link-settings" spacing={2}>
      <ToggleControl
        label={__("Link to post", "display-a-meta-field-as-block")}
        checked={linkToPost}
        onChange={(linkToPost) => onChange({ linkToPost })}
        disabled={linkToField}
      />
      <ToggleControl
        label={__(
          "Link to a custom URL from another field",
          "display-a-meta-field-as-block",
        )}
        checked={linkToField}
        onChange={(linkToField) => onChange({ linkToField })}
        help={__(
          "Clicking on the image will go to this link.",
          "display-a-meta-field-as-block",
        )}
        className="toggle-link-field"
        disabled={linkToPost}
      />
      {linkToField && (
        <VStack className="link-to-field" spacing={1}>
          <TextControl
            label={__("URL field name/path", "display-a-meta-field-as-block")}
            value={fieldPath}
            onChange={(fieldPath) => onChange({ fieldPath })}
            help={__(
              "If it is a subfield, input the path to the field using the '/' character as the delimiter.",
              "display-a-meta-field-as-block",
            )}
            autoComplete="off"
          />
          <ToggleControl
            label={__("Open in new tab", "display-a-meta-field-as-block")}
            checked={openInNewTab}
            onChange={(openInNewTab) => onChange({ openInNewTab })}
          />
        </VStack>
      )}
    </VStack>
  );
};

/**
 * True false settings
 *
 * @param {Object} props
 * @returns
 */
export const TrueFalseSettings = (props) => {
  const {
    value: {
      onText = __("Yes", "display-a-meta-field-as-block"),
      offText = __("No", "display-a-meta-field-as-block"),
    } = {},
    onChange,
  } = props;

  return (
    <>
      <TextControl
        label={__("ON text", "display-a-meta-field-as-block")}
        value={onText}
        onChange={(onText) => {
          onChange({ onText });
        }}
        autoComplete="off"
      />
      <TextControl
        label={__("OFF text", "display-a-meta-field-as-block")}
        value={offText}
        onChange={(offText) => {
          onChange({ offText });
        }}
        autoComplete="off"
      />
    </>
  );
};

/**
 * Gallery settings
 *
 * @param {Object} props
 * @returns
 */
export const GallerySettings = (props) => {
  const {
    value: {
      columns,
      gap = { top: "1em" },
      sizeSlug = "large",
      layout = "cropped",
      lightbox = false,
      randomOrder = false,
    } = {},
    blockValue: { value_formatted: images = [] } = {},
    onChange,
  } = props;

  const imageCount = images?.length;
  const imageSizes = useSelect(
    (select) => select(blockEditorStore).getSettings().imageSizes,
    [],
  );

  return (
    <>
      <ToggleGroupSettings
        label={__("Layout", "display-a-meta-field-as-block")}
        isDeselectable={false}
        isAdaptiveWidth={true}
        isBlock={true}
        value={layout}
        onChange={(layout) => onChange({ layout })}
        options={[
          {
            value: "cropped",
            label: __("Crop image", "display-a-meta-field-as-block"),
          },
          {
            value: "masonry",
            label: __("Masonry", "display-a-meta-field-as-block"),
          },
        ]}
      />
      <RangeControl
        label={__("Columns", "display-a-meta-field-as-block")}
        value={columns ? columns : imageCount ? Math.min(3, imageCount) : 3}
        onChange={(columns) => onChange({ columns })}
        min={1}
        max={12}
        required
      />
      <div style={{ marginBottom: "16px" }}>
        <SpacingSizesControl
          label={__("Gap", "display-a-meta-field-as-block")}
          values={gap}
          onChange={(gap) => onChange({ gap })}
          sides={["top"]}
          showSideInLabel={false}
        />
      </div>
      <SelectControl
        label={__("Resolution", "display-a-meta-field-as-block")}
        value={sizeSlug}
        onChange={(sizeSlug) => onChange({ sizeSlug })}
        options={imageSizes.map(({ slug, name }) => ({
          value: slug,
          label: name,
        }))}
      />
      <ToggleControl
        label={__("Expand on click", "display-a-meta-field-as-block")}
        checked={lightbox}
        onChange={(lightbox) => onChange({ lightbox })}
      />
      <ToggleControl
        label={__("Randomize order", "display-a-meta-field-as-block")}
        checked={randomOrder}
        onChange={(randomOrder) => onChange({ randomOrder })}
      />
    </>
  );
};

/**
 * Display layout settings for 'group' block type
 *
 * @param {Object}
 * @returns
 */
export const ToggleGroupSettings = ({
  label = __("Display as", "display-a-meta-field-as-block"),
  value,
  onChange,
  options,
  ...otherProps
}) => {
  return (
    <ToggleGroupControl
      label={label}
      value={value}
      onChange={onChange}
      {...otherProps}
    >
      {options.map(({ icon, label, value }) => (
        <>
          {icon ? (
            <ToggleGroupControlOptionIcon
              icon={icon}
              label={label}
              value={value}
              key={value}
            />
          ) : (
            <ToggleGroupControlOption label={label} value={value} key={value} />
          )}
        </>
      ))}
    </ToggleGroupControl>
  );
};

/**
 * The display settings
 *
 * @param {Object}
 * @returns
 */
export const DisplaySettings = ({
  clientId,
  attributes,
  setAttributes,
  fieldPath,
  metaType,
  rootName,
  objectId,
  fieldSettings = {},
  replaceInnerBlocks,
  blockValue,
  layoutSupport = false,
}) => {
  const { type } = fieldSettings;
  const { options: { [type]: settingValue = {} } = {} } = fieldSettings;
  const bindingsObject = {
    source: "mfb/bindings",
    args: {
      path: fieldPath,
    },
  };

  const onSettingChange = (type) => (valueObject) => {
    const { options = {} } = fieldSettings;
    const { [type]: typeSettings = {} } = options;
    setAttributes({
      fieldSettings: {
        ...fieldSettings,
        options: {
          ...options,
          [type]: { ...typeSettings, ...valueObject },
        },
      },
    });
  };

  const removeInnerBlocks = () => replaceInnerBlocks(clientId, []);

  const renderText = (blockName, blockValue) => {
    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate([
        [
          blockName,
          {
            content: blockValue,
            metadata: {
              bindings: {
                content: bindingsObject,
              },
            },
          },
        ],
      ]),
    );
  };

  const renderButton = (linkValue) => {
    let options = {};
    if (
      toType(fieldSettings?.options) === "object" &&
      toType(fieldSettings.options[type] ?? false) === "object"
    ) {
      options = fieldSettings.options[type];
    }

    if (toType(linkValue) !== "object") {
      linkValue = {
        url: toType(linkValue) === "string" ? linkValue : "#",
      };
    }

    const attrs = {
      url: linkValue?.url ?? "",
      text: options?.title
        ? options.title
        : linkValue?.title ??
          __("Button text", "display-a-meta-field-as-block"),
      linkTarget: options?.target ? options.target : linkValue?.target ?? "",
      mfb: {
        namespace: fieldPath?.length ? fieldPath[fieldPath.length - 1] : "",
        path: fieldPath,
      },
    };

    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate([
        [
          "core/buttons",
          {},
          [
            [
              "core/button",
              {
                ...attrs,
              },
            ],
          ],
        ],
      ]),
    );
  };

  const renderVideo = (videoValue) => {
    const attrs = {
      id: videoValue["id"] ?? "",
      src: videoValue["url"] ?? "",
      caption: videoValue["caption"] ?? "",
      poster: videoValue["poster"] ?? "",
      mfb: {
        namespace: fieldPath?.length ? fieldPath[fieldPath.length - 1] : "",
        path: fieldPath,
      },
    };

    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate([
        [
          "core/video",
          {
            ...attrs,
          },
        ],
      ]),
    );
  };

  const renderImage = (imageValue) => {
    if (toType(imageValue) !== "object") {
      imageValue = {
        url: imageValue,
      };
    }

    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate([
        [
          "core/image",
          {
            id: imageValue?.id ?? 0,
            url: imageValue?.url,
            alt: imageValue?.alt,
            caption: imageValue?.caption,
            linkDestination: "none",
            mfb: {
              namespace: fieldPath?.length
                ? fieldPath[fieldPath.length - 1]
                : "",
              path: fieldPath,
            },
          },
        ],
      ]),
    );
  };

  const renderLoop = (field) => {
    let { blockContexts: { postType } = {}, post_type: filteredPostTypes } =
      field;

    if (!postType) {
      postType =
        filteredPostTypes && filteredPostTypes?.length
          ? filteredPostTypes[0]
          : "post";
    }

    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate([
        [
          "core/query",
          {
            namespace: MFB_QUERY_LOOP,
            query: {
              postType,
              orderBy: "post__in",
              inherit: false,
              perPage: 12,
              mfb: {
                field_path: fieldPath,
                field_key: field.key ?? "",
                root_name: rootName,
                meta_type: metaType,
                object_id: objectId,
              },
            },
          },
          [["core/post-template", {}, [["core/post-title"]]]],
        ],
      ]),
    );
  };

  return (
    <div className="mfb-field-settings">
      {type === "text" && (
        <ToggleGroupSettings
          isDeselectable={true}
          isAdaptiveWidth={true}
          isBlock={true}
          value={fieldSettings?.as ?? ""}
          onChange={(newValue) => {
            const isStatic = ["core/heading", "core/paragraph"].includes(
              newValue,
            );

            if (!isStatic) {
              removeInnerBlocks();
            } else {
              renderText(newValue, blockValue?.value);
            }

            setAttributes({
              fieldSettings: {
                ...fieldSettings,
                isStatic,
                as: newValue,
                isBinding: true,
              },
            });
          }}
          options={[
            {
              value: "core/heading",
              label: __("Heading", "display-a-meta-field-as-block"),
            },
            {
              value: "core/paragraph",
              label: __("Paragraph", "display-a-meta-field-as-block"),
            },
          ]}
        />
      )}
      {type === "link" && (
        <>
          <ToggleGroupSettings
            isDeselectable={false}
            isAdaptiveWidth={true}
            isBlock={true}
            value={fieldSettings?.as ?? "link"}
            onChange={(newValue) => {
              const isStatic = ["core/button"].includes(newValue);

              if (!isStatic) {
                removeInnerBlocks();
              } else {
                renderButton(blockValue?.value);
              }

              setAttributes({
                fieldSettings: {
                  ...fieldSettings,
                  isStatic,
                  as: newValue,
                },
              });
            }}
            options={[
              {
                value: "link",
                label: LinkLabel,
              },
              {
                value: "core/button",
                label: ButtonLabel,
              },
            ]}
          />
          <ToggleControl
            label={__(
              "Use a custom label for the link",
              "display-a-meta-field-as-block",
            )}
            checked={!!fieldSettings?.options?.link?.useCustomTitle}
            onChange={(useCustomTitle) =>
              onSettingChange(type)({ useCustomTitle })
            }
          />
          {(fieldSettings?.as ?? "link") === "link" &&
            !!fieldSettings?.options?.link?.useCustomTitle && (
              <LinkSettings
                value={settingValue}
                onChange={onSettingChange(type)}
              />
            )}
        </>
      )}
      {type === "url" && (
        <>
          <ToggleGroupSettings
            isDeselectable={true}
            isAdaptiveWidth={true}
            isBlock={true}
            value={fieldSettings?.as ?? ""}
            onChange={(newValue) => {
              const isStatic = ["core/button", "core/image"].includes(newValue);

              if (!isStatic) {
                removeInnerBlocks();
              } else {
                if (newValue === "core/button") {
                  renderButton(blockValue?.value);
                } else if (newValue === "core/image") {
                  renderImage(blockValue?.value);
                }
              }

              setAttributes({
                fieldSettings: {
                  ...fieldSettings,
                  isStatic,
                  as: newValue,
                },
              });
            }}
            options={[
              {
                value: "link",
                label: LinkLabel,
              },
              {
                value: "core/button",
                label: ButtonLabel,
              },
              {
                value: "core/image",
                label: ImageLabel,
              },
            ]}
          />
          {fieldSettings?.as === "link" && (
            <LinkSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
          {fieldSettings?.as === "core/image" && (
            <ImageLinkSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
          {fieldSettings?.as === "core/button" && (
            <ButtonSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
        </>
      )}
      {type === "email" && (
        <>
          <ToggleGroupSettings
            isDeselectable={true}
            isAdaptiveWidth={true}
            isBlock={true}
            value={fieldSettings?.as ?? ""}
            onChange={(newValue) => {
              const isStatic = ["core/button"].includes(newValue);

              if (!isStatic) {
                removeInnerBlocks();
              } else {
                renderButton(
                  blockValue?.value ? `mailto:${blockValue.value}` : "",
                );
              }

              setAttributes({
                fieldSettings: {
                  ...fieldSettings,
                  isStatic,
                  as: newValue,
                },
              });
            }}
            options={[
              {
                value: "link",
                label: LinkLabel,
              },
              {
                value: "core/button",
                label: ButtonLabel,
              },
            ]}
          />
          {fieldSettings?.as === "link" && (
            <LinkSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
          {fieldSettings?.as === "core/button" && (
            <ButtonSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
        </>
      )}
      {type === "file" && (
        <>
          <ToggleGroupSettings
            isDeselectable={false}
            isAdaptiveWidth={true}
            isBlock={true}
            value={fieldSettings?.as ?? "link"}
            onChange={(newValue) => {
              const isStatic = ["core/button", "core/video"].includes(newValue);

              if (!isStatic) {
                removeInnerBlocks();
              } else if (newValue === "core/button") {
                renderButton(blockValue?.value_formatted);
              } else if (newValue === "core/video") {
                renderVideo(blockValue?.value_formatted);
              }

              setAttributes({
                fieldSettings: {
                  ...fieldSettings,
                  isStatic,
                  as: newValue,
                },
              });
            }}
            options={[
              {
                value: "link",
                label: LinkLabel,
              },
              {
                value: "core/button",
                label: ButtonLabel,
              },
              {
                value: "core/video",
                label: __("Video", "display-a-meta-field-as-block"),
              },
            ]}
          />
          {(fieldSettings?.as ?? "link") === "link" && (
            <LinkSettings
              value={settingValue}
              onChange={onSettingChange(type)}
            />
          )}
        </>
      )}
      {type === "image" && (
        <>
          <ToggleControl
            label={__(
              "Display as a core image",
              "display-a-meta-field-as-block",
            )}
            checked={fieldSettings?.as === "core/image"}
            onChange={(newValue) => {
              const updating = {
                fieldSettings: {
                  ...fieldSettings,
                  isStatic: newValue,
                  as: newValue ? "core/image" : "",
                },
              };

              if (newValue) {
                renderImage(blockValue?.value_formatted);
              } else {
                removeInnerBlocks();
              }

              setAttributes(updating);
            }}
            className="toggle-control-style"
          />
          <ImageLinkSettings
            value={settingValue}
            onChange={onSettingChange(type)}
          />
        </>
      )}
      {MFBACF.QUERY_FIELDS.includes(type) && (
        <ToggleControl
          label={__("Display as a query loop", "display-a-meta-field-as-block")}
          checked={fieldSettings?.as === "core/query"}
          onChange={(newValue) => {
            const updating = {
              fieldSettings: {
                ...fieldSettings,
                isStatic: newValue,
                as: newValue ? "core/query" : "",
              },
            };

            if (newValue) {
              renderLoop(blockValue?.field);
            } else {
              removeInnerBlocks();
            }

            setAttributes(updating);
          }}
        />
      )}
      {type === "true_false" && (
        <TrueFalseSettings
          value={settingValue}
          onChange={onSettingChange(type)}
        />
      )}
      {type === "gallery" && (
        <GallerySettings
          value={settingValue}
          blockValue={blockValue}
          onChange={onSettingChange(type)}
        />
      )}
      {layoutSupport &&
        [
          "group",
          "flexible_content-layout",
          "repeater-item",
          "repeater",
        ].includes(type) && (
          <>
            <ToggleGroupSettings
              label={__("Display layout", "display-a-meta-field-as-block")}
              value={(() => {
                let layout = LayoutOptions.group.value;
                if (attributes?.layout?.type === "flex") {
                  if (attributes?.layout?.orientation === "vertical") {
                    layout = LayoutOptions.stack.value;
                  } else {
                    layout = LayoutOptions.row.value;
                  }
                } else if (attributes?.layout?.type === "grid") {
                  layout = LayoutOptions.grid.value;
                }

                return layout;
              })()}
              onChange={(newValue) => {
                let layout = {};
                if (newValue === LayoutOptions.group.value) {
                  layout = { type: "default" };
                } else if (newValue === LayoutOptions.row.value) {
                  layout = { type: "flex", orientation: "horizontal" };
                } else if (newValue === LayoutOptions.stack.value) {
                  layout = { type: "flex", orientation: "vertical" };
                } else if (newValue === LayoutOptions.grid.value) {
                  layout = { type: "grid" };
                }

                setAttributes({ layout });
              }}
              options={[
                LayoutOptions.group,
                LayoutOptions.row,
                LayoutOptions.stack,
                LayoutOptions.grid,
              ]}
            />
            {attributes?.layout?.type === "flex" && (
              <>
                <FlexChildSettingControl
                  orientation={attributes?.layout?.orientation}
                  value={fieldSettings?.layout?.flex?.flexSize ?? ""}
                  onChange={(value) => {
                    const { layout = {} } = fieldSettings;
                    const { flex = {} } = layout;

                    setAttributes({
                      fieldSettings: {
                        ...fieldSettings,
                        layout: {
                          ...layout,
                          flex: { ...flex, flexSize: value },
                        },
                      },
                    });
                  }}
                />
              </>
            )}
          </>
        )}
    </div>
  );
};
