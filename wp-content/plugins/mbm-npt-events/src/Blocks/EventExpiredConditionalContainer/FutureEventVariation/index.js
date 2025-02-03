import icon from './icon.svg';

const ONLY_FUTURE_VARIATION_NAME = 'only_future';

const variation = {
  name: ONLY_FUTURE_VARIATION_NAME,
  title: 'Event Content - Future',
  icon: icon,
  isDefault: true,
  description: 'Conditionally display content if the event has not occurred.',
  attributes: {
    showMode: ONLY_FUTURE_VARIATION_NAME,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['showMode'],
};

export default variation;
export { icon };
