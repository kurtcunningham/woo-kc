import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import {
  PanelBody,
  PanelRow,
  TextControl,
} from '@wordpress/components';
import withGuardedPostMeta from '../withGuardedPostMeta';
import useSiteSetting from '../useSiteSetting';
import HelperText from '../HelperText';
import MetaValueTextControl from '../MetaValueTextControl';
import PostAvailabilityControls from '../PostAvailabilityControls';



const postType = 'mbmamp_team_career';
export const pluginName = `${postType.replaceAll('_', '-')}-sidebar`;

function Sidebar({ meta, updateMeta }) {
  console.log('[CareerSidebar] meta:', meta);
  const isTypePostAccessAllowed = useSiteSetting('amplify_team_careers_post_access_allowed') === true;
  console.log('[CareerSidebar] isTypePostAccessAllowed:', isTypePostAccessAllowed);


  return (
    <PluginSidebar
      name={pluginName}
      title="Amplify — Team Member"
      icon="businessperson"
    >
      <PanelBody
        title={__('Team Member Details')}
        initialOpen={true}
      >
        <PanelRow>
          <MetaValueTextControl
            label="Add Job Posting URL"
            valueKey="mbmamp_team_career_job_link_url"
            meta={meta}
            updateMeta={updateMeta}
          />
          {/* <TextControl
            label={__('Add Job Posting URL')}
            value={meta.mbmamp_team_career_job_link_url}
            onChange={(value) =>
              updateMeta({
                ...meta,
                mbmamp_team_career_job_link_url: value,
              })
            }
          /> */}
        </PanelRow>
        <HelperText>Include a direct link to the website where guests can find more information about this career opportunity. This link will be automatically added to the Career Button block.</HelperText>
      </PanelBody>
      <PostAvailabilityControls
        meta={meta}
        updateMeta={updateMeta}
        isTypePostAccessAllowed={isTypePostAccessAllowed}
        postTypeLabelPlural="careers"
      />
    </PluginSidebar>
  );
}

export default withGuardedPostMeta(Sidebar, postType);
