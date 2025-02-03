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
	const namespace = 'demo/counter-js';

	/*
		WARN: this is kinda pointless. While the interactivity doesn't raise any
			errors, it also doesn't work.
	*/

	return (
		<>
			<div
				{...useBlockProps()}
				data-wp-interactive
				data-wp-context={JSON.stringify({ [namespace]: { counter: 0 } })}
				data-wp-effect={`effects.${namespace}.logCounter`}
			>
				<h6>JS Counter, JS Store</h6>
				<p>Counter: <span data-wp-text={`context.${namespace}.counter`}>???</span></p>
				<button
					data-wp-on--click={`actions.${namespace}.increaseCount`}
				>Increase</button>
			</div>
		</>
	);
};

function SaveComponent({

}) {
	const namespace = 'demo/counter-js';

	return (
		<>
			<div
				{...useBlockProps.save()}
				data-wp-interactive
				data-wp-context={JSON.stringify({ [namespace]: { counter: 0 } })}
				data-wp-effect={`effects.${namespace}.logCounter`}
			>
				<h6>JS Counter, JS Store</h6>
				<p>Counter: <span data-wp-text={`context.${namespace}.counter`}>???</span></p>
				<button
					data-wp-on--click={`actions.${namespace}.increaseCount`}
				>Increase</button>
			</div>
		</>
	);
}

// function SaveComponent({
// }) {

// 	return (
// 		<>
// 			<div
// 				{...useBlockProps.save()}
// 			>
// 				<p>Placeholder</p>
// 			</div>
// 		</>
// 	);
// }

registerBlockType(
	blockDef,
	{
		edit: EditComponent,
		save: SaveComponent,
	}
);
