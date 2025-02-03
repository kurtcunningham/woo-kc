import { __ } from '@wordpress/i18n';
import {
  PanelBody,
	SelectControl,
  TextControl,
	ToggleControl,
} from '@wordpress/components';
import {
	__experimentalHeading as Heading,
} from '@wordpress/components';
import usePreviewDevice from '../../../shared/responsive/preview-device';
import ResponsiveControlsPanel from '../../../shared/responsive/ResponsiveControlsPanel';
import VisibilityPanel from '../../../shared/responsive/visibility';

export const breakpointsToBreakpointKeysMap = {
	'Mobile': 0,
	'Tablet': 600,
	'Desktop': 1080,
};

const slidesInViewOptions = [1,2,3,4,6,12].map((slides) => ({
	label: slides,
	value: slides,
}));

function getBreakpointValue(swiperConfig, breakpoint, key) {
	const breakpointKey = breakpointsToBreakpointKeysMap[breakpoint];

	return swiperConfig.breakpoints[breakpointKey][key];
}

function createBreakpointValue(breakpoint, key, value) {
	const breakpointKey = breakpointsToBreakpointKeysMap[breakpoint];

	return {
		breakpoints: {
			[breakpointKey]: {
				[key]: value,
			},
		},
	};
}

export function SlideLayoutControls({
	swiperConfig,
	setSwiperConfig,
  visibilityBundle,
  setAttributes,
}) {
	const [previewDevice] = usePreviewDevice();

	return (
		<ResponsiveControlsPanel
			title="Slide Layout"
		>
			<SelectControl
				label="Slides In View"
				value={getBreakpointValue(swiperConfig, previewDevice, 'slidesPerView')}
				options={slidesInViewOptions}
				onChange={(value) => {
					const newBreakpointValue = createBreakpointValue(previewDevice, 'slidesPerView', value);
					setSwiperConfig(newBreakpointValue);
				}}
			/>
      <VisibilityPanel
        visibilityBundle={visibilityBundle}
        setAttributes={setAttributes}
      />
		</ResponsiveControlsPanel>
	);
}

function ToolsPanelGroup({children}) {
	return (
    <div className="gridible-tools-panel__group">
      {children}
    </div>
	);
}

function ToolsPanelHeading({title}) {
  return (
    <Heading 
      level={3} 
      upperCase={true}
      style={{marginBottom: '0'}}
    >{__(title)}</Heading>
  );
}

export function PaginationControls({
	swiperConfig,
	setSwiperConfig,
}) {
	return (
    <ToolsPanelGroup>
      <ToolsPanelHeading title="Slide Pagination" />
      <ToggleControl
        checked={swiperConfig.pagination?.enabled}
        onChange={(value) => {
          setSwiperConfig({
            pagination: {
              enabled: value,
            },
          });
        }}
        label={!!swiperConfig.pagination?.enabled ? 'Slide pagination is visible.' : 'Slide pagination is hidden.'}
        className="gridible-toggle--full-width"
      />
      <SelectControl
        label="Pagination Style"
        value={swiperConfig.pagination?.type}
        options={[
          { label: 'Bullets', value: 'bullets' },
          { label: 'Fraction', value: 'fraction' },
          // { label: 'Progress', value: 'progress' },
        ]}
        onChange={(value) => {
          setSwiperConfig({
            pagination: {
              type: value,
            },
          });
        }}
      />
    </ToolsPanelGroup>
	);
}

export function NavigationControls({
	swiperConfig,
	setSwiperConfig,
}) {
	return (
    <ToolsPanelGroup>
      <ToolsPanelHeading title="Slide Navigation" />
      <ToggleControl
        checked={swiperConfig.navigation?.enabled}
        onChange={(value) => {
          setSwiperConfig({
            navigation: {
              enabled: value,
            },
          });
        }}
        label={!!swiperConfig.navigation?.enabled ? 'Slide navigation is visible.' : 'Slide navigation is hidden.'}
        className="gridible-toggle--full-width"
      />
      <ToggleControl
        checked={swiperConfig.allowTouchMove}
        onChange={(value) => {
          setSwiperConfig({
            allowTouchMove: value,
          });
        }}
        label={!!swiperConfig.allowTouchMove ? 'Swipe navigation is enabled.' : 'Swipe navigation is disabled.'}
        className="gridible-toggle--full-width"
      />
    </ToolsPanelGroup>
	);
}

export function LoopControls({
	swiperConfig,
	setSwiperConfig,
}) {
	return (
    <ToolsPanelGroup>
      <ToolsPanelHeading title="Loop" />
			<ToggleControl
				checked={swiperConfig.loop}
				onChange={(value) => {
					setSwiperConfig({
						loop: value,
					});
				}}
				label={!!swiperConfig.loop ? 'Slides will loop indefinitely.' : 'Slides will not loop.'}
				className="gridible-toggle--full-width"
			/>
		</ToolsPanelGroup>
	);
}

export function AdaptiveHeightControls({
	swiperConfig,
	setSwiperConfig,
}) {
	return (
    <ToolsPanelGroup>
      <ToolsPanelHeading title="Adaptive Height" />
			<ToggleControl
				checked={swiperConfig.autoHeight}
				onChange={(value) => {
					setSwiperConfig({
						autoHeight: value,
					});
				}}
				label={!!swiperConfig.autoHeight ? 'Carousel height dynamic.' : 'Carousel height not dynamic.'}
				className="gridible-toggle--full-width"
			/>
		</ToolsPanelGroup>
	);
}

export function AutoplayControls({
	swiperConfig,
	setSwiperConfig,
}) {
	return (
    <ToolsPanelGroup>
      <ToolsPanelHeading title="Autoplay" />
      <ToggleControl
        checked={!!swiperConfig.autoplay}
        onChange={(value) => {
          if (!value) {
            setSwiperConfig({
              autoplay: false,
            });
            return;
          }

          setSwiperConfig({
            autoplay: {
              delay: 5000,
            },
          });
        }}
        label={!!swiperConfig.autoplay ? 'Slides will move automatically.' : 'Slides will not move automatically.'}
        className="gridible-toggle--full-width"
      />
      {!!swiperConfig.autoplay && (
        <>
          <ToolsPanelHeading title="Slide Speed" />
          <TextControl
            value={swiperConfig.autoplay?.delay}
            onChange={(value) => {
              setSwiperConfig({
                autoplay: {
                  delay: value,
                },
              });
            }}
            type="number"
            step="500"
            min="500"
            max="10000"
          />
        </>
      )}
    </ToolsPanelGroup>
	);
}
