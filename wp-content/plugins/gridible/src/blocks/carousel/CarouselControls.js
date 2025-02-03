import { InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  PanelRow,
} from '@wordpress/components';


function CarouselControls(props) {
  return (
    <InspectorControls>
      <PanelBody title="Carousel">
        <PanelRow>
          <p>Carousel Controls!</p>
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  );
}

export default CarouselControls;
