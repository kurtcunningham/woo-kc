import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';


function Save({ attributes }) {
	const blockProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: `swiper-slide`,
		})
	);
	return (
		<li {...blockProps} />
	);
}

export default Save;
