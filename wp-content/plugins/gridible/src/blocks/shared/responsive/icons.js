/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

export const DesktopIcon = () => {

	return (
		<SVG viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<Path d="M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z" />
		</SVG>
	);
};

export const TabletIcon = () => {

	return (
		<SVG viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<Path d="M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"/>
		</SVG>
	);
};

export const MobileIcon = () => {

	return (
		<SVG viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<Path d="M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"/>
		</SVG>
	);
};
