/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  BlockContextProvider,
} from "@wordpress/block-editor";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */

/**
 * Display group fields
 *
 * @param {Object}
 * @returns
 */
export const GroupField = ({
  template = [],
  type,
  textAlign,
  showOutline = false,
  TagName = "div",
  className,
  fieldSettings,
}) => {
  const blockProps = useBlockProps({
    className: clsx(className, {
      [`is-${type}-field`]: type,
      [`has-text-align-${textAlign}`]: textAlign,
    }),
    style: showOutline ? { minHeight: "1em", outline: "1px dashed" } : null,
  });
  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
    template,
    templateLock: false,
    renderAppender: false,
  });

  // Memorize field settings
  const memoizedSettings = useMemo(
    () => fieldSettings,
    [JSON.stringify(fieldSettings)],
  );

  const contextValue = useMemo(() => {
    const context = {
      "mfb/fieldSettings": memoizedSettings,
    };

    // Add a fake repeater index to load posts for Query Loop on the fly.
    if (type === "flexible_content") {
      context["mfb/repeaterIndex"] = 1;
    }

    return context;
  }, [memoizedSettings, type]);

  return (
    <BlockContextProvider value={contextValue}>
      <TagName {...innerBlocksProps}>{children}</TagName>
    </BlockContextProvider>
  );
};
