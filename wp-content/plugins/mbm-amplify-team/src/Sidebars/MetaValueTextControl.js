import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

function MetaValueTextControl({ label, valueKey, meta, updateMeta, type = 'text'}) {
  return (
    <TextControl
      label={__(label)}
      value={meta[valueKey] || ''}
      type={type}
      onChange={(value) => {
        updateMeta({
          ...meta,
          [valueKey]: value,
        });
      }}
    />
  );
}

export default MetaValueTextControl;
