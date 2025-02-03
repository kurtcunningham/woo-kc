import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import HelperText from './HelperText';
import MetaValueToggleControl from './MetaValueToggleControl';


function PostAvailabilityControls({ meta, updateMeta, isTypePostAccessAllowed, postTypeLabelPlural }) {
  return (
    <PanelBody
        title={__('Post Availability')}
        initialOpen={false}
      >
        {isTypePostAccessAllowed ? (
          <>
            <MetaValueToggleControl
              label="Allow Post Access"
              valueKey="amplify_post_access_allowed"
              meta={meta}
              updateMeta={updateMeta}
            />
            <HelperText>
              Disabling access to this post will prevent it from being rendered as a standalone page.
            </HelperText>
          </>
        ) : (
          <>
            <HelperText>
              All {postTypeLabelPlural} are currently inaccessible as individual posts due to site settings.
            </HelperText>
          </>
        )}
      </PanelBody>
  );
}

export default PostAvailabilityControls;
