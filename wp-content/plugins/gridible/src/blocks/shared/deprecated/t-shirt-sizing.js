import GenericResponsiveAttributeControl from './components/GenericResponsiveAttributeControl';
import {
  buildAttributes as genericBuildAttributes,
  buildClassNames as genericBuildClassNames,
  getResponsiveValues as genericGetResponsiveValues,
  buildKeys,
} from './attribute-keys';

export const defaultResponsive = false;
export const defaultSize = 'md';

export const sizeOptions = [
	{
		value: 'xs',
		label: 'Extra Small',
	},
	{
		value: 'sm',
		label: 'Small',
	},
	{
		value: 'md',
		label: 'Medium',
	},
	{
		value: 'lg',
		label: 'Large',
	},
	{
		value: 'xlg',
		label: 'Extra Large',
	},
];


const attributes = {
  responsive: {
    type: 'boolean',
    default: defaultResponsive,
  },
  allSize: {
    type: 'string',
    default: defaultSize,
  },
  smSize: {
    type: 'string',
    default: defaultSize,
  },
  mdSize: {
    type: 'string',
    default: defaultSize,
  },
  lgSize: {
    type: 'string',
    default: defaultSize,
  },
};

export function buildAttributes(keyPrefix) {
  // return genericBuildAttributes(attributes, keyPrefix);
  const builtAttributes = genericBuildAttributes(attributes, keyPrefix);
  // console.log(`[t-shirt-sizing] Attributes for prefix '${keyPrefix}':`, builtAttributes)
  return builtAttributes;
}

export function buildClassNames(attributeValues, classPrefix, keyPrefix) {
  // return genericBuildClassNames(attributes, attributeValues, classPrefix, keyPrefix);
  const classNames = genericBuildClassNames(attributes, attributeValues, classPrefix, keyPrefix);
  // console.log(`[t-shirt-sizing] classNames for prefix '${keyPrefix}':`, classNames)
  return classNames;
}

export function getResponsiveValues(attributeValues, keyPrefix) {
  return genericGetResponsiveValues(attributes, attributeValues, keyPrefix);
}

export function ResponsiveAttributeControl({
  keyPrefix = undefined,
  ...restProps
}) {
  const attrKeys = buildKeys(attributes, keyPrefix);

  // console.log(`[ResponsiveAttributeControl.tshirt-sizing] attributes:`, restProps.attributes)
  // console.log(`[ResponsiveAttributeControl.tshirt-sizing] attrKeys:`, attrKeys)

  return (
    <GenericResponsiveAttributeControl
      {...restProps}
      keyPrefix={keyPrefix}
      attrKeys={attrKeys}
      sizeOptions={sizeOptions}
    />
  );
}
