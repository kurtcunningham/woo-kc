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
  const disallowedBlockTypes = [
  // Text
  'core/media-text', 'core/verse',
  // Design & Theme
  // FIXME: these should be disabled by Gridible, not the theme.
  'core/columns', 'core/spacer',
  // Site Comments
  'core/comments', 'core/latest-comments'];
  unregisterBlockTypes(disallowedBlockTypes);

  // Modify Core Blocks
  const coreBlockMods = [
  // Button
  {
    blockSlug: 'core/button',
    removeStyles: ['default', 'outline', 'squared', 'fill'],
    addStyles: [{
      name: 'default',
      label: 'Default',
      isDefault: true
    }, {
      name: 'outline',
      label: 'Outline'
    }, {
      name: 'link',
      label: 'Link'
    }]
  },
  // Separator
  {
    blockSlug: 'core/separator',
    removeStyles: ['default', 'wide', 'dots'],
    addStyles: [{
      name: 'default',
      label: 'Default',
      isDefault: true
    }, {
      name: 'vertical',
      label: 'Vertical'
    }]
  },
  // Social Links
  {
    blockSlug: 'core/social-links',
    removeStyles: ['default', 'pill-shape', 'logos-only'],
    addStyles: [{
      name: 'default',
      label: 'Default',
      isDefault: true
    }, {
      name: 'square',
      label: 'Square'
    }, {
      name: 'logos-only',
      label: 'Logos Only'
    }]
  },
  // Social Sharing Links
  {
    blockSlug: 'outermost/social-sharing',
    removeStyles: ['default', 'pill-shape', 'logos-only'],
    addStyles: [{
      name: 'default',
      label: 'Default',
      isDefault: true
    }, {
      name: 'square',
      label: 'Square'
    }, {
      name: 'logos-only',
      label: 'Logos Only'
    }]
  },
  // Table
  {
    blockSlug: 'core/table',
    removeStyles: ['stripes']
  },
  // Quote
  {
    blockSlug: 'core/quote',
    removeStyles: ['plain']
  }];
  modifyCoreBlocks(coreBlockMods);
});
//# sourceMappingURL=editor.bundle.js.map
