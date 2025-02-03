/**
 * Based on the edit control functionality in the Gutenberg Group block:
 * packages/block-library/src/group/edit.js
 *
 * This implementation has been altered to change the default tag
 * (section -> div), with slightly modified helper text.
 */

import {
	InspectorControls,
} from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';


/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
export function TagSelectionControls( { tagName, onSelectTagName } ) {
	const htmlElementMessages = {
		section: __(
			"The <section> element should represent a standalone portion of the document that can't be better represented by another element."
		),
		header: __(
			'The <header> element should represent introductory content, typically a group of introductory or navigational aids.'
		),
		main: __(
			'The <main> element should be used for the primary content of your document only. '
		),
		article: __(
			'The <article> element should represent a self-contained, syndicatable portion of the document.'
		),
		aside: __(
			"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
		),
		footer: __(
			'The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'
		),
		div: __(
			'The <div> element has no semantic meaning, and is useful for organizing content with altering the page semantics.'
		),
	};

	return (
		<SelectControl
			__nextHasNoMarginBottom
			label={ __( 'HTML element' ) }
			options={ [
				{ label: __('Default (<section>)'), value: 'section' },
				{ label: '<header>', value: 'header' },
				{ label: '<main>', value: 'main' },
				{ label: '<article>', value: 'article' },
				{ label: '<aside>', value: 'aside' },
				{ label: '<footer>', value: 'footer' },
				{ label: '<div>', value: 'div' },
			] }
			value={ tagName }
			onChange={ onSelectTagName }
			help={ htmlElementMessages[ tagName ] }
		/>
	);
}

export function AdvancedPanelControls(props) {
	return (
		< TagSelectionControls {...props} />
	);
}
