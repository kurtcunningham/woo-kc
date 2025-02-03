/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

const namespace = 'counter-php-store-v1';

store({
  actions: {
    [namespace]: {
      increaseCount: ({ state }) => {
        state[namespace].counter += 1;
      },
    },
  },
  // effects: {
  //   [namespace]: {
  //     logCounter: ({ context }) => {
  //       console.log(`Count is: ${context[namespace].counter}`);
  //     },
  //   },
  // },
});
