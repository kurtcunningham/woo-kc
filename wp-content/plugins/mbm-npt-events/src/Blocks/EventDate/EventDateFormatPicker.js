/*
	This is a clone of the stock DateFormatPicker.
	https://github.dev/WordPress/gutenberg/blob/d0a190b65cebe27652e1a4d8d38a714d624e54ad/packages/block-editor/src/components/date-format-picker/index.js#L1

	I was created because the DateFormatPicker doesn't provide enough 
	customization options (label and format set) for our needs. 
*/

import { __ } from '@wordpress/i18n';
import { useState, createInterpolateElement } from '@wordpress/element';
import {
	TextControl,
	ExternalLink,
	__experimentalVStack as VStack,
	CustomSelectControl,
} from '@wordpress/components';

import {
	dateI18n,
} from '@wordpress/date';

const exampleDate = new Date(`${new Date().getFullYear()}-10-31T13:00:00`);

function EventDateFormatPicker({
	label,
	dateFormat,
	onChange,
}) {
	const suggestedFormats = [
		'M j, Y',
		'M j, Y g:i A',
		'F j, Y',
	];
	const suggestedOptions = suggestedFormats.map((format) => ({
		key: `suggested-${format}`,
		format: format,
		name: dateI18n(format, exampleDate),
	}));

	const customOption = {
		key: 'custom',
		name: __( 'Custom' ),
		className:
			'block-editor-date-format-picker__custom-format-select-control__custom-option',
		hint: __( 'Enter your own date format' ),
	};

	const matchingSuggestedOption = suggestedOptions.find(
		(option) => option.format === dateFormat
	);

	const [ isCustom, setIsCustom ] = useState(
		() => !!dateFormat && !matchingSuggestedOption
	);

	const controlValue = isCustom
		? customOption
		: (matchingSuggestedOption ?? customOption);

	return (
		<>
			<VStack>
				<CustomSelectControl
					__next40pxDefaultSize
					label={ __( label ) }
					options={ [ ...suggestedOptions, customOption ] }
					value={controlValue}
					onChange={ ( { selectedItem } ) => {
						if ( selectedItem === customOption ) {
							setIsCustom( true );
						} else {
							setIsCustom( false );
							onChange( selectedItem.format );
						}
					} }
				/>
				{ isCustom && (
					<TextControl
						__next40pxDefaultSize
						label={ __( 'Custom format' ) }
						hideLabelFromVision
						help={ createInterpolateElement(
							__(
								'Enter a date or time <Link>format string</Link>.'
							),
							{
								Link: (
									<ExternalLink
										href={ __(
											'https://wordpress.org/documentation/article/customize-date-and-time-format/'
										) }
									/>
								),
							}
						) }
						value={ dateFormat }
						onChange={ ( value ) => onChange( value ) }
					/>
				) }
			</VStack>
		</>
	);
};

export default EventDateFormatPicker;
