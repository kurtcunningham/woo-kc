import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

function MetaValueToggleControl({ label, valueKey, meta, updateMeta}) {
  return (
    <ToggleControl
      label={__(label)}
      checked={meta[valueKey] || false}
      onChange={(value) => {
        updateMeta({
          ...meta,
          [valueKey]: value,
        });
      }}
    />
  );
}

export default MetaValueToggleControl;
