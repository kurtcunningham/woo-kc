import icon from './icon.svg';
import blockDef from '../block.json';

const EVENT_DATE_TYPE = 'end';

const variation = {
  name: blockDef.name + '/' + EVENT_DATE_TYPE,
  title: 'Event End Date',
  icon: icon,
  isDefault: true,
  description: `Display the event's end date.`,
  attributes: {
    eventDateType: EVENT_DATE_TYPE,
  },
  scope: ['block', 'inserter', 'transform'],
  isActive: ['eventDateType'],
};

export default variation;
