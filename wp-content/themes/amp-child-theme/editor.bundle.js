'use strict';

function unregisterBlockTypes(blockTypeList = []) {
  blockTypeList.forEach(blockTypeSlug => {
    const blockType = wp.blocks.getBlockType(blockTypeSlug);
    if (blockType != null) {
      wp.blocks.unregisterBlockType(blockTypeSlug);
    }
  });
}
function modifyCoreBlock(blockSlug, stylesToAdd = [], stylesToRemove = []) {
  // Remove Settings
  wp.blocks.unregisterBlockStyle(blockSlug, stylesToRemove);

  // Add Settings
  // Adding after removal facilitates style replacement.
  wp.blocks.registerBlockStyle(blockSlug, stylesToAdd);
}
function modifyCoreBlocks(coreBlockMods = []) {
  coreBlockMods.forEach(blockMod => {
    if (!blockMod.blockSlug) {
      // No slug, skip this mod.
      return;
    }
    modifyCoreBlock(blockMod.blockSlug, blockMod.addStyles, blockMod.removeStyles);
  });
}

// Import blocks to register (self-registering scripts)
// import './blocks/block-name';

wp.domReady(() => {
  const disallowedBlockTypes = [];
  unregisterBlockTypes(disallowedBlockTypes);

  // Modify Core Blocks
  const coreBlockMods = [];
  modifyCoreBlocks(coreBlockMods);
});
console.log(`Child theme editor loaded!`);
//# sourceMappingURL=editor.bundle.js.map
