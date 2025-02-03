const conditionallyPrefixName = (keyPrefix, key) => {
  // If the prefix is present, then the "all-size" or "base" value is just
  // the prefix alone.
  if (keyPrefix && key === 'allSize') {
    return keyPrefix;
  }

  return !!keyPrefix ? `${keyPrefix}_${key}` : key;
};

export function buildKeys(attributes, keyPrefix) {
  const prefixedAttrKeys = {};

  Object.keys(attributes).forEach((key) => {
    prefixedAttrKeys[key] = conditionallyPrefixName(keyPrefix, key);
  });

  return prefixedAttrKeys;
}

export function buildAttributes(attributes, keyPrefix) {
  const prefixedAttrs = {};

  Object.keys(attributes).forEach((key) => {
    const prefixedKey = conditionallyPrefixName(keyPrefix, key);
    prefixedAttrs[prefixedKey] = {...attributes[key]};
  });

  return prefixedAttrs;
}

export function getResponsiveValues(attributes, attributeValues, keyPrefix) {
  const attrKeys = buildKeys(attributes, keyPrefix);

  return {
    responsive: attributeValues[attrKeys.responsive],
    allSize: attributeValues[attrKeys.allSize],
    smSize: attributeValues[attrKeys.smSize],
    mdSize: attributeValues[attrKeys.mdSize],
    lgSize: attributeValues[attrKeys.lgSize],
  };
}

export function buildClassNames(attributes, attributeValues, classPrefix, keyPrefix) {
  // console.log(`[buildClassNames] v2`)
  const respValues = getResponsiveValues(attributes, attributeValues, keyPrefix);
  const classes = {
		[`${classPrefix}__${respValues.allSize}`]: true,
		[`${classPrefix}__sm-${respValues.smSize}`]: respValues.responsive && respValues.smSize !== null,
		[`${classPrefix}__md-${respValues.mdSize}`]: respValues.responsive && respValues.mdSize !== null,
		[`${classPrefix}__lg-${respValues.lgSize}`]: respValues.responsive && respValues.lgSize !== null,
  };

  return classes;
}
