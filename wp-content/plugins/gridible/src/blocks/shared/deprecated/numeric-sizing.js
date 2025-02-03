import GenericResponsiveAttributeControl from './components/GenericResponsiveAttributeControl';
import {
  buildAttributes as genericBuildAttributes,
  buildClassNames as genericBuildClassNames,
  buildKeys,
} from './attribute-keys';

export const defaultResponsive = false;
export const defaultSize = 16;

export const sizeOptions = [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 128]
  .map((intValue) => {
    const valueStr = intValue.toString();
    return {
      value: valueStr,
      label: valueStr,
    };
  });

const attributes = {
  responsive: {
    type: 'boolean',
    default: defaultResponsive,
  },
  allSize: {
    type: 'number',
    default: defaultSize,
  },
  smSize: {
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

export function buildAttributes(keyPrefix) {
  const builtAttributes = genericBuildAttributes(attributes, keyPrefix);

  return builtAttributes;
}

export function buildClassNames(attributeValues, classPrefix, keyPrefix) {
  return genericBuildClassNames(attributes, attributeValues, classPrefix, keyPrefix);
}

export function ResponsiveAttributeControl({
  keyPrefix = undefined,
  ...restProps
}) {
  const attrKeys = buildKeys(attributes, keyPrefix);

  return (
    <GenericResponsiveAttributeControl
      {...restProps}
      keyPrefix={keyPrefix}
      attrKeys={attrKeys}
      sizeOptions={sizeOptions}
      onChangeConverter={(value) => parseInt(value, 10)}
    />
  );
}
