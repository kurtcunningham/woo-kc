import { registerBlockType } from '@wordpress/blocks';
import blockDef from './block.json';
import Save from './Save';
import Edit from './Edit';
import {
	default as FutureEventVariation,
	icon,
} from './FutureEventVariation';
import PastEventVariation from './PastEventVariation';


registerBlockType(
	blockDef,
	{
		icon,
		edit: Edit,
		save: Save,
    variations: [
      FutureEventVariation,
      PastEventVariation,
    ],
	}
);

// const variationIsActive = (blockAttributes, variationAttributes) => {
// 	return blockAttributes.showMode === variationAttributes.showMode;
// };

// registerBlockVariation(
//   blockDef.name,
//   {
//     name: ONLY_FUTURE_VARIATION_NAME,
//     title: 'Event Content - Future',
//     icon: futureVariationIcon,
//     // icon: row,
//     description: 'Only show content if the event is in the future.',
//     attributes: {
//       showMode: ONLY_FUTURE_VARIATION_NAME,
//     },
//     scope: ['block', 'inserter', 'transform'],
//     isActive: variationIsActive,
//   }
// );

// registerBlockVariation(
//   blockDef.name,
//   {
//     name: ONLY_PAST_VARIATION_NAME,
//     title: 'Event Content - Past',
//     icon: pastVariationIcon,
//     // icon: stack,
//     description: 'Only show content if the event is in the past.',
//     attributes: {
//       showMode: ONLY_PAST_VARIATION_NAME,
//     },
//     scope: ['block', 'inserter', 'transform'],
//     isActive: variationIsActive,
//   }
// );

// registerBlockVariation(
//   blockDef.name,
//   {
//     name: 'event_content_foo',
//     title: 'Event Content - Foo',
//     attributes: {
//       showMode: 'foo',
//     },
//     scope: ['block', 'inserter', 'transform'],
//     isActive: variationIsActive,
//   }
// );
// registerBlockVariation(
//   blockDef.name,
//   {
//     name: 'event_content_foo',
//     title: 'Event Content - Bar',
//     attributes: {
//       showMode: 'bar',
//     },
//     scope: ['block', 'inserter', 'transform'],
//     isActive: variationIsActive,
//   }
// );
// registerBlockVariation(
//   blockDef.name,
//   {
//     name: 'event_content_foo',
//     title: 'Event Content - Baz',
//     attributes: {
//       showMode: 'baz',
//     },
//     scope: ['block', 'inserter', 'transform'],
//     isActive: variationIsActive,
//   }
// );
