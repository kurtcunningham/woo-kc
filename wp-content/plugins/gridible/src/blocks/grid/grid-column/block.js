import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { registerBlockType } from '@wordpress/blocks';

import { slugs } from '../constants.js';

import {
	VISIBILITY_ATTRIBUTE,
	vizOptionsToCssClasses
} from '../../shared/responsive/visibility';
import ResponsiveControlsPanel from '../../shared/responsive/ResponsiveControlsPanel';
import {
	buildAttributeConfig,
	createColumnClassNames,
	ResponsiveColWidthOffsetLayoutSettingsPanel
} from '../../shared/responsive/columns.js';
import VisibilityPanel from '../../shared/responsive/visibility';

import blockDef from './block.json';

//  Import CSS.
import './editor.scss';

const iconColumn = () => (
	<svg width="24" height="24" viewport="0 0 24 24"><path d="M5 8.071C5 7.212 5.613 6.5 6.4 6.5h11.2c.766 0 1.4.712 1.4 1.571v7.857c0 .884-.634 1.571-1.4 1.571H6.4c-.788 0-1.4-.687-1.4-1.571V8.071zm9.8 8.25h2.8c.175 0 .35-.172.35-.393V8.071c0-.196-.175-.393-.35-.393h-2.8v8.643zm-1.05-8.643h-3.5v8.643h3.5V7.679zM9.2 16.321V7.679H6.4c-.197 0-.35.196-.35.393v7.857c0 .221.153.393.35.393h2.8z"/></svg>
);

const DivWrapper = (props) => {
	const {
		visibility,
	} = props.attributes;
	const {
		isEdit = false,
	} = props;

	let classes = null;
	if (isEdit) {
		// Don't add column size classes, or the resulting render with have
		// duplicate nested column sizes, which ruins the editor layout.
		classes = classNames({
			['editor-col']: isEdit,
		});
	} else {
		// Rendering for persistence, add column size classes.
		classes = createColumnClassNames(props.attributes);
	}

	const vizClasses = vizOptionsToCssClasses(visibility);

	// Add custom class name and (responsive) visibility classes.
	classes = classNames(
		classes,
		{
			[props.className]: !!props.className,
		},
		vizClasses
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

const EditComponent = (props) => {
	return (<>
		<InspectorControls>
			<ResponsiveControlsPanel
				title={ __( 'Columns & Visibility' ) }
			>
				<ResponsiveColWidthOffsetLayoutSettingsPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
					includeOffset={true}
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
				templateLock={false}
			/>
		</DivWrapper>
	</>);
};

const SaveComponent = (props) => {
	return (
		<DivWrapper {...props}>
			<InnerBlocks.Content />
		</DivWrapper>
	);
};

const withGridClasses = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if (props.name !== slugs.column) {
				return <BlockListBlock {...props} />;
			}

			const {
				visibility,
			} = props.attributes;

			const vizClasses = vizOptionsToCssClasses(visibility);

			const classes = classNames(
				'editor',
				createColumnClassNames({
					...props.attributes,
					classNamePrefix: '',
				}),
				vizClasses,
			);

			return (
				<BlockListBlock
					{...props}
					className={classes}
				/>
			);
		};
	},
	'withGridClasses'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	`${slugs.column}/editor-block-grid-cols`,
	withGridClasses
);

registerBlockType(
	blockDef,
	{
		icon: iconColumn,
		edit: EditComponent,
		save: SaveComponent,
		attributes: {
			...buildAttributeConfig({ includeOffset: true }),
			visibility: {
				type: 'object',
				default: VISIBILITY_ATTRIBUTE,
			},
		},
	}
);
