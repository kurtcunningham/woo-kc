import {
  getBlockType,
  registerBlockStyle,
  unregisterBlockType,
  unregisterBlockStyle,
} from '@wordpress/blocks';


export function unregisterBlockTypes(blockTypeList = []) {
  blockTypeList.forEach((blockTypeSlug) => {
    const blockType = getBlockType(blockTypeSlug);

    if (blockType != null) {
      unregisterBlockType(blockTypeSlug);
    }
  });
}

export function modifyCoreBlock(blockSlug, stylesToAdd = [], stylesToRemove = []) {
  // Remove Settings
  unregisterBlockStyle(blockSlug, stylesToRemove);

  // Add Settings
  // Adding after removal facilitates style replacement.
  registerBlockStyle(blockSlug, stylesToAdd);
}

export function modifyCoreBlocks(coreBlockMods = []) {
  coreBlockMods.forEach((blockMod) => {
    if (!blockMod.blockSlug) {
      // No slug, skip this mod.
      return;
    }

    modifyCoreBlock(blockMod.blockSlug, blockMod.addStyles, blockMod.removeStyles);
  });
}