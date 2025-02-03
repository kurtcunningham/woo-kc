import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import {
  Panel,
  PanelBody,
  PanelRow,
  TextControl,
} from '@wordpress/components';
import withGuardedPostMeta from '../withGuardedPostMeta';
import HelperText from '../HelperText';
import useSiteSetting from '../useSiteSetting';
import MetaValueTextControl from '../MetaValueTextControl';
import PostAvailabilityControls from '../PostAvailabilityControls';

const postType = 'mbmamp_team_member';
export const pluginName = `${postType.replaceAll('_', '-')}-sidebar`;

function Sidebar({ meta, updateMeta }) {
  console.log('[TeamMemberSidebar] meta:', meta);
  const isTypePostAccessAllowed = useSiteSetting('amplify_team_team_post_access_allowed') === true;
  console.log('[TeamMemberSidebar] isTypePostAccessAllowed:', isTypePostAccessAllowed);

  return (
    <PluginSidebar
      name={pluginName}
      title="Amplify — Team Member"
      icon="groups"
    >
      <PanelBody
        title={__('General Information')}
        initialOpen={true}
      >
        <PanelRow>
          <MetaValueTextControl
            label="Position/Title"
            valueKey="mbmamp_team_member_position_name"
            meta={meta}
            updateMeta={updateMeta}
          />
        </PanelRow>
        <HelperText>
          The title or position of this team member will be displayed in either a template or template part. It will not be used as a sort or filter option.
        </HelperText>
      </PanelBody>
      <PanelBody
        title={__('Contact Info')}
        initialOpen={false}
      >
        <PanelRow>
          <MetaValueTextControl
            label="Contact Email"
            valueKey="mbmamp_team_member_contact_email"
            type="email"
            meta={meta}
            updateMeta={updateMeta}
          />
        </PanelRow>
        <PanelRow>
          <MetaValueTextControl
            label="Contact Phone"
            valueKey="mbmamp_team_member_contact_phone"
            type="tel"
            meta={meta}
            updateMeta={updateMeta}
          />
        </PanelRow>
        <HelperText>
          By adding contact information, users will be able to directly message or connect with this team member. If left blank, these fields will not be displayed.
        </HelperText>
      </PanelBody>
      <PanelBody
        title={__('Social Links')}
        initialOpen={false}
      >
        <PanelRow>
          <MetaValueTextControl
            label="LinkedIn URL"
            valueKey="mbmamp_team_member_social_linkedin_url"
            type="url"
            meta={meta}
            updateMeta={updateMeta}
          />
        </PanelRow>
        <PanelRow>
          <MetaValueTextControl
            label="X (Twitter) URL"
            valueKey="mbmamp_team_member_social_xtwitter_url"
            type="url"
            meta={meta}
            updateMeta={updateMeta}
          />
        </PanelRow>
        <HelperText>
          By adding social media links, users will be able to connect with this team member. If left blank, these fields will not be displayed.
        </HelperText>
      </PanelBody>
      <PostAvailabilityControls
        meta={meta}
        updateMeta={updateMeta}
        isTypePostAccessAllowed={isTypePostAccessAllowed}
        postTypeLabelPlural="team members"
      />
    </PluginSidebar>
  );
}

export default withGuardedPostMeta(Sidebar, postType);
