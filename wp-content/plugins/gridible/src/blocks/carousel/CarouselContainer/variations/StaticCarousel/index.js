import icon from './icon.svg';


const VARIATION_NAME = 'static';

const exampleSlide = [
  'gridible/static-carousel-slide',
  { },
  [
    ['core/paragraph', { placeholder: 'Slide contents...' }],
  ]
];

const variation = {
  name: VARIATION_NAME,
  title: 'Static Carousel',
  icon: icon,
  isDefault: true,
  description: 'Display a pre-selected list of slides.',
  attributes: {
    carouselType: VARIATION_NAME,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['carouselType'],
  // Default to a set of carousel slides
  innerBlocks: [
    exampleSlide,
    exampleSlide,
    exampleSlide,
  ],
};

export default variation;
