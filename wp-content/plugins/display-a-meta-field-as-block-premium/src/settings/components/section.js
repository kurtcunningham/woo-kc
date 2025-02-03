/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import "./section.scss";

export const Section = ({ title, description, children }) => {
  return (
    <div className="settings-section">
      {title && <h3 className="settings-section__title">{title}</h3>}
      {description && (
        <p className="settings-section__description">{description}</p>
      )}
      <div className="meta-box-sortables">{children}</div>
    </div>
  );
};
