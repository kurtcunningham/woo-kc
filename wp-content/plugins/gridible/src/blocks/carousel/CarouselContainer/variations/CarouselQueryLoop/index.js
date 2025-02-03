// WARN: this is exploratory code and is not used in the plugin

// import icon from './icon.svg';


const VARIATION_NAME = 'gridible/selected-post-query';

const variation = {
  name: VARIATION_NAME,
  title: 'Carousel Query Loop',
  isDefault: false,
  description: 'Display query loop results as a carousel of slides.',
  attributes: {
    namespace: VARIATION_NAME,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['namespace'],

  innerBlocks: [
    [
      'core/post-template',
      {},
      [
        ['core/post-title'],
      ],
    ]
  ]
};

export default variation;
