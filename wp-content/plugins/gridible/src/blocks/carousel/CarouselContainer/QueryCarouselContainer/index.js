import { registerBlockType } from '@wordpress/blocks';
import blockDef from './block.json';
import icon from './icon.svg';
import Edit from '../common/Edit';
import Save from '../common/Save';
import buildAttributes from '../common/attributes';

registerBlockType(
	blockDef,
	{
		icon,
		edit: Edit,
		save: Save,
		attributes: buildAttributes('query'),
	}
);
