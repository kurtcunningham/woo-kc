import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import icon from './icon.svg';


const ROOT_BLOCK = 'core/buttons';
const VARIATION_NAME = 'event-registration-buttons';

registerBlockVariation(
  ROOT_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Event Registration Buttons',
    category: 'mbm-npt-events',
    icon,
    attributes: {
      eventRegistrationButton: VARIATION_NAME,
    },
    isActive: ['eventRegistrationButton'],
    innerBlocks: [
      [
        "core/button",
        {
          eventRegistrationButton: 'event-registration-button',
          text: 'Register for Event'
        }
      ]
    ],
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
