/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

const namespace = 'demo/counter-js';

store({
  actions: {
    [namespace]: {
      increaseCount: ({ context }) => {
        context[namespace].counter = !(context[namespace].counter) 
          ? 1 
          : context[namespace].counter + 1;
      },
    },
  },
  effects: {
    [namespace]: {
      logCounter: ({ context }) => {
        console.log(`Count is: ${context[namespace].counter}`);
      },
    },
  },
});
