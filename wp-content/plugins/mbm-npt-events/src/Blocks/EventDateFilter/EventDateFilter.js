import {
  PanelBody,
  PanelRow,
  SelectControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';


export const QUERY_BLOCK_SLUG = 'core/query';

const PostExclusionControls = ({
  attributes,
  setAttributes
}) => {
  const { mbmNptEventDateFilter } = attributes;

  return (
    <PanelBody title="Event Date Filter">
      <PanelRow>
        <SelectControl
          label={__('Filter by event date')}
          options={[
            { label: 'No event date filtering (default)', value: '' },
            { label: 'Show only future events', value: 'show_only_future' },
            { label: 'Show only past events', value: 'show_only_past' },
          ]}
          value={mbmNptEventDateFilter}
          onChange={(mbmNptEventDateFilter) => setAttributes({mbmNptEventDateFilter})}
          help={`Select which events you want to be visible based on the event date.`}
        />
      </PanelRow>
    </PanelBody>
  );
};

export const withExtraControls = (BlockEdit) => (props) => {
  const { name } = props;
  const defaultControls = (<BlockEdit {...props} />);

  if (name !== QUERY_BLOCK_SLUG) {
    return defaultControls;
  }

  // Only add controls if this is an Events query.
  const queryPostType = props?.attributes?.query?.postType;
  if (queryPostType !== 'mbm_npt_events') {
    return defaultControls;
  }

  return (
    <>
      <BlockEdit {...props} />
      <InspectorControls>
        <PostExclusionControls {...props} />
      </InspectorControls>
    </>
  );
};

export const attributesFilter = (settings, name) => {
  if (name !== QUERY_BLOCK_SLUG) {
    return settings;
  }

  return {
    ...settings,
    attributes:
    {
      ...settings.attributes,
      mbmNptEventDateFilter: {
        type: 'string',
        default: '',
      }
    }
  };
}
