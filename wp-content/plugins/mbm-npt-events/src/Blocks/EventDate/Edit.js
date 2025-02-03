import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import dayjs from 'dayjs';
import {
	dateI18n,
	getSettings as getDateSettings,
} from '@wordpress/date';
import EventDateFormatPicker from './EventDateFormatPicker';


function Edit({
	attributes,
	setAttributes,
	context,
}) {
	const defaultDateFormat = getDateSettings()?.formats?.date || 'M j, Y';
	const {
		eventDateType,
		futureDateFormat,
		pastDateFormat,
	} = attributes;
	const {
		postType, 
		postId,
	} = context;
	let dateFormat = typeof futureDateFormat === 'string' && futureDateFormat.trim() !== ''
		? futureDateFormat
		: defaultDateFormat;
	const hasPastDateFormat = typeof pastDateFormat === 'string' && pastDateFormat.trim() !== '';

	// Our default content if we can't find or format an event date.
	let content = `N/A`;

	const hasPostContext = postType != null && postId != null;
	if (hasPostContext) {
		const [meta, updateMeta] = useEntityProp(
			'postType',
			postType,
			'meta',
			postId,
		);

		const dateMetaKey = eventDateType === 'end'
			? 'mbm_npt_events_end_date'
			: 'mbm_npt_events_start_date';
	
		const dateRaw = meta?.[dateMetaKey] || '';

		if (dayjs(dateRaw).isValid()) {
			// We'll only use the past date format if that format is defined, and 
			// the date is in the past. Check for the date format first because it's
			// a faster check than the past date check.
			if (hasPastDateFormat) {
				const isDateInPast = dayjs().diff(dayjs(dateRaw)) > 0;

				if (isDateInPast) {
					dateFormat = pastDateFormat;
				}
			}
			
			content = dateI18n(dateFormat, dateRaw);
		}
	}

	return (
		<>
			<p {...useBlockProps()}>
				{content}
			</p>

			<InspectorControls>
				<PanelBody title={__('Event Date Settings')}>
					<EventDateFormatPicker
						label={__(hasPastDateFormat ? 'Future Date Format' : 'Date Format')}
						dateFormat={futureDateFormat}
						onChange={(value) => {
							console.log(`[Edit] dateFormat changed:`, value);
							setAttributes({futureDateFormat: value});
						}}
					/>
					<br/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Add custom past date format')}
						checked={hasPastDateFormat}
						onChange={(value) => {
							setAttributes({pastDateFormat: value ? futureDateFormat : null});
						}}
					/>
					{hasPastDateFormat && (
						<>
							<EventDateFormatPicker
								label={__('Past Date Format')}
								dateFormat={pastDateFormat}
								onChange={(value) => {
									console.log(`[Edit] pastDateFormat changed:`, value);
									setAttributes({pastDateFormat: value});
								}}
							/>
						</>
					)}
				</PanelBody>

				{/* 
					Warn: using the stock DateFormatPicker doesn't provide enough 
					customization options (label and format set) for our needs. 
				*/}
				{/* <PanelHeader label='Event Date Format' />
				<PanelRow>
					<DateFormatPicker
						label={__('Date Format! FOO BAR')}
						format={futureDateFormat}
						defaultFormat={defaultDateFormat}
						onChange={(value) => {
							console.log(`[Edit] dateFormat changed:`, value);
							setAttributes({futureDateFormat: value});
						}}
					/>
				</PanelRow> */}
			</InspectorControls>
		</>
	);
};

export default Edit;
