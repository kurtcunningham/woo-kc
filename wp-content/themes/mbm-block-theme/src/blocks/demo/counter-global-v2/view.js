/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

import {name as namespace} from './block.json';


store({
  state: {
    [namespace]: {
      counter: 0,
    },
  },
  actions: {
    [namespace]: {
      increaseCount: ({ state }) => {
        state[namespace].counter += 1;
      },
    },
  },
});
