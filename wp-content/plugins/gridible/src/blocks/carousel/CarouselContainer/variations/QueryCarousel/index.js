import icon from './icon.svg';


const VARIATION_NAME = 'query';

const variation = {
  name: VARIATION_NAME,
  title: 'Query Carousel',
  icon: icon,
  isDefault: false,
  description: 'Display query loop results as a carousel of slides.',
  attributes: {
    carouselType: VARIATION_NAME,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['carouselType'],
  innerBlocks: [
    ['core/post-template'],
  ]
};

export default variation;
