import {
	ButtonBlockAppender,
	DefaultBlockAppender,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

function Edit({
	clientId,
}) {
	const innerBlockCount = useSelect((select) => {
		const innerBlocks = select('core/block-editor').getBlocks(clientId);
		return innerBlocks.length;
	}, [clientId]);
	const isSlideEmpty = innerBlockCount === 0;

	const blockProps = useInnerBlocksProps(
		useBlockProps(),
		{
			renderAppender: () => {
				if (isSlideEmpty) {
					return (<ButtonBlockAppender rootClientId={ clientId } />)
				}

				return (<DefaultBlockAppender rootClientId={ clientId } />)
			},
		},
	);

	return (
		<>
			<InspectorControls>
			</InspectorControls>
			<li {...blockProps} />
		</>
	);
};

export default Edit;
