import {
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const SizingControl = ({
  size,
  sizeOptions = [],
  label = 'Size',
}) => {
  console.log(`[SizingControl] value:`, size.value)
	return (
		<SelectControl
			label={ __( label ) }
      options={sizeOptions}
			value={ size.value }
			// onChange={ size.onChange }
      onChange={(value) => {
        console.log(`[SizingControl] new value:`, value)
        size.onChange(value)
      }}
		/>
	);
}

export default SizingControl;
