import { Fragment } from '@wordpress/element';
import {
	getColorClassName,
	__experimentalUseGradient,
	__experimentalGetGradientClass,
	__experimentalGetGradientObjectByGradientValue,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
  withColors,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
  BackgroundImagePanel,
  attributes as backgroundAttributes
} from './background-image';


const backgroundColorKey = 'backgroundColor';

export const attributes = {
  [backgroundColorKey]: {
    type: 'string',
    default: null,
  },
  customBackgroundColor: {
    type: 'string',
  },
  gradient: {
    type: 'string',
    default: null,
  },
  customGradient: {
    type: 'string',
    default: null,
  },
  ...backgroundAttributes,
};

export const withBackgroundColor = withColors(backgroundColorKey);

export const BackgroundControls = (props) => {
  const {
		backgroundColor,
		setBackgroundColor,
  } = props;
	const {
		gradientClass,
		gradientValue,
		setGradient,
	} = __experimentalUseGradient();

  return (
    <Fragment>
			<PanelColorGradientSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ true }
				settings={ [
					{
						colorValue: backgroundColor.color,
						gradientValue,
						onColorChange: setBackgroundColor,
						onGradientChange: setGradient,
						label: __( 'Background Color' ),
					},
				] }
			>
			</PanelColorGradientSettings>
			<BackgroundImagePanel {...props} />
    </Fragment>
  );
};