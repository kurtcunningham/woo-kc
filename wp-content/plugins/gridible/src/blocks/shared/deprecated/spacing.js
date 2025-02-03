import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useSetting,
	isValueSpacingPreset,
	__experimentalSpacingSizesControl as SpacingSizesControl,
} from '@wordpress/block-editor';
import {
	BaseControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

function SpacingInput( { label, onChange, isResizing, value = '' } ) {
	const spacingSizes = useSetting( 'spacing.spacingSizes' );

	const availableUnitSettings = (
		useSetting( 'spacing.units' ) || undefined
	)?.filter( ( availableUnit ) => availableUnit !== '%' );

	const units = useCustomUnits( {
		availableUnits: availableUnitSettings || [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 16, em: 1, rem: 1, vw: 1, vh: 2 },
	} );

	const handleOnChange = ( unprocessedValue ) => {
		onChange( unprocessedValue.all );
	};

	const computedValue = isValueSpacingPreset( value );

	return (
		<>
			<BaseControl>
				<SpacingSizesControl
					values={ { all: computedValue } }
					onChange={ handleOnChange }
					label={ label }
					sides={ [ 'all' ] }
					units={ units }
					allowReset={ true }
					splitOnAxis={ false }
					showSideInLabel={ true }
				/>
			</BaseControl>
		</>
	);
}

export const SpacingPanel = (props) => {
	const {
		orientation,
		setAttributes,
		height,
	} = props;

  return (
    <>
			{ orientation === 'horizontal' && (
					<SpacingInput
						label={ 'Width' }
						value={ width }
						onChange={ ( nextWidth ) =>
							setAttributes( { width: nextWidth } )
						}
					/>
			) }
			{ orientation !== 'horizontal' && (
					<SpacingInput
						label={ 'Height' }
						value={ height }
						onChange={ ( nextHeight ) =>
							setAttributes( { height: nextHeight } )
						}
					/>
			) }
    </>
  );
}
