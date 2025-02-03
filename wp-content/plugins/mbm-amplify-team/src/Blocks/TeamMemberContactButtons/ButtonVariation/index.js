import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  SelectControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import icon from './icon.svg';


const BUTTON_BLOCK = 'core/button';
export const VARIATION_NAME = 'amplify-team/team-member-contact-button';
const KEY_EMAIL = 'mbmamp_team_member_contact_email';
const KEY_PHONE = 'mbmamp_team_member_contact_phone';

const prefixes = {
  [KEY_EMAIL]: 'mailto',
  [KEY_PHONE]: 'tel',
};

function buildMetadata(metaKey) {
  return {
    bindings: {
      url: {
        source: "amplify-team/team-member-contact-button-url",
        args: {
          key: metaKey,
          prefix: prefixes[metaKey],
        }
      },
      text: {
        source: "core/post-meta",
        args: {
          key: metaKey,
        }
      },
    }
  };
}

function buildVariation(metaKey) {
  return {
    amplifyVariation: VARIATION_NAME,
    metadata: buildMetadata(metaKey),
    contactMetaKey: metaKey,
  };
}

export const emailVarAttributes = buildVariation(
  KEY_EMAIL,
);
export const phoneVarAttributes = buildVariation(
  KEY_PHONE,
);

registerBlockVariation(
  BUTTON_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'Team Member Contact Button',
    category: 'mbm-amplify-team',
    icon,
    attributes: emailVarAttributes,
    isActive: ['amplifyVariation'],
  }
);

addFilter(
  'editor.BlockEdit',
  BUTTON_BLOCK,
  (BlockEdit) => (props) => {
    // Skip adding controls if this isn't a Contact Button variation.
    if (
      (props?.name !== BUTTON_BLOCK) ||
      (props?.attributes?.amplifyVariation !== VARIATION_NAME)
    ) {
      return (<BlockEdit {...props} />);
    }

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title="Team Member Contact">
            <PanelRow>
              <SelectControl
                label={__('Contact Field')}
                options={[
                  { label: 'Email', value: KEY_EMAIL },
                  { label: 'Phone', value: KEY_PHONE },
                ]}
                value={props?.attributes?.contactMetaKey}
                onChange={(contactMetaKey) => {
                  props.setAttributes({
                    contactMetaKey,
                    metadata: buildMetadata(contactMetaKey),
                  });
                }}
                help={`Select which contact field to reference.`}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </>
    );
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
        contactMetaKey: {
          type: 'string',
          default: KEY_EMAIL,
        },
      }
    };
  }
);
