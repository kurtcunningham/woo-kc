/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './style.scss';
import './editor.scss';

import './blocks/container/block.js';
import './blocks/grid/index.js';
import './blocks/responsive-spacer/block.js';

import './blocks/carousel';

console.log(`[gridible] editor.js loaded`)
