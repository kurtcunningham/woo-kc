import dayjs from 'dayjs';

export function isValidDate(dateValue) {
  if (dateValue == null || dateValue == '' || dateValue == false) {
    return false;
  }

  const date = dayjs(dateValue);
  return date.isValid();
}
