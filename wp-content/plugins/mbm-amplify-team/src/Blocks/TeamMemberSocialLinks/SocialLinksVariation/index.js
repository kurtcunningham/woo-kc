import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import icon from './icon.svg';


const ROOT_BLOCK = 'core/social-links';
const VARIATION_NAME = 'amplify-team/team-member-social-links';

registerBlockVariation(
  ROOT_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Team Member Social Links',
    category: 'mbm-amplify-team',
    icon,
    attributes: {
      amplifyVariation: VARIATION_NAME,
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [
      [
        'core/social-link',
        {
          service: 'x',
          url: 'https://placeholder.com/',
        },
      ],
      [
        'core/social-link',
        {
          service: 'linkedin',
          url: 'https://placeholder.com/',
        },
      ],
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
