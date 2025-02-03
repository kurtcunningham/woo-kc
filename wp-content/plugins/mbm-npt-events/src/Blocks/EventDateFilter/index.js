import { addFilter } from '@wordpress/hooks';
import {
  QUERY_BLOCK_SLUG,
  withExtraControls,
  attributesFilter,
} from './EventDateFilter';


// Registration
addFilter(
  'editor.BlockEdit', 
  QUERY_BLOCK_SLUG, 
  withExtraControls
);

addFilter(
  'blocks.registerBlockType',
  'amplify-events/query-loop-event-date-filter',
  attributesFilter
);
