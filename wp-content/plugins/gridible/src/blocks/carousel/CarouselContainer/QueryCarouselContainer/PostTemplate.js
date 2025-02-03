import { addFilter } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';


const ROOT_BLOCK = 'core/post-template';
const VARIATION_NAME = 'gridible-query-carousel-post-template';


/* addFilter(
  'editor.BlockListBlock',
  `${ROOT_BLOCK}/${VARIATION_NAME}/BlockListBlock`,
  (BlockListBlock) => (props) => {
    const {name, attributes} = props;
  
    const isCorrectBlock = name === ROOT_BLOCK;
    // const isCarousel = attributes?.mbmCarousel === true;
    const isCarousel = true;
    if (!isCorrectBlock || !isCarousel) {
      return <BlockListBlock {...props} />;
    }

    console.log(`[PostTemplate editor.BlockListBlock] props:`, props)

    // return <BlockListBlock {...props} />;

    const wrapperProps = {
      ...props,
      className: `${(props?.className) ? props.className : ''} foo-bar-baz`.trim(),
    };
    console.log(`[PostTemplate editor.BlockListBlock] wrapper props:`, wrapperProps)
    
    return (
      <>
        <BlockListBlock {...wrapperProps} />
      </>
    );
  }
);

addFilter(
  'editor.BlockEdit',
  `${ROOT_BLOCK}/${VARIATION_NAME}/BlockEdit`,
  (BlockEdit) => (props) => {
    const {name} = props;
    
    if (name !== ROOT_BLOCK) {
      return <BlockEdit {...props} />;
    }
    console.log(`[PostTemplate editor.BlockEdit] Found our block!`)
  
    console.log(`[PostTemplate editor.BlockEdit] props:`, props)
    // const {context, setAttributes} = props;
    // const mbmVariation = context?.mbmVariation;
    // console.log(`[Image editor.BlockEdit] mbmVariation:`, mbmVariation)
    // useEffect(() => {
    //   if (typeof mbmVariation === 'string') {
    //     // console.log(`[Image editor.BlockEdit] Setting attribute mbmCarousel`)
    //     setAttributes({mbmCarousel: true});
    //   }
    // }, [mbmVariation]);
    
    return (
      <>
        <BlockEdit {...props} />
      </>
    );
  }
);

console.log(`Carousel Container - Post Template hooks registered`)
 */
