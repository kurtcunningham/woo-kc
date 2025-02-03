import { useEntityProp } from '@wordpress/core-data';

/**
 * Custom hook to get a site setting value.
 *
 * @param {string} settingKey The key of the site setting to retrieve.
 * @return {any} The value of the site setting.
 */
const useSiteSetting = (settingKey) => {
  const [settingValue] = useEntityProp('root', 'site', settingKey);
  return settingValue;
};

export default useSiteSetting;