import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import CarouselControls from '../CarouselControls';

const ROOT_BLOCK = 'core/gallery';
const VARIATION_NAME = 'mbm-gallery-slider';


registerBlockVariation(
  ROOT_BLOCK,
  {
    name: VARIATION_NAME,
    title: 'MBM Gallery Slider',
    // scope: ['block', 'inserter', 'transform'],
    scope: ['block', 'inserter'],
    attributes: {
      mbmVariation: VARIATION_NAME,
    },
    isActive: ['mbmVariation'],
  }
);

addFilter(
  'blocks.registerBlockType',
  `${ROOT_BLOCK}/${VARIATION_NAME}/registerBlockType`,
  (settings, name) => {
    if (name !== ROOT_BLOCK) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        mbmVariation: {
          type: 'string',
          default: null,
        }
      }
    };
  }
);

addFilter(
  'editor.BlockEdit',
  `${ROOT_BLOCK}/${VARIATION_NAME}/BlockEdit`,
  (BlockEdit) => (props) => {
    const {name, attributes} = props;
  
    const isCorrectBlock = name === ROOT_BLOCK;
    const isCarousel = attributes?.mbmVariation === VARIATION_NAME;
    if (!isCorrectBlock || !isCarousel) {
      return <BlockEdit {...props} />;
    }

    // console.log(`[Gallery editor.BlockEdit] props:`, props)
    
    return (
      <>
        <BlockEdit {...props} />
        <CarouselControls />
      </>
    );
  }
);

addFilter(
  'editor.BlockListBlock',
  `${ROOT_BLOCK}/${VARIATION_NAME}/BlockListBlock`,
  (BlockListBlock) => (props) => {
    const {name, attributes} = props;
  
    const isCorrectBlock = name === ROOT_BLOCK;
    const isCarousel = attributes?.mbmVariation === VARIATION_NAME;
    if (!isCorrectBlock || !isCarousel) {
      return <BlockListBlock {...props} />;
    }

    const wrapperProps = {
      ...props,
      className: `${(props?.className) ? props.className : ''} swiper`.trim(),
    };

    // console.log(`[Gallery editor.BlockListBlock] props:`, props)
    
    return (
      <>
        <BlockListBlock
          {...wrapperProps} 
        />
      </>
    );
  }
);

addFilter(
  'blocks.getSaveElement',
  `${ROOT_BLOCK}/${VARIATION_NAME}/getSaveElement`,
  (element, blockType, attributes) => {
    // skip if element is undefined
    if (!element) {
      return;
    }

    // Only apply to blocks with our variation.
    if (blockType.name !== ROOT_BLOCK || attributes?.mbmVariation !== VARIATION_NAME) {
      return element;
    }

    // console.log(`[getSaveElement] Found core/gallery with MBM variation:`, element, blockType, attributes)

    // This... actually works.
    element.props[`data-wp-interactive`]=`mbmCarouselGallery`;
    element.props[`data-wp-init`]=`callbacks.init`;

    const elementProps = element.props;
    const {children} = elementProps;
    
    elementProps.children = (
      <div class="swiper-wrapper">{children}</div>
    );
    
    return element;
  }
);

console.log(`Gallery hooks registered`)
