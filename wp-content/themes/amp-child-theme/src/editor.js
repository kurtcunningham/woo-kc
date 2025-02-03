import domReady from '@wordpress/dom-ready';
import {
  unregisterBlockTypes,
  modifyCoreBlocks,
} from './blocks/block-support';

/**
 * All JS and CSS that's specific to the Gutenberg editor.
 */

// Site editor styles
import './styles/_editor.scss';

// Import blocks to register (self-registering scripts)
// import './blocks/block-name';


domReady(() => {
  const disallowedBlockTypes = [
  ];

  unregisterBlockTypes(disallowedBlockTypes);


  // Modify Core Blocks
  const coreBlockMods = [
  ];

  modifyCoreBlocks(coreBlockMods);
});

console.log(`Child theme editor loaded!`)
