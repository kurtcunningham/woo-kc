/**
 * External dependencies
 */
import clsx from "clsx";
import { isFunction } from "lodash";

/**
 * WordPress dependencies
 */
import { cleanForSlug } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { useLocalStorage } from "../utils";

import "./widget.scss";

// Block of content inside a widget.
export const Fieldset = `
  padding: 12px 16px;
  margin-top: 12px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 2px;

  .fieldset__label {
    margin-bottom: 12px;
  }

  .fieldset__list {
    margin-bottom: 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 1rem;
  }

  .file-upload {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 0.5em;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Widget = ({
  title,
  settingsName = "mfb-settings",
  children,
  renderFooter = null,
  isFullRow = false,
  isHeaderHidden = false,
  className,
  initialOpen = true,
}) => {
  const cacheKey = `${settingsName}-${cleanForSlug(title)}`;
  const [collapseState, setCollapseState] = useLocalStorage(
    cacheKey,
    !initialOpen,
  );
  return (
    <div
      className={clsx("postbox settings-widget", className, {
        ["closed"]: collapseState,
        ["is-full-row"]: isFullRow,
        "is-header-hidden": isHeaderHidden,
      })}
    >
      {!isHeaderHidden && (
        <div
          className="postbox-header"
          aria-expanded={collapseState ? "false" : "true"}
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            setCollapseState(!collapseState);
          }}
        >
          <h2 className="hndle">{title}</h2>
          <div className="handle-actions hide-if-no-js">
            <button
              type="button"
              className="handlediv"
              aria-expanded={collapseState ? "false" : "true"}
              onClick={(e) => {
                e.preventDefault();
                setCollapseState(!collapseState);
              }}
            >
              <span className="screen-reader-text">Toggle panel: {title}</span>
              <span
                className="toggle-indicator"
                aria-hidden={collapseState ? "true" : "false"}
              ></span>
            </button>
          </div>
        </div>
      )}
      <div className="inside">{children}</div>
      {isFunction(renderFooter) && (
        <div className="postbox-footer">{renderFooter()}</div>
      )}
    </div>
  );
};
