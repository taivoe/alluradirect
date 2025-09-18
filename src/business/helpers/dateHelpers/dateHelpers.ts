import { DateOfBirth } from './types';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { dayjsInitializer } from './dayjsInitializer';

dayjsInitializer();

// https://github.com/iamkun/dayjs/blob/master/docs/en/Plugin.md#advancedformat

type DateLike = Dayjs | Date | string;

export const convertDateToGMTDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const handleAddDay = (date: string | Date | Dayjs) => dayjs(date).add(1, 'day');
export const handleAddDays = (date: string | Date | Dayjs, daysToAdd: number) => dayjs(date).add(daysToAdd, 'day');
export const handleRemoveDay = (date: string | Date | Dayjs) => dayjs(date).subtract(1, 'day');

export const daysInCurrentMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const calculateIsDateInPast = (date: string | Date | Dayjs) => dayjs(date).isBefore(dayjs(), 'day');
export const calculateIsDateBeforeMandatoryGST = () => dayjs('2021-07-01').isBefore(dayjs());

export const convertDateStringToDate = (dateString: string): Date => {
  const splitDate = dateString.split('-');
  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]) - 1;
  const day = Number(splitDate[2]);
  const newDate = new Date(year, month, day);

  return newDate;
};

// Source: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
export function isValidDate(d: any) {
  if (Object.prototype.toString.call(d) === '[object Date]') {
    // it is a date
    if (isNaN(d.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  }
}

export const checkIsValidDate = (date: dayjs.ConfigType) => {
  return dayjs(date).isValid();
};

// DATE CALCULATORS

// Our REST API fpr Calendar Events and Calendar Dates only goes back unti 2018-01-01
// If you try to request a date before 2018-01-01, the API will respond with an error
// To prevent that, we need to limit the ability for the calendar to fire the action in a back function
// Can also be used to check if provided date's month is the same as the finalMonth's month
export const calculateIsFinalMonthOfData = (date: dayjs.ConfigType, finalMonth: dayjs.ConfigType) =>
  dayjs(date).isSame(dayjs(finalMonth), 'month');

const hoursDifference = ({ fromDateTime, toDateTime }: { fromDateTime: Dayjs; toDateTime: Dayjs }) =>
  toDateTime.diff(fromDateTime, 'hour');

const hoursDifferenceToString = (hours: number) => {
  const days = Math.round(hours / 24);

  return days >= 1 ? `${days} day${days > 1 ? 's' : ''}` : `${hours} hour${hours > 1 || hours === 0 ? 's' : ''}`;
};
// creates string of difference between dateTimes - such as '1 day' or '5 hours'
export const hourOrDayDifferenceString = ({ fromDateTime, toDateTime }: { fromDateTime: Dayjs; toDateTime: Dayjs }) => {
  return hoursDifferenceToString(hoursDifference({ fromDateTime, toDateTime }));
};

export const calculateDayDifference = (start: DateLike, end: DateLike): number => {
  const startDate = convertDateWithNoHoursMinutesSeconds(start);
  const endDate = convertDateWithNoHoursMinutesSeconds(end);
  return startDate.diff(endDate, 'day');
};

/** Will return a negative number if the start is before the end, positive otherwise
 *  When start and end differ by a year, dayjs correctly calculates the month difference as +/- 12
 * */
export const calculateMonthDifference = (start: DateLike, end: DateLike): number => {
  const startDate = convertDateWithNoHoursMinutesSeconds(start);
  const endDate = convertDateWithNoHoursMinutesSeconds(end);
  return startDate.diff(endDate, 'month');
};

export const calculateNights = ({ date1, date2 }: { date1: DateLike; date2: DateLike }): number => {
  return calculateDayDifference(date2, date1);
};

/**  Number of days difference between selected date and today (negative if date is in past) */
export const numberOfDaysUntil = (date: DateLike): number => {
  return calculateDayDifference(date, getDateWithNoHoursMinutesSeconds());
};

export const calculateDifferenceInDays = (start: Date, end: Date) => {
  return calculateDayDifference(end, start);
};

export function serverDaysFromToday(numDays: number): string {
  return `${getDateWithNoHoursMinutesSeconds().add(numDays, 'day').format(serverStringFormat)}`;
}

/** time param format: <number><number>:<number><number>.  */
export const convert24HourTo12Hour = (time: string): string => {
  // Regex: HH:MM or HH:MM:SS, 24-hour format
  const match = time.match(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/);

  if (!match) {
    // If the string doesn’t match, return as-is
    return time;
  }

  // match[1] = hours, match[2] = minutes, match[3] = optional seconds
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const seconds = match[3] || '';
  const period = hours < 12 ? ' AM' : ' PM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes}${seconds}${period}`;
};

export const parseDOB = (dob: string): DateOfBirth => {
  if (!dob || dob.length === 0) {
    return {
      year: '',
      month: '',
      day: '',
    };
  }

  const dates = dob.split('-');
  const year = dates[0];
  const month = parseInt(dates[1]).toString();
  const day = parseInt(dates[2]).toString();

  return {
    year,
    month,
    day,
  };
};

export const convertDateToUTCSeconds = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

// True if day is equal to start or end date or is within both start and end dates
export const isDayWithinRange = ({ day, start, end }: { day: Dayjs; start: Dayjs; end: Dayjs }) => {
  return start.isSame(day, 'day') || (start.isBefore(day, 'day') && end.isAfter(day, 'day')) || end.isSame(day, 'day');
};

/** Returns true if checked range is infact inside the range of the comparator range */
interface RangeWithinRange {
  checked: { start: Dayjs; end: Dayjs };
  comparator: { start: Dayjs; end: Dayjs };
}
export const isRangeWithinRange = ({ checked, comparator }: RangeWithinRange): boolean => {
  const isCheckedStartWithinComparatorStart =
    checked.start.isSame(comparator.start, 'day') || checked.start.isAfter(comparator.start, 'day');

  const isCheckedEndWithinComparatorEnd =
    checked.end.isSame(comparator.end, 'day') || checked.end.isBefore(comparator.end, 'day');

  return isCheckedEndWithinComparatorEnd && isCheckedStartWithinComparatorStart;
};

/* Important: weekends are typically considered to be saturday and sunday
    Since this is used in the context of 'nights' friday and saturday are considered weekend dates
*/
export const isWeekendDate = (date: Dayjs) => {
  const friday = 5;
  const saturday = 6;
  const calendarDayNumber = date.toDate().getDay();

  const isWeekend = calendarDayNumber === friday || calendarDayNumber === saturday;

  return isWeekend;
};

// UTC Dates

/** dateSent is a YYYY-MM-DD formatted UTC string
 *  timeSent is an HH:MM formatted 24-hour string
 */
export function getRelativeTime(dateSent: string, timeSent: string, now: dayjs.Dayjs = dayjs()): string {
  const [hour, minute] = timeSent.split(':');
  return dayjs.tz(`${dateSent} ${hour}:${minute}`, 'Canada/Pacific').from(now);
}

/** Given date and time, returns a Dayjs object corresponding to the server's timezone (PDT)
 * @param date is a YYYY-MM-DD formatted PDT string
 * @param time is an HH:MM formatted 24-hour string (also PDT time)
 * @returns Returns a dayjs object in the PDT timezone
 */
export function getDateTime(date: string, time: string): Dayjs {
  const [hour, minute] = time.split(':');
  return dayjs.tz(`${date}T${hour}:${minute}`, 'America/Los_Angeles');
}

export function getDateWithNoHoursMinutesSeconds(): Dayjs {
  return dayjs().hour(0).minute(0).second(0).millisecond(0);
}

export function convertDateWithNoHoursMinutesSeconds(date: DateLike): Dayjs {
  return dayjs(date).hour(0).minute(0).second(0).millisecond(0);
}

// DATE FORMATS

// Communication (to/from) backend uses the below format for dates
export const serverStringFormat = 'YYYY-MM-DD';

export const shortMonthDayFormat = 'MMM D';
// See: https://day.js.org/docs/en/display/format
// Ex: Jan 10, 2010
export const shortMonthFormat = 'MMM D, YYYY';
// Ex: January 2010
export const longMonthYearFormat = 'MMMM YYYY';
// Ex: January 10, 2010
export const longMonthFormat = 'MMMM D, YYYY';
// Ex: January 10th, 2010
export const longMonthOrdinalFormat = 'MMMM Do, YYYY';
// Ex: Jan 10th, 2010
export const shortMonthOrdinalFormat = 'MMM Do, YYYY';
// Ex: Friday, April 30, 2021
export const longStringFormat = 'dddd, MMMM D, YYYY';

export const handleDateObjToStringYYYMMDD = (date: Date): string => {
  return date.toISOString().slice(0, 10); // always UTC-based
};

export const dateFormatShortMonthDay = (date: Dayjs) => date.format(shortMonthDayFormat);
export const dateFormatDialog = (date: Date | Dayjs) => dayjs(date).format(shortMonthFormat);
export const dateFormatLong = (date: Date | string | Dayjs) => dayjs(date).format(shortMonthFormat);
export const dateFormatLongMonth = (date: Date | string | Dayjs) => dayjs(date).format(longMonthFormat);
export const dateFormatLongString = (date: Date | string | Dayjs) => dayjs(date).format(longStringFormat);
export const dateFormatMontDay = (date: string) => dayjs(date).format('MMMM D');
export const dateFormatMonthDayYearDayOfWeek = (date: string) => dayjs(date).format('MMMM D, YYYY (dddd)');
export const dateFormatMonthYear = (date: string) => dayjs(date).format('MMMM YYYY');
export const dateFormatServer = (date: Date | Dayjs) => dayjs(date).format(serverStringFormat);

export const dayjsFormatServer = (date: Dayjs) => dayjs(date).format(serverStringFormat);
export const dayjsFormatLongOrdinal = (date: Dayjs | string | Date) => dayjs(date).format(longMonthOrdinalFormat);
export const dayjsFormatShortOrdinal = (date: Dayjs) => date.format(shortMonthOrdinalFormat);

export const getYearsDifferenceExact = (date1: Date, date2: Date) => {
  let years = date2.getFullYear() - date1.getFullYear();
  if (
    date2.getMonth() < date1.getMonth() ||
    (date2.getMonth() === date1.getMonth() && date2.getDate() < date1.getDate())
  ) {
    years--;
  }
  return years;
};
