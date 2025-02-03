import { __ } from '@wordpress/i18n';
import {
	ButtonBlockAppender,
	BlockControls,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { clsx } from 'clsx';
import { merge } from 'object-deep-merge';
import {
	AdaptiveHeightControls,
	AutoplayControls,
	breakpointsToBreakpointKeysMap,
	LoopControls,
	NavigationControls,
	PaginationControls,
	SlideLayoutControls,
} from './panel-controls';
import slideBlockDef from '../../CarouselSlide/block.json';
import { vizOptionsToCssClasses } from '../../../shared/responsive/visibility';
import './editor.scss';

function Edit({
	attributes, 
	setAttributes,
	clientId,
}) {
	const {
		tagName: Tag = 'div',
		swiperConfig,
		carouselType,
		visibility,
	} = attributes;

	const isNavigationToolsPanelEnabled = (
		swiperConfig.navigation?.enabled === true
		|| swiperConfig.allowTouchMove === true
	);

	const isStaticCarousel = carouselType === 'static';

	const slides = {
		mobile: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Mobile']].slidesPerView,
		tablet: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Tablet']].slidesPerView,
		desktop: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Desktop']].slidesPerView,
	};
	const baseClassName = `wp-block-gridible-${carouselType}-carousel-container`;
	const className = clsx(
		vizOptionsToCssClasses(visibility),
		{
			[`${baseClassName}--slides-mobile-${slides.mobile}`]: true,
			[`${baseClassName}--slides-tablet-${slides.tablet}`]: true,
			[`${baseClassName}--slides-desktop-${slides.desktop}`]: true,
		}
	);
	// console.debug('[Edit] className:', className, 'visibility:', visibility);

	const outerBlockProps = useBlockProps({className});

	const innerBlockPropsArgs = isStaticCarousel
		? {
			templateLock: false,
			templateInsertUpdatesSelection: true,
			orientation: 'horizontal',
			allowedBlocks: [slideBlockDef.name],
			renderAppender: () => <ButtonBlockAppender rootClientId={ clientId } />,
			defaultBlock: {
				name: slideBlockDef.name,
				attributes: {},
			},
			directInsert: true,
		}
		: {
			templateLock: false,
			templateInsertUpdatesSelection: false,
			orientation: 'horizontal',
			allowedBlocks: ['core/post-template'],
			renderAppender: () => null,
			directInsert: false,
		};

	const innerBlockProps = useInnerBlocksProps(
		outerBlockProps,
		innerBlockPropsArgs
	);


	// Custom SVG Icon
	const AddSlideIcon = (
		<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill="currentColor"
		>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1109 19C10.9951 19 10.8818 18.989 10.772 18.9681C9.9531 18.812 9.33315 18.1012 9.33315 17.25V6.75C9.33315 5.78477 10.1304 5 11.1109 5H18.222C19.2026 5 20 5.78477 20 6.75V17.25C20 18.2152 19.2028 19 18.2222 19H11.1109ZM6.66667 6.96875V17.0313C6.66667 17.3949 6.96389 17.6875 7.33333 17.6875C7.70278 17.6875 8 17.3949 8 17.0313V6.96875C8 6.60508 7.70278 6.3125 7.33333 6.3125C6.96389 6.3125 6.66667 6.60508 6.66667 6.96875ZM4 8.28125V15.7187C4 16.0824 4.29722 16.375 4.66667 16.375C5.03611 16.375 5.33333 16.0824 5.33333 15.7187V8.28125C5.33333 7.91758 5.03611 7.625 4.66667 7.625C4.29722 7.625 4 7.91758 4 8.28125ZM11.0859 6.125C10.7703 6.125 10.5145 6.37684 10.5145 6.6875V17.3075C10.5145 17.6182 10.7703 17.87 11.0859 17.87H18.3202C18.6358 17.87 18.8917 17.6182 18.8917 17.3075V6.6875C18.8917 6.37684 18.6358 6.125 18.3202 6.125H11.0859Z"/>
			<path d="M14.9463 9.34615V11.6538H17.2539C17.4414 11.6538 17.6001 11.8125 17.6001 12C17.6001 12.2019 17.4414 12.3462 17.2539 12.3462H14.9463V14.6538C14.9463 14.8558 14.7876 15 14.6001 15C14.3982 15 14.2539 14.8558 14.2539 14.6538V12.3462H11.9463C11.7443 12.3462 11.6001 12.2019 11.6001 12C11.6001 11.8125 11.7443 11.6538 11.9463 11.6538H14.2539V9.34615C14.2539 9.15865 14.3982 9 14.6001 9C14.7876 9 14.9463 9.15865 14.9463 9.34615Z"/>
		</svg>
	);

	const addSlide = () => {
		const newSlideBlock = createBlock(slideBlockDef.name, {});
		dispatch('core/block-editor').insertBlocks(
			newSlideBlock, 
			// Leave insertion index undefined, and the block will be added at 
			// the end of the block list.
			undefined, 
			// Attaching to this container.
			clientId
		);
	}

	// console.debug('[Edit] attributes:', attributes);
	// console.debug('[Edit] swiperConfig:', swiperConfig);

	const setSwiperConfig = (newConfig) => {
		setAttributes({
			swiperConfig: merge(swiperConfig, newConfig),
		});
	}

	return (
		<>
			<Tag {...innerBlockProps} />

			{isStaticCarousel && (
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={AddSlideIcon}
							label="+ Add Slide"
							onClick={addSlide}
						/>
					</ToolbarGroup>
				</BlockControls>
			)}

			<InspectorControls>
				<SlideLayoutControls
					swiperConfig={swiperConfig}
					setSwiperConfig={setSwiperConfig}
					visibilityBundle={attributes.visibility}
					setAttributes={setAttributes}
				/>
				<ToolsPanel
					label={__('Carousel Settings')}
					resetAll={() => setSwiperConfig({
						navigation: {
							enabled: false,
						},
					})}
					className="gridible-tools-panel"
					dropdownMenuProps={{
						// WARN: these values seem rather brittle.
						// Based on the values used by the stock Query block:
						// https://github.com/WordPress/gutenberg/blob/d0a190b65cebe27652e1a4d8d38a714d624e54ad/packages/block-library/src/utils/hooks.js#L92
						popoverProps: {
							placement: 'left-start',
							// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
							offset: 259,
						},
					}}
				>
					<ToolsPanelItem
						hasValue={() => !!swiperConfig.pagination?.enabled}
						label={__('Slide Pagination')}
						onSelect={() => setSwiperConfig({pagination: {enabled: true}})}
						onDeselect={() => setSwiperConfig({pagination: {enabled: false}})}
					>
						<PaginationControls
							swiperConfig={swiperConfig}
							setSwiperConfig={setSwiperConfig}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => isNavigationToolsPanelEnabled}
						label={__('Slide Navigation')}
						onSelect={() => setSwiperConfig({allowTouchMove: true, navigation: {enabled: true}})}
						onDeselect={() => setSwiperConfig({allowTouchMove: false, navigation: {enabled: false}})}
					>
						<NavigationControls
							swiperConfig={swiperConfig}
							setSwiperConfig={setSwiperConfig}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!swiperConfig.loop}
						label={__('Loop')}
						onSelect={() => setSwiperConfig({loop: true})}
						onDeselect={() => setSwiperConfig({loop: false})}
					>
						<LoopControls
							swiperConfig={swiperConfig}
							setSwiperConfig={setSwiperConfig}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!swiperConfig.autoHeight}
						label={__('Adaptive Height')}
						onSelect={() => setSwiperConfig({autoHeight: true})}
						onDeselect={() => setSwiperConfig({autoHeight: false})}
					>
						<AdaptiveHeightControls
							swiperConfig={swiperConfig}
							setSwiperConfig={setSwiperConfig}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!swiperConfig.autoplay}
						label={__('Autoplay')}
						onSelect={() => setSwiperConfig({autoplay: {delay: 5000}})}
						onDeselect={() => setSwiperConfig({autoplay: false})}
					>
						<AutoplayControls
							swiperConfig={swiperConfig}
							setSwiperConfig={setSwiperConfig}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
		</>
	);
};

export default Edit;
