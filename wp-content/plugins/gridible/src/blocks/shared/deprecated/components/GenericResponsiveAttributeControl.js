import {
	Panel,
	PanelBody,
	PanelRow,
	FormToggle,
	SelectControl,
	ToggleControl,
	BaseControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import SizingControl from './SizingControl';
import { responsiveSizeNames } from './text';

export function GenericResponsiveAttributeControl({
  attributes,
  setAttributes,
  attributeLabel,
  attrKeys,
  sizeOptions,
  onChangeConverter = (value) => value,
  keyPrefix = undefined,
}) {
  const responsive = attributes[attrKeys.responsive];
  console.log(`[GenericResponsiveAttributeControl] responsive:`, responsive)

  return (
    <Fragment>
      <ToggleControl
        label={ __( `Responsive ${attributeLabel}` ) }
        help={ responsive ? `Does this element have the same ${attributeLabel} no matter the viewport size?` : `Do you want to set multiple ${attributeLabel}s for this element?` }
        checked={ responsive }
        onChange={ (newResponsive) => setAttributes({[attrKeys.responsive]: newResponsive}) }
      />
      {!responsive && (
        <SizingControl
          label={attributeLabel}
          sizeOptions={sizeOptions}
          size={{
            value: attributes[attrKeys.allSize],
            onChange: (value) => setAttributes({[attrKeys.allSize]: onChangeConverter(value)})
          }}
        />
      )}
      {responsive && (
        <Fragment>
          <BaseControl>
            <p className="label__spacing"><b>{ responsiveSizeNames.all }</b></p>
            <p><i>(Standard mobile phones)</i></p>
            <SizingControl
              label={attributeLabel}
              sizeOptions={sizeOptions}
              size={{
                value: attributes[attrKeys.allSize],
                onChange: (value) => setAttributes({[attrKeys.allSize]: onChangeConverter(value)})
              }}
            />
          </BaseControl>
          <hr/>
          <BaseControl>
            <p className="label__spacing"><b>{ responsiveSizeNames.sm }</b></p>
            <p><i>(Large mobile phones, small tablets)</i></p>
            <SizingControl
              label={attributeLabel}
              sizeOptions={sizeOptions}
              size={{
                value: attributes[attrKeys.smSize],
                onChange: (value) => setAttributes({[attrKeys.smSize]: onChangeConverter(value)})
              }}
            />
          </BaseControl>
          <hr/>
          <BaseControl>
            <p className="label__spacing"><b>{ responsiveSizeNames.md }</b></p>
            <p><i>(Standard tablets, small laptops)</i></p>
            <SizingControl
              label={attributeLabel}
              sizeOptions={sizeOptions}
              size={{
                value: attributes[attrKeys.mdSize],
                onChange: (value) => setAttributes({[attrKeys.mdSize]: onChangeConverter(value)})
              }}
            />
          </BaseControl>
          <hr/>
          <BaseControl>
            <p className="label__spacing"><b>{ responsiveSizeNames.lg }</b></p>
            <p><i>(Large tablets, desktop computers)</i></p>
            <SizingControl
              label={attributeLabel}
              sizeOptions={sizeOptions}
              size={{
                value: attributes[attrKeys.lgSize],
                onChange: (value) => setAttributes({[attrKeys.lgSize]: onChangeConverter(value)})
              }}
            />
          </BaseControl>
        </Fragment>
      )}
    </Fragment>
  );
}

export default GenericResponsiveAttributeControl;
