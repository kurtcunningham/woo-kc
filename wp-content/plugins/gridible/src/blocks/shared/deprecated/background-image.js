import {
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export const attributes = {
  imageId: {
    type: 'number',
    default: undefined,
  },
  imageAlt: {
    type: 'string',
    default: undefined,
  },
  imageUrl: {
    type: 'string',
    default: undefined,
  },
};

const onChangeMedia = (setAttributes, media) => {
  if (media) {
    setAttributes({
      imageAlt: media.alt,
      imageId: media.id,
      imageUrl: media.url,
    });
  } else {
    setAttributes({
      imageAlt: null,
      imageId: null,
      imageUrl: null,
    });
  }
};

export const BackgroundImagePanel = ({
  attributes = {},
  setAttributes,
}) => {
  const {
    imageId,
    imageUrl,
  } = attributes;

  return (
    <PanelBody
			title={ __( 'Background Image' ) }
			initialOpen={false}
		>
      {!!imageUrl ? (
        <Fragment>
          <PanelRow>
            <img
              src={ imageUrl }
            />
          </PanelRow>
          <PanelRow>
            <Button
              onClick={() => onChangeMedia(setAttributes, null)}
            >
              { __( 'Remove Image' ) }
            </Button>
          </PanelRow>
        </Fragment>
      ) : (
        <PanelRow>
          <MediaPlaceholder
            accept="image/*"
            allowedTypes={['image']}
            onSelect={(media) => onChangeMedia(setAttributes, media)}
            multiple={false}
            // labels = { { title: 'BG Image' } }
            disableDropZone={false}
            // This seems pointless...
            // value={({id: imageId})}
          />
        </PanelRow>
      )}
    </PanelBody>
  );
};
