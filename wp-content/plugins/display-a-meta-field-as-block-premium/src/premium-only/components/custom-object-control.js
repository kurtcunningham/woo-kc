/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  BaseControl,
  TextControl,
  Notice,
  ExternalLink,
  Spinner,
} from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies
 */

/**
 * Select type and id for an object
 *
 * @param {Object}
 * @returns
 */
export const CustomObjectControl = ({
  value,
  onChange,
  label,
  help,
  entityRecord,
  isLoading,
  metaType,
  className,
  ...otherProps
}) => {
  let type;
  let title;
  let editLink;
  const isLoadedData =
    value > 0 && entityRecord && entityRecord?.metaType === metaType;

  if (isLoadedData && entityRecord?.id) {
    const editLabel = __("Edit", "display-a-meta-field-as-block");
    switch (metaType) {
      case "post":
        type = sprintf(
          __("Post type: %s", "display-a-meta-field-as-block"),
          entityRecord?.type,
        );
        title = sprintf(
          __("Title: %s", "display-a-meta-field-as-block"),
          entityRecord?.title?.rendered ?? "",
        );
        editLink = (
          <>
            <ExternalLink
              href={addQueryArgs(
                `post.php?post=${entityRecord?.id}&action=edit`,
              )}
            >
              {editLabel}
            </ExternalLink>
          </>
        );
        break;

      case "term":
        type = sprintf(
          __("Taxonomy: %s", "display-a-meta-field-as-block"),
          entityRecord?.taxonomy,
        );
        title = sprintf(
          __("Name: %s", "display-a-meta-field-as-block"),
          entityRecord?.name ?? "",
        );
        editLink = (
          <>
            <ExternalLink
              href={addQueryArgs(
                `term.php?taxonomy=${type}&tag_ID=${entityRecord?.id}`,
              )}
            >
              {editLabel}
            </ExternalLink>
          </>
        );
        break;

      case "user":
        title = sprintf(
          __("Display name: %s", "display-a-meta-field-as-block"),
          entityRecord?.name ?? "",
        );
        editLink = (
          <>
            <ExternalLink
              href={addQueryArgs(`user-edit.php?user_id=${entityRecord?.id}`)}
            >
              {editLabel}
            </ExternalLink>
          </>
        );
        break;

      default:
        break;
    }
  }
  return (
    <BaseControl className={clsx("mfb-custom-object", className)}>
      <TextControl
        value={value}
        onChange={onChange}
        label={label}
        help={help}
        type="number"
        min={-1}
        disabled={isLoading}
        autoComplete="off"
        className="input-control"
        {...otherProps}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isLoadedData && (
            <>
              {!!entityRecord?.code && !!entityRecord?.message && (
                <Notice
                  className="mfb-setting-notice"
                  isDismissible={false}
                  style={{ margin: 0 }}
                  status="warning"
                >
                  {entityRecord.message}
                </Notice>
              )}
              {editLink && (
                <Notice
                  className="mfb-setting-notice"
                  isDismissible={false}
                  style={{ margin: 0 }}
                  status="info"
                >
                  {title && <div>{title}</div>}
                  {type && <div>{type}</div>}
                  {editLink && <div>{editLink}</div>}
                </Notice>
              )}
            </>
          )}
        </>
      )}
    </BaseControl>
  );
};
