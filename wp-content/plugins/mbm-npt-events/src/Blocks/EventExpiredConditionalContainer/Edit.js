import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	SelectControl,
} from '@wordpress/components';


function EditControls({
}) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) } 
				opened={true}
			>
				{/* Placeholder for possible expanding to support alternative container block tag names. */}
				{/* <PanelRow>
					<SelectControl
						label={__('HTML Element')}
						options={[
							{ label: 'Default (<div>)', value: 'div' },
						]}
						value={tagName}
						onChange={onSelectTagName}
					/>
				</PanelRow> */}
			</PanelBody>
		</InspectorControls>
	);
}

function Edit({
	attributes,
}) {
	const {
		tagName,
	} = attributes;
	const TagName = tagName;

	return (
		<>
			{/* Currently don't have any edit controls for this block. */}
			{/* <EditControls
				showMode={showMode}
				onSelectShowMode={(showMode) => setAttributes({ showMode })}
			/> */}

			<TagName {...useInnerBlocksProps(useBlockProps())} />
		</>
	);
};

export default Edit;
