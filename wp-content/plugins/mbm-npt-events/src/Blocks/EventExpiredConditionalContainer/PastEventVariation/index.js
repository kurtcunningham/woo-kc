import icon from './icon.svg';


const ONLY_PAST_VARIATION_NAME = 'only_past';

const variation = {
  name: ONLY_PAST_VARIATION_NAME,
  title: 'Event Content - Past',
  icon: icon,
  description: 'Conditionally display content if the event has already occurred.',
  attributes: {
    showMode: ONLY_PAST_VARIATION_NAME,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['showMode'],
};

export default variation;
