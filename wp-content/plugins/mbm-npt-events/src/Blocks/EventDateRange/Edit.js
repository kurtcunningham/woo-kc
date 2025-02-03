import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import dayjs from 'dayjs';
import {
  utcToSiteTime,
} from '../../Utils/timezone';


function Edit({
	context,
}) {
	// console.log(`[Edit] context:`, context)
	const {postType, postId} = context;

	const hasPostContext = postType != null && postId != null;
	let content = `No event date has been provided`;
	if (!hasPostContext) {
		// This shouldn't happen...
		content = `Fooday, Foo 37 | 37:88 XM XT`;
	} else {
		const [meta, updateMeta] = useEntityProp(
			'postType',
			postType,
			'meta',
			postId,
		);
	
		const startDateRaw = meta?.mbm_npt_events_start_date || '';
		
		if (dayjs(startDateRaw).isValid()) {
			const startDate = dayjs.tz(startDateRaw, 'UTC');
			if (startDate.isValid()) {
				const now = dayjs();
				const siteStartDate = utcToSiteTime(startDate);
				const isFuture = now.diff(siteStartDate) < 0;
				
				const formatString = isFuture
					? 'dddd, MMMM D [|] h:mm A'
					: 'MMMM D, YYYY';
			
				content = siteStartDate.format(formatString);
			}
		}
	}

	return (
		<>
			<p
				{...useBlockProps()}
			>
				{content}
			</p>
		</>
	);
};

export default Edit;
