import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import icon from './icon.svg';


const ROOT_BLOCK = 'core/button';
const VARIATION_NAME = 'event-registration-button';

registerBlockVariation(
  ROOT_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Event Registration Button',
    category: 'mbm-npt-events',
    icon,
    attributes: {
      eventRegistrationButton: VARIATION_NAME,
      text: 'Register for Event',
    },
    isActive: ['eventRegistrationButton'],
  }
);

addFilter(
  'blocks.registerBlockType',
  `${ROOT_BLOCK}/${VARIATION_NAME}`,
  (settings, name) => {
    if (name !== ROOT_BLOCK) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        eventRegistrationButton: {
          type: 'string',
          default: null,
        }
      }
    };
  }
);
