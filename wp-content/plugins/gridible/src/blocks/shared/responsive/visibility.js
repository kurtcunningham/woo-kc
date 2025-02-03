import {
	BaseControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import usePreviewDevice from './preview-device';
import {
	getLayouts,
	DEVICE_BREAKPOINTS,
	VISIBILITY_OPTIONS
} from './constants';


export const VISIBILITY_ATTRIBUTE = VISIBILITY_OPTIONS.reduce(
  (bundle, currentOption) => {
    // Default to true visibility.
    bundle[currentOption.slug] = true;

    return bundle;
  },
  {}
);

export function vizOptionSlugToCssClass(vizOptionSlug) {
  const matchingOption = VISIBILITY_OPTIONS.find((option) => option.slug === vizOptionSlug);

  if (!matchingOption) {
    return null;
  }

  return `gridible-hidden--${matchingOption.cssModifier}`;
}

export function vizOptionBreakpoint(vizOptionDevice) {
  const matchingOption = VISIBILITY_OPTIONS.find((option) => option.viewportDesc === vizOptionDevice);

  if (!matchingOption) {
    return null;
  }

  return matchingOption.viewportDesc;
}

export function vizOptionsToCssClasses(vizOptionsBundle = {}) {
  return VISIBILITY_OPTIONS
    .map((vizOption) => {
      const slug = vizOption.slug;
      if (vizOptionsBundle[slug] === false) {
        return vizOptionSlugToCssClass(slug);
      }

      return null;
    })
    .filter((cssClass) => typeof cssClass === 'string');
}

const VisibilityWarning = () => (
  <p className="block-editor-hooks__layout-controls-helptext">Determine when this block should be shown, based on the viewport size.</p>
);

function VisibilityPanel({
  visibilityBundle = {},
  setAttributes,
  visibiltyAttributeKey = 'visibility',
}) {
  const [activeBreakpoint] = usePreviewDevice();

  const vizValues = getLayouts().map((vizOption) => {
    const vizValue = typeof visibilityBundle[vizOption.slug] === 'boolean'
      // Use the value if it's defined
      ? visibilityBundle[vizOption.slug]
      // Otherwise, default to true (visible)
      : true;

    return {
      ...vizOption,
      value: vizValue,
    };
  });

	const isActiveBreakpoint = vizOptionBreakpoint(activeBreakpoint);
	const vizControl = vizValues.filter((vizValue) => vizValue.viewportDesc == isActiveBreakpoint);

  // console.log(`visibilityBundle:`, visibilityBundle)

  const activeControl = vizControl.map((vizOption) => (
		<ToggleControl
      key={vizOption.slug}
		  label={vizOption.value
		    ? `Block is: Visible at breakpoint.`
		    : `Block is: Hidden at breakpoint.`
		  }
		  checked={vizOption.value}
		  onChange={(newValue) => {
		    const newVizValues = {
		      ...visibilityBundle,
		      [vizOption.slug]: newValue,
		    };
		    // console.log(`Setting attribute '${visibiltyAttributeKey}' to:`, newVizValues)
		    setAttributes({[visibiltyAttributeKey]: newVizValues});
		  }}
      className="gridible-toggle--full-width"
		/>
	));

  return (
    <>
			<BaseControl label="Visibility">
				{activeControl}
				<VisibilityWarning />
			</BaseControl>
    </>
  );
}

export default VisibilityPanel;
