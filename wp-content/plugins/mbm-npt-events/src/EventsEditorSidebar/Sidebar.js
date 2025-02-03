import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { PluginSidebar } from '@wordpress/editor';
import { useEntityProp } from '@wordpress/core-data';
import {
  PanelBody,
  TextControl,
  Notice,
} from '@wordpress/components';
import EventDatePicker from './EventDatePicker';
import {
  dbDateFormat,
  siteToUtcTime,
  utcToSiteTime,
} from '../Utils/timezone';
import { hasSiteTimezone } from '../Utils/timezone';
import { isValidDate } from '../Utils/time';
import { isValidUrl } from '../Utils/url';
import HelperText from './HelperText';


export const pluginName = 'mbm-npt-events-sidebar';


export default function Sidebar() {
  const post = select('core/editor').getCurrentPost();

  // Only proceed if post is available.
  if (post == null) {
    return null;
  }

  if (post.type !== 'mbm_npt_events') {
    return null;
  }

  const [meta, updateMeta] = useEntityProp(
    'postType',
    post.type,
    'meta',
    post.id,
  );

  console.log(`[Sidebar] meta:`, meta)

  const siteTzStartDate = isValidDate(meta.mbm_npt_events_start_date) ? utcToSiteTime(meta.mbm_npt_events_start_date) : false;
  const siteTzEndDate = isValidDate(meta.mbm_npt_events_end_date) ? utcToSiteTime(meta.mbm_npt_events_end_date) : false;
  const hasRegistrationUrl = isValidUrl(meta.mbm_npt_events_register_link_url);
  const siteTzRegDeadline = isValidDate(meta.mbm_npt_events_register_deadline_date) ? utcToSiteTime(meta.mbm_npt_events_register_deadline_date) : false;

  const dateChangeHandler = (metaKey) => (newDate) => {
    // Convert site time to UTC time
    let newDateSerialized = '';
    if (isValidDate(newDate)) {
      newDateSerialized = dbDateFormat(siteToUtcTime(newDate));
    }

    updateMeta({
      ...meta,
      [metaKey]: newDateSerialized,
    });

    // dispatch('core/notices').createNotice(
    //   'warning', // Can be one of: success, info, warning, error.
    //   'This is a warning notice.', // Text string to display.
    //   {
    //     isDismissible: true, // Whether the user can dismiss the notice.
    //     // Any actions the user can perform.
    //     // actions: [
    //     //   {
    //     //     url: 'https://example.com',
    //     //     label: 'Learn more',
    //     //   },
    //     // ],
    //   }
    // );
  };

  return (
    <PluginSidebar
      name={pluginName}
      title="Amplify — Events"
      icon="calendar-alt"
    >
      {!hasSiteTimezone() && (
        <Notice status="warning" isDismissible={false}>
          The site timezone is not set. Please set the timezone in the General Settings. <a href="/wp-admin/options-general.php">Set your website's timezone.</a>
        </Notice>
      )}
      <PanelBody
        title={ __( 'Event Registration Details' ) }
				initialOpen={ true }
      >
        <>
          <TextControl
            label={__('Add Registration URL', 'mbm-npt-events')}
            value={meta.mbm_npt_events_register_link_url}
            onChange={(value) =>
              updateMeta({
                ...meta,
                mbm_npt_events_register_link_url: value,
              })
            }
          />
        </>
        <HelperText>
          Include a direct link to the website where guests can register for the event. This link will be automatically added to the Event Registration Button block.
        </HelperText>
        {hasRegistrationUrl && (
          <>
            <EventDatePicker
              label="Registration Deadline"
              date={siteTzRegDeadline}
              onChange={dateChangeHandler('mbm_npt_events_register_deadline_date')}
              otherDates={[siteTzStartDate, siteTzEndDate]}
            />
            <HelperText>
              The optional registration deadline will disable the registration link after the specified date and time.
            </HelperText>
          </>
        )}
      </PanelBody>
      <PanelBody
        title={ __( 'Event Information' ) }
				initialOpen={ true }
      >
        <EventDatePicker
          label="Start Date & Time"
          date={siteTzStartDate}
          maximumDate={siteTzEndDate}
          onChange={dateChangeHandler('mbm_npt_events_start_date')}
          otherDates={[siteTzRegDeadline, siteTzEndDate]}
        />
        <EventDatePicker
          label="End Date & Time"
          date={siteTzEndDate}
          minimumDate={siteTzStartDate}
          onChange={dateChangeHandler('mbm_npt_events_end_date')}
          otherDates={[siteTzRegDeadline, siteTzStartDate]}
        />
      </PanelBody>
    </PluginSidebar>
  );
}
