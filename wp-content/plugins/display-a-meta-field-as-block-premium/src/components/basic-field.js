/**
 * External dependencies
 */
import dompurify from "dompurify";
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, getSpacingPresetCssVar } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";

/**
 * Display basic field
 *
 * @param {Object}
 * @returns
 */
export const BasicField = ({
  value,
  isLoading,
  fieldType,
  type,
  className,
  TagName = "div",
  textAlign,
  prefix,
  suffix,
  prefixSettings,
  suffixSettings,
  displayLayout = "",
  showOutline = false,
}) => {
  const InnerTag = TagName === "div" ? "div" : "span";

  const PrefixElement = prefix ? (
    <InnerTag
      className="prefix"
      style={{
        ...prefixSettings,
        ...(prefixSettings?.gap?.top
          ? { ["--mfb--gap"]: getSpacingPresetCssVar(prefixSettings.gap.top) }
          : {}),
      }}
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(prefix) }}
    />
  ) : null;

  const SuffixElement = suffix ? (
    <InnerTag
      className="suffix"
      style={{
        ...suffixSettings,
        ...(suffixSettings?.gap?.top
          ? { ["--mfb--gap"]: getSpacingPresetCssVar(suffixSettings.gap.top) }
          : {}),
      }}
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(suffix) }}
    />
  ) : null;

  return (
    <TagName
      {...useBlockProps({
        className: clsx(className, {
          [`is-${type}-field`]: type,
          [`is-${fieldType}-field`]: fieldType,
          [`has-text-align-${textAlign}`]: textAlign,
          [`is-display-${displayLayout}`]: displayLayout,
        }),
        style: showOutline ? { minHeight: "1em", outline: "1px dashed" } : null,
      })}
    >
      {PrefixElement}
      {isLoading ? (
        <Spinner />
      ) : (
        <InnerTag
          className="value"
          dangerouslySetInnerHTML={{
            __html: value ? dompurify.sanitize(value) : value,
          }}
        />
      )}
      {SuffixElement}
    </TagName>
  );
};
