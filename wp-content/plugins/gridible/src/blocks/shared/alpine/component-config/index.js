
export function ComponentConfigJsonScript({
  componentConfig,
  xRefName = 'config',
}) {
  return (
    <script 
      type="application/json" 
      x-ref={xRefName}
      data-script-type="component-config"
    >{JSON.stringify(componentConfig)}</script>
  )
}

export function componentPropertyChangeHandler({
  componentConfig,
  propertyName,
  setAttributes,
}) {
  return (newValue) => {
    const newConfig = {
      ...componentConfig,
      [propertyName]: newValue,
    }

    setAttributes({componentConfig: newConfig});
  }
}

export function buildGutenbergAttribute(defaultValue = {}) {
  return {
    componentConfig: {
      type: 'object',
      default: {
        ...defaultValue
      },
    },
  };
}

function ingestAlpineConfig(component, configData) {
  if (configData) {
    Object.assign(component, configData);
  }
  return configData;
}

const defaultScriptRefName = 'config';

function readComponentConfigScript(
  component, 
  scriptRefName = defaultScriptRefName,
) {
  let configData = null;

  // Attempt to fetch the config script
  const configEl = component.$refs[scriptRefName];
  if (configEl && configEl.textContent) {

    try {
      // Parse the config text
      // Throws: SyntaxError
      configData = JSON.parse(configEl.textContent);
    } catch (e) {
      console.error(`Config parse error:`, e);
    }
  }

  return configData;
}

export function ingestAlpineConfigScript(
  component, 
  scriptRefName = defaultScriptRefName,
) {
  const configData = readComponentConfigScript(component, scriptRefName);

  return ingestAlpineConfig(component, configData);
}

const defaultDataAttrName = 'config';

function readComponentConfigDataAttr(
  component, 
  attributeElement = null, 
  attrName = defaultDataAttrName,
) {
  let configData = null;

  attributeElement = (attributeElement === null || attributeElement === undefined)
    ? component.$el
    : attributeElement;

  if (!(attributeElement instanceof HTMLElement)) {
    return configData;
  }
  
  const configText = attrName in attributeElement.dataset
    ? attributeElement.dataset[attrName]
    : null;
  
  if (!typeof(configText) === 'string') {
    return configData;
  }

  try {
    const decodedConfigText = decodeURIComponent(configText);
    configData = JSON.parse(decodedConfigText);
  } catch (e) {
    /* Parse error, just ignore the config */
    console.error(`Config parse error:`, e);
  }

  return configData;
}

export function ingestAlpineConfigDataAttr(
  component, 
  attributeElement = null, 
  attrName = defaultDataAttrName,
) {
  const configData = readComponentConfigDataAttr(component, attributeElement, attrName);

  return ingestAlpineConfig(component, configData);
}
