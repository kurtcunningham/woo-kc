import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import {
  MenuGroup,
  MenuItemsChoice,
  PanelBody,
  PanelRow,
} from '@wordpress/components';
import { getLayouts } from './constants.js';
import usePreviewDevice from './preview-device';

/**
 * Stylesheet dependencies
 */
import './editor.scss';


function ResponsiveControlsPanel({title, children}) {
  const [previewDevice, setPreviewDevice] = usePreviewDevice();

  const isMobile = useViewportMatch('small', '<');
  if (isMobile) {
    return null;
  }

  return (
    <PanelBody
      title={ __(title) }
      initialOpen={ true }
    >
      <PanelRow>
        <MenuGroup className="components-button-group">
          <MenuItemsChoice
            value={previewDevice}
            onSelect={(mode) => {
              setPreviewDevice(mode);
            }}
            choices={getLayouts()}
            icon={true}
          />
        </MenuGroup>
      </PanelRow>
      {children}
    </PanelBody>
  );
}

export default ResponsiveControlsPanel;
