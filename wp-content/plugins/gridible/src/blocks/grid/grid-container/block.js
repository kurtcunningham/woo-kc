import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import {
	Fragment
} from '@wordpress/element';
import {
	registerBlockType
} from '@wordpress/blocks';
import {
	compose
} from '@wordpress/compose';

import { slugs } from '../constants.js';

import {
	default as VisibilityPanel,
	VISIBILITY_ATTRIBUTE,
	vizOptionsToCssClasses
} from '../../shared/responsive/visibility';
import ResponsiveControlsPanel from '../../shared/responsive/ResponsiveControlsPanel';
import { FlowAlignmentPanel } from '../../shared/responsive/flow-alignment';

import prefixClassName from '../../../prefix-class-name';

import blockDef from './block.json';

//  Import CSS.
import './editor.scss';

const DEFAULT_CSS_IMPL_STYLE = 'flex';

const DivWrapper = (props) => {
	const {
		alignAll,
		alignMd,
		alignLg,
		flowAll,
		flowMd,
		flowLg,
		visibility,
		cssImplStyle,
	} = props.attributes;
	const {
		isEdit = false,
	} = props;

	const vizClasses = vizOptionsToCssClasses(visibility);

	const classNamePrefix = prefixClassName('row');
	const classes = classNames(
		classNamePrefix,
		`${classNamePrefix}--${cssImplStyle}`,
		{
			[props.className]: !!props.className,
			[`${classNamePrefix}__all-${alignAll}`]: alignAll,
			[`${classNamePrefix}__md-${alignMd}`]: alignMd,
			[`${classNamePrefix}__lg-${alignLg}`]: alignLg,
			[`${classNamePrefix}__all-${flowAll}`]: flowAll,
			[`${classNamePrefix}__md-${flowMd}`]: flowMd,
			[`${classNamePrefix}__lg-${flowLg}`]: flowLg,
		},
		vizClasses,
	);

	let blockProps = {
		className: classes,
	};
	if (isEdit === true) {
		blockProps = useBlockProps(blockProps);
	} else {
		blockProps = useBlockProps.save(blockProps);
	}

	return (
		<div {...blockProps}>
			{props.children}
		</div>
	);
};

const template = [
	[slugs.column, {}],
];

const iconLayout = () => (
	<svg width="24" height="24" viewport="0 0 24 24"><path d="M18 5c1.094 0 2 .906 2 2v10c0 1.125-.906 2-2 2H6c-1.125 0-2-.875-2-2V7c0-1.094.875-2 2-2h12zm0 1.5H6c-.281 0-.5.25-.5.5v2h13V7a.54.54 0 0 0-.5-.5zm-12 11h2.5v-7h-3V17c0 .281.219.5.5.5zm4 0h8c.25 0 .5-.219.5-.5v-6.5H10v7z"/></svg>
);

const edit = (props) => {
	return (<>
		<InspectorControls>
			<ResponsiveControlsPanel
				title={ __( 'Layout' ) }
			>
				<FlowAlignmentPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>
				<VisibilityPanel
					visibilityBundle={props.attributes.visibility}
					setAttributes={props.setAttributes}
				/>
			</ResponsiveControlsPanel>
		</InspectorControls>

		<DivWrapper
			{...props}
			isEdit={true}
		>
			<InnerBlocks
				template={template}
				allowedBlocks={[slugs.column]}
				templateLock={false}
			/>
		</DivWrapper>
	</>);
};

const save = (props) => {
	return (
		<DivWrapper
			{...props}
			isEdit={false}
		>
			<InnerBlocks.Content />
		</DivWrapper>
	);
};

registerBlockType(
	blockDef,
	{
		icon: iconLayout,
		edit: edit,
		save: save,
		attributes: {
			cssImplStyle: {
				type: 'string',
				default: DEFAULT_CSS_IMPL_STYLE,
			},
			alignAll: {
				type: 'string',
				default: 'start',
			},
			alignMd: {
				type: 'string',
				default: 'start',
			},
			alignLg: {
				type: 'string',
				default: 'start',
			},
			flowAll: {
				type: 'string',
				default: 'standard',
			},
			flowMd: {
				type: 'string',
				default: 'standard',
			},
			flowLg: {
				type: 'string',
				default: 'standard',
			},
			visibility: {
				type: 'object',
				default: VISIBILITY_ATTRIBUTE,
			}
		},
	});
