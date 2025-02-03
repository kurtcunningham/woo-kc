import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { clsx } from 'clsx';
import { vizOptionsToCssClasses } from '../../../shared/responsive/visibility';


function Carousel({tagName: Tag, blockProps, swiperConfig, ...restProps}) {
	const children = (blockProps?.children !== undefined)
		? blockProps.children
		: restProps.children;

	const hasNavigation = swiperConfig.navigation?.enabled === true;
	const hasPagination = swiperConfig.pagination?.enabled === true;

	return (
		<Tag
			{...blockProps}
			data-wp-interactive={`{ "namespace": "gridibleCarousel" }`}
			data-wp-init="callbacks.init"
			data-wp-context={JSON.stringify({swiperConfig})}
		>
			{children}
			{hasNavigation && (
				<>
					<div class="swiper-button-next"></div>
					<div class="swiper-button-prev"></div>
				</>
			)}
			{hasPagination && (
				<div class="swiper-pagination"></div>
			)}
		</Tag>
	);
}

function Save({attributes}) {
	const {
		tagName = 'div',
		carouselType = 'static',
		swiperConfig,
		visibility,
	} = attributes;
	const isStaticCarousel = carouselType === 'static';
	const isQueryCarousel = carouselType === 'query';

	const baseClassName = `wp-block-gridible-${carouselType}-carousel-container`;
	const className = clsx(
		vizOptionsToCssClasses(visibility),
		`swiper`,
		{
			[`${baseClassName}--pagination-style-${swiperConfig?.pagination?.type}`]: !!swiperConfig?.pagination?.type,
		}
	);
	const outerBlockProps = useBlockProps.save({className});

	if (isStaticCarousel) {
		const innerBlockProps = useInnerBlocksProps.save({className: `swiper-wrapper`});
		
		return (
			<Carousel
				tagName={tagName}
				blockProps={outerBlockProps}
				swiperConfig={swiperConfig}
			>
				<ul
					{...innerBlockProps}
				></ul>
			</Carousel>
		);
	} else if (isQueryCarousel) {
		const innerBlockProps = useInnerBlocksProps.save(outerBlockProps);
		
		return (
			<Carousel
				tagName={tagName}
				blockProps={innerBlockProps}
				swiperConfig={swiperConfig}
			/>
		);
	}

	// ...should not reach this point.
	return null;
}

export default Save;
