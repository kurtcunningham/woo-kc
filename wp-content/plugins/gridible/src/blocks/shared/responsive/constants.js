/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { DesktopIcon, TabletIcon, MobileIcon } from './icons.js';

export const defaultSpacing = 16;

export const spacingOptions = [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 128]
	.map((intValue) => {
		const valueStr = intValue.toString();
		return {
			value: valueStr,
			label: valueStr,
		};
	});


export const BREAKPOINT_DESKTOP = 'Desktop';
export const BREAKPOINT_TABLET = 'Tablet';
export const BREAKPOINT_MOBILE = 'Mobile';

export const getLayouts = () => [
	{
		value: BREAKPOINT_DESKTOP,
		label: __( 'Desktop', 'layout-grid' ),
		icon: DesktopIcon,
		viewportDesc: 'Desktop',
    slug: 'large',
    cssModifier: 'lg',
	},
	{
		value: BREAKPOINT_TABLET,
		label: __( 'Tablet', 'layout-grid' ),
		icon: TabletIcon,
		viewportDesc: 'Tablet',
    slug: 'medium',
    cssModifier: 'md',
	},
	{
		value: BREAKPOINT_MOBILE,
		label: __( 'Mobile', 'layout-grid' ),
		icon: MobileIcon,
		viewportDesc: 'Mobile',
    slug: 'small',
    cssModifier: 'sm',
	},
];

export const DEVICE_BREAKPOINTS = [
	BREAKPOINT_DESKTOP,
	BREAKPOINT_TABLET,
	BREAKPOINT_MOBILE,
];

export const VISIBILITY_OPTIONS = [
  {
    viewportDesc: 'Mobile',
    slug: 'small',
    cssModifier: 'sm',
  },
  {
    viewportDesc: 'Tablet',
    slug: 'medium',
    cssModifier: 'md',
  },
  {
    viewportDesc: 'Desktop',
    slug: 'large',
    cssModifier: 'lg',
  },
];
