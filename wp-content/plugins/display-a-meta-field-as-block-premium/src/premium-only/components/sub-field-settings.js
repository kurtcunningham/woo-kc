/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextareaControl, BaseControl, Button } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */

/**
 * Display the general settings
 *
 * @param {Object}
 * @returns
 */
export const SubFieldSettings = ({
  fieldPath,
  setFieldPath,
  fieldSettings,
  isEditable = true,
  isEdit,
  setIsEdit,
}) => {
  const [tmpPath, setTmpPath] = useState(fieldPath);
  return (
    <BaseControl className="mfb-field-settings">
      {isEditable && (
        <div className="field-path">
          <div className="actions">
            <span className="attr-label">
              {__("Path: ", "display-a-meta-field-as-block")}
            </span>
            {isEdit ? (
              <div className="buttons">
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => {
                    setFieldPath(tmpPath);
                    setIsEdit(false);
                  }}
                >
                  {__("Save", "display-a-meta-field-as-block")}
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    setTmpPath(fieldPath);
                    setIsEdit(false);
                  }}
                >
                  {__("Cancel", "display-a-meta-field-as-block")}
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="small"
                onClick={() => setIsEdit(true)}
              >
                {__("Edit path", "display-a-meta-field-as-block")}
              </Button>
            )}
          </div>
          {isEdit ? (
            <TextareaControl
              autoComplete="off"
              label=""
              rows={2}
              value={tmpPath}
              onChange={setTmpPath}
            />
          ) : (
            <BaseControl className="field-path-value">
              <span className="attr-value">{fieldPath}</span>
            </BaseControl>
          )}
        </div>
      )}
      {!!fieldSettings?.type && (
        <>
          <div className="field-name">
            <span className="attr-label">
              {__("Name: ", "display-a-meta-field-as-block")}
            </span>
            <span className="attr-value">{fieldSettings?.name}</span>
          </div>
          <div className="field-type">
            <span className="attr-label">
              {__("Type: ", "display-a-meta-field-as-block")}
            </span>
            <span className="attr-value">{fieldSettings?.type}</span>
          </div>
        </>
      )}
    </BaseControl>
  );
};
