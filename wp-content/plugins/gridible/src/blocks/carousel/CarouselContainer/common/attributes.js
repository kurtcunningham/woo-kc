import { VISIBILITY_ATTRIBUTE } from '../../../shared/responsive/visibility';

const swiperBaseConfig = {
	slidesPerView: 1,
	spaceBetween: 32,
	autoHeight: true,
	loop: false,
	autoplay: false,
	allowTouchMove: true,

	navigation: {
		enabled: false,
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	pagination: {
		enabled: true,
		type: 'bullets',
		el: ".swiper-pagination",
		clickable: true,
	},

	// Responsive breakpoints
	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		600: {
			slidesPerView: 2,
		},
		1080: {
			slidesPerView: 3,
		}
	},
};

function buildAttributes(carouselType) {
	const attributes = {
		carouselType: {
			type: "string",
			default: carouselType,
		},
		swiperConfigVersion: {
			type: 'string',
			default: '1.0',
		},
		swiperConfig: {
			type: 'object',
			default: swiperBaseConfig,
		},
		tagName: {
			type: 'string',
			default: 'div',
		},
		visibility: {
			type: 'object',
			default: VISIBILITY_ATTRIBUTE,
		},
	};

	return attributes;
}

export default buildAttributes;
