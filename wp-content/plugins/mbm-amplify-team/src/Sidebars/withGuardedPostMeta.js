import { select } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';


const withGuardedPostMeta = (BaseComponent, customPostType) => {
  return function WithGuardedPostMeta(props) {
    const post = select('core/editor').getCurrentPost();
  
    // Only proceed if post is available.
    if (post == null) {
      return null;
    }
  
    if (post.type !== customPostType) {
      return null;
    }
  
    const [meta, updateMeta] = useEntityProp(
      'postType',
      post.type,
      'meta',
      post.id,
    );
  
    // console.debug(`[Sidebar ${customPostType}] meta:`, meta)

    return (
      <BaseComponent
        post={post}
        meta={meta}
        updateMeta={updateMeta}
        {...props}
      />
    );
  }
}

export default withGuardedPostMeta;
