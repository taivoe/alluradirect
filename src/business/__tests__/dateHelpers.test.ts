import {
  calculateDayDifference,
  calculateIsDateInPast,
  convert24HourTo12Hour,
  convertDateStringToDate,
  getRelativeTime,
  handleAddDay,
  handleDateObjToStringYYYMMDD,
  handleRemoveDay,
  isDayWithinRange,
  isWeekendDate,
  serverStringFormat,
} from '../helpers/dateHelpers/dateHelpers';

import dayjs from 'dayjs';
import { dayjsInitializer } from '../helpers/dateHelpers/dayjsInitializer';

dayjsInitializer();

describe('dayjs', () => {
  it('should have minutes,seconds etc set to 0 when passed a date string', () => {
    const dateString = '2021-01-01';
    const date = dayjs(dateString);

    expect(date.hour()).toEqual(0);
    expect(date.minute()).toEqual(0);
    expect(date.second()).toEqual(0);
    expect(date.millisecond()).toEqual(0);
  });
});

describe('calculateDayDifference', () => {
  it("should return a negative number if start's day is before end's", () => {
    const start = dayjs();
    const end = dayjs().add(1, 'day');
    const result = calculateDayDifference(start, end);
    expect(result).toEqual(-1);
  });

  it('should return a postive number if start day is after end day', () => {
    const end = dayjs().hour(0);
    const start = dayjs().add(1, 'day').hour(0);
    const result = calculateDayDifference(start, end);
    expect(result).toEqual(1);
  });

  it('should return zerof if start day is the same day as end day', () => {
    const start = dayjs();
    const end = dayjs();
    const result = calculateDayDifference(start, end);
    expect(result).toEqual(0);
  });
});

describe('convert24HourTo12Hour', () => {
  it('works with a specific time string', () => {
    const timeStr = '16:00';
    const result = convert24HourTo12Hour(timeStr);
    expect(result).toContain('PM');
  });

  it('converts to am', () => {
    const timeStr = '00:00';
    const result = convert24HourTo12Hour(timeStr);
    expect(result).toContain('AM');
  });
});

it('date object produces YYYY-MM-DD', () => {
  expect(handleDateObjToStringYYYMMDD(new Date('2020-01-01T00:00:00Z'))).toBe('2020-01-01');
});

// TODO: this test only works if you run the test from a PST timezone..
// it('Produces GMT Date', () => {
//   expect(createGMTDate('2020-01-01')).toStrictEqual(new Date('2020-01-01T08:00:00.000Z'));
// });

// TODO: this test only works if you run the test from a PST timezone..
// it('converted date string is not the same as using new Date with a string passed in', () => {
//   const convertedDate = convertDateStringToDate('2020-01-01');
//   convertedDate.setHours(0, 0, 0, 0);

//   const compareDate = new Date('2020-01-01');
//   compareDate.setHours(0, 0, 0, 0);

//   expect(convertedDate.getFullYear()).not.toEqual(compareDate.getFullYear());
//   expect(convertedDate.getDay()).not.toEqual(compareDate.getDay());
// });

describe('convertDateStringToDate', () => {
  it('converted date string is the same as new Date with the month lowered by one', () => {
    const convertedDate = convertDateStringToDate('2020-01-01');
    convertedDate.setHours(0, 0, 0, 0);

    const compareDate = new Date(2020, 0, 1);
    compareDate.setHours(0, 0, 0, 0);

    expect(convertedDate).toStrictEqual(compareDate);
  });

  it('should have hours, minutes, seconds, etc set to 0', () => {
    const convertedDate = convertDateStringToDate('2020-01-01');

    expect(convertedDate.getHours()).toBe(0);
    expect(convertedDate.getMinutes()).toBe(0);
    expect(convertedDate.getSeconds()).toBe(0);
    expect(convertedDate.getMilliseconds()).toBe(0);
  });
});

it('isDayWithinRange works', () => {
  const day = dayjs();

  expect(isDayWithinRange({ day, start: day.add(1, 'day'), end: day.add(2, 'day') })).toBe(false);
  expect(isDayWithinRange({ day, start: day, end: day.add(2, 'day') })).toBe(true);
  expect(isDayWithinRange({ day, start: day.subtract(1, 'day'), end: day })).toBe(true);
  expect(isDayWithinRange({ day, start: day.subtract(1, 'day'), end: day.add(1, 'day') })).toBe(true);
});

it('isWeekendDate works', () => {
  const dayjsSaturday = 6;
  const dayjsFriday = 5;

  const day = dayjs();

  expect(isWeekendDate(day.day(dayjsSaturday))).toEqual(true);
  expect(isWeekendDate(day.day(dayjsFriday))).toEqual(true);

  for (let i = 0; i < dayjsFriday; i++) {
    expect(isWeekendDate(day.day(i))).toEqual(false);
  }
});

describe('calculateIsDateBefore', () => {
  it('1 day in past ', () => {
    const date = handleRemoveDay(new Date()).toDate();
    const isInPast = calculateIsDateInPast(date);
    expect(isInPast).toBe(true);
  });
  it('1 day in future', () => {
    const date = handleAddDay(new Date()).toDate();
    const isInPast = calculateIsDateInPast(date);
    expect(isInPast).toBe(false);
  });
});

describe(getRelativeTime.name, () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T12:00:00-08:00')); // Noon PST
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should display "a minute ago"', () => {
    const fixedNow = dayjs('2020-01-01T12:00:00-08:00').tz('Canada/Pacific');
    const oneMinuteEarlier = fixedNow.subtract(1, 'minute');

    const todayServerString = oneMinuteEarlier.format(serverStringFormat);
    const hour = oneMinuteEarlier.hour().toString().padStart(2, '0');
    const minute = oneMinuteEarlier.minute().toString().padStart(2, '0');

    const res = getRelativeTime(todayServerString, `${hour}:${minute}`, fixedNow);
    expect(res).toContain('minute');
  });

  it('Should display correctly for a day ago', () => {
    const fixedNow = dayjs('2020-01-01T12:00:00-08:00').tz('Canada/Pacific');
    const oneDayEarlier = fixedNow.subtract(24, 'hour');

    const todayServerString = oneDayEarlier.format(serverStringFormat);
    const hour = oneDayEarlier.hour().toString().padStart(2, '0');

    const res = getRelativeTime(todayServerString, `${hour}:00`);
    expect(res).toEqual('a day ago');
  });
});
