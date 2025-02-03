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
  __experimentalUseBlockPreview as useBlockPreview,
} from "@wordpress/block-editor";
import { memo, useState } from "@wordpress/element";

/**
 * Internal dependencies
 */

function RepeaterInnerBlocks() {
  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "mfb-repeater-item",
    },
    {
      __unstableDisableLayoutClassNames: true,
    },
  );

  return <div {...innerBlocksProps} />;
}

function RepeaterBlockPreview({
  blocks,
  blockContextId,
  isHidden,
  setActiveBlockContextId,
}) {
  const blockPreviewProps = useBlockPreview({
    blocks,
    props: {
      className: "mfb-repeater-item",
    },
  });

  const handleOnClick = () => {
    setActiveBlockContextId(blockContextId);
  };

  const style = {
    display: isHidden ? "none" : undefined,
  };

  return (
    <div
      {...blockPreviewProps}
      tabIndex={0}
      role="button"
      onClick={handleOnClick}
      style={style}
    />
  );
}

const MemoizedRepeaterBlockPreview = memo(RepeaterBlockPreview);

/**
 * Display repeater fields
 *
 * @param {Object}
 * @returns
 */
export const RepeaterField = ({
  name,
  blocks,
  value,
  type,
  textAlign,
  showOutline = false,
  className,
  layoutClassNames,
}) => {
  const [activeBlockContextId, setActiveBlockContextId] = useState();
  const blockProps = useBlockProps({
    className: clsx(layoutClassNames, className, "mfb-repeater", {
      [`is-${type}-field`]: type,
      [`has-text-align-${textAlign}`]: textAlign,
    }),
    style: showOutline ? { minHeight: "1em", outline: "1px dashed" } : null,
  });

  return (
    <div {...blockProps}>
      {value &&
        value.map((itemValue, index) => {
          const contextValue = { [name]: { value: itemValue } };
          return (
            <BlockContextProvider
              key={index}
              value={{
                "mfb/value": contextValue,
                "mfb/repeaterIndex": index + 1,
              }}
            >
              {index === (activeBlockContextId || 0) ? (
                <RepeaterInnerBlocks />
              ) : null}
              <MemoizedRepeaterBlockPreview
                blocks={blocks}
                blockContextId={index}
                setActiveBlockContextId={setActiveBlockContextId}
                isHidden={index === (activeBlockContextId || 0)}
              />
            </BlockContextProvider>
          );
        })}
    </div>
  );
};
