import { addFilter } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';


const ROOT_BLOCK = 'core/image';
const VARIATION_NAME = 'mbm-gallery-slider';

addFilter(
  'editor.BlockEdit',
  `${ROOT_BLOCK}/${VARIATION_NAME}/BlockEdit`,
  (BlockEdit) => (props) => {
    const {name} = props;
  
    if (name !== ROOT_BLOCK) {
      return <BlockEdit {...props} />;
    }
  
    // console.log(`[Image editor.BlockEdit] props:`, props)
    const {context, setAttributes} = props;
    const mbmVariation = context?.mbmVariation;
    // console.log(`[Image editor.BlockEdit] mbmVariation:`, mbmVariation)
    useEffect(() => {
      if (typeof mbmVariation === 'string') {
        // console.log(`[Image editor.BlockEdit] Setting attribute mbmCarousel`)
        setAttributes({mbmCarousel: true});
      }
    }, [mbmVariation]);
    
    return (
      <>
        <BlockEdit {...props} />
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
    const isCarousel = attributes?.mbmCarousel === true;
    if (!isCorrectBlock || !isCarousel) {
      return <BlockListBlock {...props} />;
    }

    // console.log(`[Image editor.BlockListBlock] props:`, props)
    const wrapperProps = {
      ...props,
      className: `${(props?.className) ? props.className : ''} swiper-slide`.trim(),
    };
    // console.log(`[Image editor.BlockListBlock] wrapper props:`, wrapperProps)
    
    return (
      <>
        <BlockListBlock {...wrapperProps} />
      </>
    );
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
        mbmCarousel: {
          type: 'boolean',
          default: false,
        }
      }
    };
  }
);

addFilter(
  'blocks.getSaveContent.extraProps',
  `${ROOT_BLOCK}/${VARIATION_NAME}/extraProps`,
  (props, blockType, blockAttributes) => {
    if (blockType.name !== ROOT_BLOCK) {
      return props;
    }

    // console.log(`[Image getSaveContent.extraProps] props:`, props, ` block type:`, blockType, ` block attrs:`, blockAttributes)

    if (blockAttributes?.mbmCarousel !== true) {
      return props;
    }

    const className = `${(props?.className) ? props.className : ''} swiper-slide`.trim();

    return {
      ...props,
      className
    };
  }
);

console.log(`Image hooks registered`)
