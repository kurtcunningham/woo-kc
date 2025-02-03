import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import icon from './icon.svg';


const BUTTON_BLOCK = 'core/paragraph';
const VARIATION_NAME = 'amplify-team/team-member-position-name';
const attributes = {
  amplifyVariation: VARIATION_NAME,
  metadata: {
    bindings: {
      content: {
        source: "core/post-meta",
        args: {
          key: "mbmamp_team_member_position_name"
        }
      }
    }
  }
};

registerBlockVariation(
  BUTTON_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Team Member Position',
    category: 'mbm-amplify-team',
    description: 'Team Member position or title.',
    icon,
    attributes,
    isActive: ['amplifyVariation'],
  }
);

addFilter(
  'blocks.registerBlockType',
  `${BUTTON_BLOCK}/${VARIATION_NAME}`,
  (settings, name) => {
    if (name !== BUTTON_BLOCK) {
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
