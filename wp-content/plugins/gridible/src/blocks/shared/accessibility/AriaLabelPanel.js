import {
	PanelRow,
  TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const ariaLabelParser = (props) => {
  if (props.attributes && props.attributes.ariaLabel) {
    return {'aria-label': props.attributes.ariaLabel};
  }

  return {};
};

export const ariaLabelAttribute = {
  ariaLabel: {
    type: 'string',
    default: undefined,
  }
};

export const AriaLabelPanel = ({
  attributes,
  setAttributes,
}) => {
  return (
    <PanelRow>
      <TextControl
        label={ __( 'ARIA Label' ) }
        value={ attributes.ariaLabel }
        onChange={(value) => setAttributes({ariaLabel: value})}
      />
    </PanelRow>
  )
};
