import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { 
	registerBlockType
} from '@wordpress/blocks';

import {
	ariaLabelParser,
	AriaLabelPanel,
} from '../shared/accessibility/AriaLabelPanel';
import {
	TagSelectionControls
} from '../shared/accessibility/TagSelectionControls';

import {
	VISIBILITY_ATTRIBUTE,
	vizOptionsToCssClasses
} from '../shared/responsive/visibility';
import ResponsiveControlsPanel from '../shared/responsive/ResponsiveControlsPanel';
import VisibilityPanel from '../shared/responsive/visibility';

import blockDef from './block.json';

//  Import CSS.
import './editor.scss';

const icon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 5C18.0938 5 19 5.90625 19 7V17C19 18.125 18.0938 19 17 19H7C5.875 19 5 18.125 5 17V7C5 5.90625 5.875 5 7 5H17ZM17 6.5H7C6.71875 6.5 6.5 6.75 6.5 7V17C6.5 17.2813 6.71875 17.5 7 17.5H17C17.25 17.5 17.5 17.2813 17.5 17V7C17.5 6.75 17.25 6.5 17 6.5Z" /></svg>
);

const Container = (props) => {
  const {
    visibility,
		tagName: TagName
  } = props.attributes;
  const {
    isEdit = false,
  } = props;
	const vizClasses = vizOptionsToCssClasses(visibility);

  const classes = classNames(
		props.className,
		// Allow this to be set conditionally via block supports.
		// 'has-global-padding',
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
    <TagName
			{...ariaLabelParser(props)}
			{...blockProps}
    >
			{ props.children }
    </TagName>
  );
};

const edit = ( props ) => {
	const {
    visibility,
		tagName,
	} = props.attributes;
	const {setAttributes} = props;

	return (
		<>
			<InspectorControls>
				<ResponsiveControlsPanel
					title={ __( 'Visibility' ) }
				>
					<VisibilityPanel
						visibilityBundle={props.attributes.visibility}
						setAttributes={props.setAttributes}
					/>
				</ResponsiveControlsPanel>
			</InspectorControls>
			<InspectorControls group="advanced">
				<TagSelectionControls
						tagName={tagName}
						onSelectTagName={(tagName) => setAttributes({tagName})}
					/>
				<AriaLabelPanel {...props} />
			</InspectorControls>

			<Container
				{...props}
				isEdit={true}
			>
				<InnerBlocks />
			</Container>
		</>
	);
};

const save = ( props ) => {
	return (
		<Container
			{...props}
			isEdit={false}
		>
			<InnerBlocks.Content />
		</Container>
	);
};

registerBlockType(
	blockDef,
	{
		icon: icon,
		edit: edit,
		save: save,
		attributes: {
			align: {
	      type: 'string',
	      default: 'full',
	    },
			style: {
				type: 'object',
				default: {
					spacing: {
						padding: {
							top: 'var:preset|spacing|30',
							bottom: 'var:preset|spacing|30'
						}
					}
				}
			},
			tagName: {
				type: 'string',
				default: 'section',
			},
			visibility: {
				type: 'object',
				default: VISIBILITY_ATTRIBUTE,
			}
		}
	}
);
