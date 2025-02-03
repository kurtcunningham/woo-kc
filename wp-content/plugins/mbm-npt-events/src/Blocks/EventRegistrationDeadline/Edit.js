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
	// console.log(`[EventRegDeadline.Edit] context:`, context)
	const {postType, postId} = context;

	const hasPostContext = postType != null && postId != null;
	let content = `No event date has been provided`;
	if (!hasPostContext) {
		// This shouldn't happen...
		content = `Fooday, Foo 37 | 37:88 XM XYZ`;
	} else {
		const [meta, updateMeta] = useEntityProp(
			'postType',
			postType,
			'meta',
			postId,
		);
	
		// console.log(`[EventRegDeadline.Edit] meta:`, meta)
		const dateRaw = meta?.mbm_npt_events_register_deadline_date || '';
		
		if (dayjs(dateRaw).isValid()) {
			const deadlineDate = dayjs.tz(dateRaw, 'UTC');
			if (deadlineDate.isValid()) {
				const now = dayjs();
				const siteDeadlineDate = utcToSiteTime(deadlineDate);
				const isFuture = now.diff(siteDeadlineDate) < 0;
				
				const formatString = isFuture
					? 'dddd, MMMM D [|] h:mm A'
					: 'MMMM D, YYYY';
			
				content = siteDeadlineDate.format(formatString);
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
