/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useSettings,
	getCustomValueFromPreset,
	getSpacingPresetCssVar,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	ResizableBox
} from '@wordpress/components';
import {
	useState,
	useEffect
} from '@wordpress/element';
import {
	View
} from '@wordpress/primitives';
import {
	useSelect
} from '@wordpress/data';
import {
	registerBlockType
} from '@wordpress/blocks';

import {
	SpacerControls
} from './controls';
import {
	MIN_SPACER_SIZE
} from './constants';
import {
	VISIBILITY_ATTRIBUTE,
	vizOptionsToCssClasses
} from '../shared/responsive/visibility';


//  Import CSS.
import './editor.scss';
import blockDef from './block.json';


const icon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M20.5 5.525c0 .284-.258.525-.562.525H4.063c-.328 0-.562-.241-.562-.525 0-.306.234-.525.563-.525h15.875c.305 0 .563.219.563.525zm-5.664 4.725c-.234.219-.586.219-.797 0l-1.477-1.378v6.234l1.477-1.378c.211-.219.563-.219.797 0a.49.49 0 0 1 0 .722l-2.437 2.275c-.234.219-.586.219-.797 0L9.164 14.45c-.234-.197-.234-.525 0-.722.211-.219.563-.219.797 0l1.477 1.378V8.872L9.961 10.25c-.234.219-.586.219-.797 0-.234-.197-.234-.525 0-.722l2.438-2.275c.211-.219.563-.219.797 0l2.438 2.275a.49.49 0 0 1 0 .722zM4.063 19c-.328 0-.562-.241-.562-.525 0-.306.234-.525.563-.525h15.875c.305 0 .563.219.563.525 0 .284-.258.525-.562.525H4.063z"/></svg>
);

const ResizableSpacer = ( {
	orientation,
	onResizeStart,
	onResize,
	onResizeStop,
	isSelected,
	isResizing,
	setIsResizing,
	visibility,
	...props
} ) => {
	const getCurrentSize = ( elt ) => {
		return orientation === 'horizontal'
			? elt.clientWidth
			: elt.clientHeight;
	};

	const getNextVal = ( elt ) => {
		return `${ getCurrentSize( elt ) }px`;
	};

	return (
		<ResizableBox
			className={ classnames( 'block-library-spacer__resize-container', {
				'resize-horizontal': orientation === 'horizontal',
				'is-resizing': isResizing,
				'is-selected': isSelected,
			} ) }
			onResizeStart={ ( _event, _direction, elt ) => {
				const nextVal = getNextVal( elt );
				onResizeStart( nextVal );
				onResize( nextVal );
			} }
			onResize={ ( _event, _direction, elt ) => {
				onResize( getNextVal( elt ) );
				if ( ! isResizing ) {
					setIsResizing( true );
				}
			} }
			onResizeStop={ ( _event, _direction, elt ) => {
				const nextVal = getCurrentSize( elt );
				onResizeStop( `${ nextVal }px` );
				setIsResizing( false );
			} }
			__experimentalShowTooltip={ true }
			__experimentalTooltipProps={ {
				axis: orientation === 'horizontal' ? 'x' : 'y',
				position: 'corner',
				isVisible: isResizing,
			} }
			showHandle={ isSelected }
			{ ...props }
		/>
	);
};

const edit = (props) => {
	const {
		attributes,
		isSelected,
		setAttributes,
		toggleSelection,
		context,
		__unstableParentLayout: parentLayout,
		className
	} = props;

	const {
		visibility
	} = props.attributes;

	const vizClasses = vizOptionsToCssClasses(visibility);

	const disableCustomSpacingSizes = useSelect( ( select ) => {
		const editorSettings = select( blockEditorStore ).getSettings();
		return editorSettings?.disableCustomSpacingSizes;
	} );
	const { orientation } = context;
	const { orientation: parentOrientation, type } = parentLayout || {};
	// Check if the spacer is inside a flex container.
	const isFlexLayout = type === 'flex';
	// If the spacer is inside a flex container, it should either inherit the orientation
	// of the parent or use the flex default orientation.
	const inheritedOrientation =
		! parentOrientation && isFlexLayout
			? 'horizontal'
			: parentOrientation || orientation;
	const { height, width, style: blockStyle = {} } = attributes;

	const { layout = {} } = blockStyle;
	const { selfStretch, flexSize } = layout;

	const spacingSizes = useSettings( 'spacing.spacingSizes' );

	const [ isResizing, setIsResizing ] = useState( false );
	const [ temporaryHeight, setTemporaryHeight ] = useState( null );
	const [ temporaryWidth, setTemporaryWidth ] = useState( null );

	const onResizeStart = () => toggleSelection( false );
	const onResizeStop = () => toggleSelection( true );

	const handleOnVerticalResizeStop = ( newHeight ) => {
		onResizeStop();

		if ( isFlexLayout ) {
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: newHeight,
						selfStretch: 'fixed',
					}
				},
			} );
		}

		setAttributes( { height: newHeight } );
		setTemporaryHeight( null );
	};

	const handleOnHorizontalResizeStop = ( newWidth ) => {
		onResizeStop();

		if ( isFlexLayout ) {
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: newWidth,
						selfStretch: 'fixed',
					},
				},
			} );
		}

		setAttributes( { width: newWidth } );
		setTemporaryWidth( null );
	};

	const getHeightForVerticalBlocks = () => {
		if ( isFlexLayout ) {
			return undefined;
		}
		return temporaryHeight || getSpacingPresetCssVar( height ) || undefined;
	};

	const getWidthForHorizontalBlocks = () => {
		if ( isFlexLayout ) {
			return undefined;
		}
		return temporaryWidth || getSpacingPresetCssVar( width ) || undefined;
	};

	const sizeConditionalOnOrientation =
		inheritedOrientation === 'horizontal'
			? temporaryWidth || flexSize
			: temporaryHeight || flexSize;

	const style = {
		height:
			inheritedOrientation === 'horizontal'
				? 24
				: getHeightForVerticalBlocks(),
		width:
			inheritedOrientation === 'horizontal'
				? getWidthForHorizontalBlocks()
				: undefined,
		// In vertical flex containers, the spacer shrinks to nothing without a minimum width.
		minWidth:
			inheritedOrientation === 'vertical' && isFlexLayout
				? 48
				: undefined,
		// Add flex-basis so temporary sizes are respected.
		flexBasis: isFlexLayout ? sizeConditionalOnOrientation : undefined,
		// Remove flex-grow when resizing.
		flexGrow: isFlexLayout && isResizing ? 0 : undefined,
	};

	const resizableBoxWithOrientation = ( blockOrientation ) => {
		if ( blockOrientation === 'horizontal' ) {
			return (
				<ResizableSpacer
					minWidth={ 0 }
					enable={ {
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					orientation={ blockOrientation }
					onResizeStart={ onResizeStart }
					onResize={ setTemporaryWidth }
					onResizeStop={ handleOnHorizontalResizeStop }
					isSelected={ isSelected }
					isResizing={ isResizing }
					setIsResizing={ setIsResizing }
				/>
			);
		}

		return (
			<>
				<ResizableSpacer
					minHeight={ 0 }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					orientation={ blockOrientation }
					onResizeStart={ onResizeStart }
					onResize={ setTemporaryHeight }
					onResizeStop={ handleOnVerticalResizeStop }
					isSelected={ isSelected }
					isResizing={ isResizing }
					setIsResizing={ setIsResizing }
				/>
			</>
		);
	};

	useEffect( () => {
		if (
			isFlexLayout &&
			selfStretch !== 'fill' &&
			selfStretch !== 'fit' &&
			! flexSize
		) {
			if ( inheritedOrientation === 'horizontal' ) {
				// If spacer is moving from a vertical container to a horizontal container,
				// it might not have width but have height instead.
				const newSize =
					getCustomValueFromPreset( width, spacingSizes ) ||
					getCustomValueFromPreset( height, spacingSizes ) ||
					'100px';
				setAttributes( {
					width: '0px',
					style: {
						...blockStyle,
						layout: {
							...layout,
							flexSize: newSize,
							selfStretch: 'fixed',
						},
					},
				} );
			} else {
				const newSize =
					getCustomValueFromPreset( height, spacingSizes ) ||
					getCustomValueFromPreset( width, spacingSizes ) ||
					'100px';
				setAttributes( {
					height: '0px',
					style: {
						...blockStyle,
						layout: {
							...layout,
							flexSize: newSize,
							selfStretch: 'fixed',
						},
					},
				} );
			}
		} else if (
			isFlexLayout &&
			( selfStretch === 'fill' || selfStretch === 'fit' )
		) {
			if ( inheritedOrientation === 'horizontal' ) {
				setAttributes( {
					width: undefined,
				} );
			} else {
				setAttributes( {
					height: undefined,
				} );
			}
		} else if ( ! isFlexLayout && ( selfStretch || flexSize ) ) {
			if ( inheritedOrientation === 'horizontal' ) {
				setAttributes( {
					width: flexSize,
				} );
			} else {
				setAttributes( {
					height: flexSize,
				} );
			}
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: undefined,
						selfStretch: undefined,
					},
				},
			} );
		}
	}, [
		blockStyle,
		flexSize,
		height,
		inheritedOrientation,
		isFlexLayout,
		layout,
		selfStretch,
		setAttributes,
		spacingSizes,
		width,
	] );

	return (
		<>
			<View
				{ ...useBlockProps( {
					style,
					className: classnames( className, vizClasses, {
						'custom-sizes-disabled': disableCustomSpacingSizes,
					} ),
				} ) }
			>
				{ resizableBoxWithOrientation( inheritedOrientation ) }
			</View>
			{ ! isFlexLayout && (
				<SpacerControls
					{...props}
					setAttributes={ setAttributes }
					height={ temporaryHeight || height }
					width={ temporaryWidth || width }
					orientation={ inheritedOrientation }
					isResizing={ isResizing }
				/>
			) }
		</>
	);
};

const save = (props) => {
	const {
		attributes,
		className,
	} = props;

	const {
		height,
		width,
		style,
		visibility,
	} = props.attributes;

	const { layout: { selfStretch } = {} } = style || {};
	// If selfStretch is set to 'fill' or 'fit', don't set default height.
	const finalHeight =
		selfStretch === 'fill' || selfStretch === 'fit' ? undefined : height;

	const vizClasses = vizOptionsToCssClasses(visibility);

	return (
		<div
			{ ...useBlockProps.save( {
				className: classnames( vizClasses ),
				style: {
					height: getSpacingPresetCssVar( finalHeight ),
					width: getSpacingPresetCssVar( width ),
				},
				'aria-hidden': true,
			} ) }
		/>
	);
};

registerBlockType(
	blockDef,
	{
		icon: icon,
		edit: edit,
		save: save,
		attributes: {
			height: {
				type: "string",
				default: "100px"
			},
			width: {
				type: "string"
			},
			visibility: {
				type: 'object',
				default: VISIBILITY_ATTRIBUTE,
			}
		}
	}
);
