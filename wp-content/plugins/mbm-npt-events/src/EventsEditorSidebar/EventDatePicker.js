import { __ } from '@wordpress/i18n';
import {
  DateTimePicker,
} from '@wordpress/components';
import { 
  Button, 
  Popover,
  PanelRow,
} from '@wordpress/components';
import dayjs from 'dayjs';
import { useState } from '@wordpress/element';
import { isValidDate } from '../Utils/time';
import { dbDateFormat } from '../Utils/timezone';


const dateControlRow = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.7em',
  marginBottom: '1em',
};

const formLabel = {
  fontSize: '11px',
  fontWeight: '500',
  lineHeight: '1.4',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 'calc(8px)',
  paddingTop: '0px',
};

const dateField = {
  border: '1px solid #949494',
  borderRadius: '2px',
  boxShadow: '0 0 0 #0000',
  display: 'block',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
  fontSize: '13px',
  height: '36px',
  lineHeight: 'normal',
  marginBottom: '0',
  marginRight: '4px',
  padding: '8px',
  transition: 'box-shadow .1s linear',
  width: '100%',
};

export default function EventDatePicker({
  label,
  date,
  onChange,
  otherDates = [],
  minimumDate = null,
  maximumDate = null,
}) {
  const hasWorkingDate = isValidDate(date);
  const workingDate = hasWorkingDate ? dbDateFormat(date) : null;
  const [newDate, setNewDate] = useState(workingDate);
  const [popoverAnchor, setPopoverAnchor] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    // TODO: not sure this is necessary.
    if (isVisible === true) {
      setNewDate(workingDate);
    }

    setIsVisible((state) => !state);
  };

  const onClickSave = () => {
    onChange(newDate);
    setIsVisible(false);
  }

  const onClickClear = () => {
    onChange('');
    setIsVisible(false);
  }

  return (
    <>
      <>
        <div style={dateControlRow}>
          <label className="components-base-control__label" style={formLabel}>{label}</label>
          <p style={dateField}>{hasWorkingDate 
            ? dayjs(workingDate).format('MMM D, YYYY [at] h:mm A')
            : ''
          }</p>
          <div>
            <Button
              ref={setPopoverAnchor}
              variant="link"
              onClick={toggleVisible}
              >
              Set Date
            </Button>
            <Button
              onClick={onClickClear}
              >
              Clear
            </Button>
          </div>
        </div>
      </>
      {isVisible && (
        <Popover
          anchor={popoverAnchor}
          placement="left"
          focusOnMount={true}
          noArrow={false}
        >
          <div style={{ padding: '1em' }}>
            <DateTimePicker
              currentDate={newDate}
              onChange={(newDate) => {
                setNewDate(newDate);
              }}
              is12Hour={true}
              startOfWeek={1}
              events={otherDates
                // Filter out invalid dates, so they don't throw errors when 
                // converted to JS Date objects in the subsequent map operation.
                .filter((date) => isValidDate(date))
                .map((dayJsDate) => {
                  return {
                    date: dayJsDate.toDate(),
                  };
                }
              )}
              isInvalidDate={(date) => {
                if (minimumDate && dayjs(date).isBefore(dayjs(minimumDate), 'day')) {
                  return true;
                }

                if (maximumDate && dayjs(date).isAfter(dayjs(maximumDate), 'day')) {
                  return true;
                }

                return false;
              }}
            />
            <div style={{ marginTop: '1em' }}>
              <Button
                variant="secondary"
                onClick={onClickSave}
              >
                Save
              </Button>
              <Button onClick={toggleVisible}>
                Cancel
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
}
