import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import usePreviewDevice from './preview-device';

import {
	BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  BREAKPOINT_MOBILE,
} from './constants';

const alignmentOptions = [
	{
		label: 'Default',
		value: 'normal',
	},
	{
		label: 'Top',
		value: 'start',
	},
	{
		label: 'Center',
		value: 'center',
	},
	{
		label: 'Bottom',
		value: 'end',
	},
];

const flowOptions = [
	{
		label: 'Standard',
		value: 'standard',
	},
	{
		label: 'Column',
		value: 'column',
	},
	{
		label: 'Reverse Column',
		value: 'reverse-column',
	},
	{
		label: 'Reverse Row',
		value: 'reverse-row',
	},
];

export const FlowAlignmentPanel = ({attributes, setAttributes}) => {
  const {
		alignAll,
		alignMd,
		alignLg,
		flowAll,
		flowMd,
		flowLg
	} = attributes;

  const [activeBreakpoint] = usePreviewDevice();

  const breakpointMobile = activeBreakpoint == BREAKPOINT_MOBILE;
  const breakpointTablet = activeBreakpoint == BREAKPOINT_TABLET;
  const breakpointDesktop = activeBreakpoint == BREAKPOINT_DESKTOP;

  return (
    <>
      {breakpointMobile &&
        <div className="gridible-fieldset__group">
      		<SelectControl
      			label="Alignment"
      			value={alignAll}
      			options={alignmentOptions}
      			onChange={(value) => setAttributes({ alignAll: value })}
      		/>
      		<SelectControl
      			label="Flow Direction"
      			value={flowAll}
      			options={flowOptions}
      			onChange={(value) => setAttributes({ flowAll: value })}
      		/>
      	</div>
      }
      {breakpointTablet &&
      	<div className="gridible-fieldset__group">
      		<SelectControl
      			label="Alignment"
      			value={alignMd}
      			options={alignmentOptions}
      			onChange={(value) => setAttributes({ alignMd: value })}
      		/>
      		<SelectControl
      			label="Flow Direction"
      			value={flowMd}
      			options={flowOptions}
      			onChange={(value) => setAttributes({ flowMd: value })}
      		/>
      	</div>
      }
      {breakpointDesktop &&
      	<div className="gridible-fieldset__group">
      		<SelectControl
      			label="Alignment"
      			value={alignLg}
      			options={alignmentOptions}
      			onChange={(value) => setAttributes({ alignLg: value })}
      		/>
      		<SelectControl
      			label="Flow Direction"
      			value={flowLg}
      			options={flowOptions}
      			onChange={(value) => setAttributes({ flowLg: value })}
      		/>
      	</div>
      }
    </>
  );
}
