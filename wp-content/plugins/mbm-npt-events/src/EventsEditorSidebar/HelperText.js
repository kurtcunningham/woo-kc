import { __ } from '@wordpress/i18n';
import { PanelRow } from '@wordpress/components';


const helperTextStyles = {
  color: '#757575',
};

export default function HelperText({ children }) {
  return (
    <PanelRow>
      <p className="inspector-text-control-1__help" style={helperTextStyles}>
        {children}
      </p>
    </PanelRow>
  );
}
