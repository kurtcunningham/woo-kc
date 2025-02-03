import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import icon from './icon.svg';
import { attributes as childButtonAttributes } from '../ButtonVariation';


const ROOT_BLOCK = 'core/buttons';
const VARIATION_NAME = 'amplify-team/career-job-posting-buttons';

registerBlockVariation(
  ROOT_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Career Job Posting Buttons',
    category: 'mbm-amplify-team',
    icon,
    attributes: {
      amplifyVariation: VARIATION_NAME,
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [
      [
        'core/button',
        childButtonAttributes,
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
        amplifyVariation: {
          type: 'string',
          default: null,
        },
      }
    };
  }
);
