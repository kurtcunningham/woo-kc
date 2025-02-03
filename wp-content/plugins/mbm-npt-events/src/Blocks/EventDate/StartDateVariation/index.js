import icon from './icon.svg';
import blockDef from '../block.json';

const EVENT_DATE_TYPE = 'start';

const variation = {
  name: blockDef.name + '/' + EVENT_DATE_TYPE,
  title: 'Event Start Date',
  icon: icon,
  isDefault: true,
  description: `Display the event's start date.`,
  attributes: {
    eventDateType: EVENT_DATE_TYPE,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['eventDateType'],
};

export default variation;
export { icon };
