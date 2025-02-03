import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { useEntityRecord } from '@wordpress/core-data';
import blockDef from './block.json';


function EditComponent({
	// context: { postType, postId },
	// attributes,
	// setAttributes,
}) {

	return (
		<>
			<p {...useBlockProps()}>
				Demo interactive... possibly a counter, I guess. Not sure at this point, really.
			</p>
		</>
	);
};

registerBlockType(
	blockDef,
	{
		edit: EditComponent,
		save: (props) => {
			return <InnerBlocks.Content />
		},
	}
);
