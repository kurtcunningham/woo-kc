/**
 * WordPress dependencies
 */
import { ToolbarDropdownMenu } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

const TAG_NAMES = [
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
  "p",
  "header",
  "footer",
  "section",
];

const POPOVER_PROPS = {
  className: "mfb-tagname-dropdown",
};

const Tag = ({ value }) => {
  return (
    <strong
      style={{
        fontFamily: "sans-serif",
        fontWeight: 800,
        fontSize: "1.3em",
        textAlign: "center",
        letterSpacing: "-1px",
      }}
    >
      {value.toUpperCase()}
    </strong>
  );
};

/**
 * Dropdown for selecting a tagname.
 *
 * @param {WPTagNameDropdownProps} props Component props.
 *
 * @return {WPComponent} The toolbar.
 */
export function TagNameDropdown({ value, onChange }) {
  return (
    <ToolbarDropdownMenu
      popoverProps={POPOVER_PROPS}
      label={__("Change tag name", "display-a-meta-field-as-block")}
      text=<Tag value={value} />
      icon={null}
      controls={TAG_NAMES.map((tagName) => {
        {
          const isActive = tagName === value;

          return {
            key: tagName,
            title: <Tag value={tagName} />,
            label: tagName,
            isActive,
            onClick() {
              onChange(tagName);
            },
            role: "menuitemradio",
          };
        }
      })}
    />
  );
}
