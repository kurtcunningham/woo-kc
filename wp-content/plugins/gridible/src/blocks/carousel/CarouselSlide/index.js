import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import blockDef from './block.json';
import icon from './icon.svg';
import Edit from './Edit';
import Save from './Save';


registerBlockType(
	blockDef,
	{
		icon,
		edit: Edit,
		save: Save,
	}
);
