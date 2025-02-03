import { registerBlockType } from '@wordpress/blocks';
import blockDef from './block.json';
import icon from './icon.svg';
import Edit from './Edit';


registerBlockType(
	blockDef,
	{
		icon,
		edit: Edit,
	}
);
