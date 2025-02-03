import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  BaseControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import usePreviewDevice from './preview-device';
import {
	BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  BREAKPOINT_MOBILE,
} from './constants';

import prefixClassName from '../../../prefix-class-name';

/**
 * Stylesheet dependencies
 */
import './editor.scss';


export function buildAttributeConfig({
  defaultSize = 6,
  defaultOffset = 0,
  includeOffset = false
}) {
  const baseResponsiveAttributes = {
    allSize: {
      type: 'number',
      default: defaultSize,
    },
    mdSize: {
      type: 'number',
      default: defaultSize,
    },
    lgSize: {
      type: 'number',
      default: defaultSize,
    },
  };

  const offsetAttributes = {
    allOffset: {
      type: 'number',
      default: defaultOffset,
    },
    mdOffset: {
      type: 'number',
      default: defaultOffset,
    },
    lgOffset: {
      type: 'number',
      default: defaultOffset,
    },
  };

  return {
    ...baseResponsiveAttributes,
    ...(includeOffset ? offsetAttributes : {})
  };
}

export function createColumnClassNames({
  allSize,
  allOffset,
  mdSize,
  mdOffset,
  lgSize,
  lgOffset,
  classNamePrefix = prefixClassName('')
}) {
  let classes = classNames({
    [prefixClassName('col')]: true,
    [`${classNamePrefix}col__${allSize}`]: true,
    [`${classNamePrefix}offset__${allOffset}`]: allOffset && allOffset > 0,
    [`${classNamePrefix}col__md-${mdSize}`]: mdSize,
    [`${classNamePrefix}offset__md-${mdOffset}`]: mdOffset && mdOffset > 0,
    [`${classNamePrefix}col__lg-${lgSize}`]: lgSize,
    [`${classNamePrefix}offset__lg-${lgOffset}`]: lgOffset && lgOffset > 0,
  });

  return classes;
}

export function TwelveColumnControl({label, value, onChange}) {
  return (
    <RangeControl
      label={__(label)}
      value={value}
      onChange={onChange}
      min={1}
      max={12}
    />
  );
}

export function WidthOffsetControls({ size, offset }) {
  return (
    <>
      <TwelveColumnControl
        label="Column Span"
        value={size.value}
        onChange={size.onChange}
      />
      {offset && (<RangeControl
        label={__('Column Offset')}
        value={offset.value}
        onChange={offset.onChange}
        min={0}
        max={11}
      />)}
    </>
  );
}

function LabeledWidthOffsetControls({
  responsiveSizeName,
  responsiveSizeLabel,
  attributes,
  sizeValueKey,
  offsetValueKey,
  setAttributes,
  includeOffset = true,
}) {
  return (
    <WidthOffsetControls
      size={{
        value: attributes[sizeValueKey],
        onChange: (value) => setAttributes({ [sizeValueKey]: value })
      }}
      offset={includeOffset && {
        value: attributes[offsetValueKey],
        onChange: (value) => setAttributes({ [offsetValueKey]: value })
      }}
    />
  );
}

export function ResponsiveLayoutSettingsPanel({
  responsiveForms,
}) {
  return (
    <>
      {responsiveForms}
    </>
  );
}

export function ResponsiveColWidthOffsetLayoutSettingsPanel({
  attributes,
  setAttributes,
}) {
  const [activeBreakpoint] = usePreviewDevice();

  const breakpointMobile = activeBreakpoint == BREAKPOINT_MOBILE;
  const breakpointTablet = activeBreakpoint == BREAKPOINT_TABLET;
  const breakpointDesktop = activeBreakpoint == BREAKPOINT_DESKTOP;

  function AttributesWidthOffsetControls({sizeValueKey, offsetValueKey}) {
    return (
      <WidthOffsetControls
        size={{
          value: attributes[sizeValueKey],
          onChange: (value) => setAttributes({ [sizeValueKey]: value })
        }}
        offset={{
          value: attributes[offsetValueKey],
          onChange: (value) => setAttributes({ [offsetValueKey]: value })
        }}
      />
    );
  }

  const responsiveForms = (
    <>
      {breakpointMobile &&
        <BaseControl>
          <AttributesWidthOffsetControls
            sizeValueKey="allSize"
            offsetValueKey="allOffset"
          />
        </BaseControl>
      }
      {breakpointTablet &&
        <BaseControl>
          <AttributesWidthOffsetControls
            sizeValueKey="mdSize"
            offsetValueKey="mdOffset"
          />
        </BaseControl>
      }
      {breakpointDesktop &&
        <BaseControl>
          <AttributesWidthOffsetControls
            sizeValueKey="lgSize"
            offsetValueKey="lgOffset"
          />
        </BaseControl>
      }
    </>
  );

  return (
    <ResponsiveLayoutSettingsPanel
      responsiveForms={responsiveForms}
    />
  );
}

export default ResponsiveColWidthOffsetLayoutSettingsPanel;
