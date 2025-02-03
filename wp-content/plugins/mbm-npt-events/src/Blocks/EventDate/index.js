import { registerBlockType } from '@wordpress/blocks';
import blockDef from './block.json';
import Edit from './Edit';
import {
	default as StartDateVariation,
	icon,
} from './StartDateVariation';
import EndDateVariation from './EndDateVariation';

registerBlockType(
	blockDef,
	{
		icon,
		edit: Edit,
		variations: [
			StartDateVariation,
			EndDateVariation,
		],
	}
);
