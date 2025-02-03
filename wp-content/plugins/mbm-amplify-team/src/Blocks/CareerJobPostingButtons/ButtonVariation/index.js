import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import icon from './icon.svg';


const BUTTON_BLOCK = 'core/button';
const VARIATION_NAME = 'amplify-team/career-job-posting-button';
export const attributes = {
  amplifyVariation: VARIATION_NAME,
  text: 'Job Posting',
  linkTarget: '_blank',
  metadata: {
    bindings: {
      url: {
        source: "core/post-meta",
        args: {
          key: "mbmamp_team_career_job_link_url"
        }
      }
    }
  }
};

registerBlockVariation(
  BUTTON_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Career Job Posting Button',
    category: 'mbm-amplify-team',
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
