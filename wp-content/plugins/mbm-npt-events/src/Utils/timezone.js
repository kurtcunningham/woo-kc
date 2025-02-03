import dayjs from 'dayjs';
import {default as dayjsUtc} from 'dayjs/plugin/utc';
import {default as dayjsTimezone} from 'dayjs/plugin/timezone';
import wpDate from '@wordpress/date';
import { isNonEmptyString } from './string';

// Register DayJS timezone plugins.
dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTimezone)

export const utcTimezone = 'UTC';
export const dbNoTzDateFormat = 'YYYY-MM-DD[T]HH:mm:ss';

export function getSiteTimezone() {
  const timezone = wpDate.getSettings()?.timezone;
  const timezoneSlug = isNonEmptyString(timezone?.string) 
    ? timezone.string 
    : 'UTC';

  return timezoneSlug;
}

export function hasSiteTimezone() {
  return isNonEmptyString(wpDate.getSettings()?.timezone?.string);
}

export function siteToUtcTime(siteTimestamp) {
  return dayjs.tz(siteTimestamp, getSiteTimezone()).tz(utcTimezone);
}

export function utcToSiteTime(utcTimestamp) {
  return dayjs.tz(utcTimestamp, utcTimezone).tz(getSiteTimezone());
}

export function dbDateFormat(dayJsDate) {
  return dayJsDate.format(dbNoTzDateFormat);
}
