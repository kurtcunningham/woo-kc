import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
} from '@wordpress/block-editor';
import blockDef from './block.json';


function Component({blockProps}) {
	const namespace = 'counter-php-store-v1';

	return (
		<>
			<div
				{...blockProps}
				data-wp-interactive
			>
				<h6>PHP Store Demo V1</h6>
				<p>Counter: <span data-wp-text={`state.${namespace}.counter`}>???</span></p>
				<button
					data-wp-on--click={`actions.${namespace}.increaseCount`}
				>Increase</button>
			</div>
		</>
	);
}

function EditComponent({}) {
	return (<Component blockProps={useBlockProps()} />);
};

function SaveComponent({}) {
	return (<Component blockProps={useBlockProps.save()} />);
};

registerBlockType(
	blockDef,
	{
		edit: EditComponent,
		save: SaveComponent,
	}
);
