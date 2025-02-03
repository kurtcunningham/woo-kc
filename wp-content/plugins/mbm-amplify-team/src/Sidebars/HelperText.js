import { PanelRow } from '@wordpress/components';
import { helperTextStyles } from './styles';


export default function HelperText({ children }) {
  return (
    <PanelRow>
      <p className="inspector-text-control-1__help" style={helperTextStyles}>
        {children}
      </p>
    </PanelRow>
  );
}
