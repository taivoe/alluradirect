import dayjs from 'dayjs';
import {
  isDayWithinRange,
  dayjsFormatServer,
  dateFormatServer,
} from '../../../business/helpers/dateHelpers/dateHelpers';

/** Use this function if the user cannot 'skip' over the next unbookable dates when selecting end
 * For example, there are a set of bookable dates which start and end are within.
 * The end date can be moved to the end of these set of dates but cannot select the next unavailable departure date or anything past that
 */
export const calculateDisabledAfterDateSelectingEnd = (
  unavailabilityDepartureDates: Date[],
  selectedEndDate: Date,
): Date | undefined => {
  for (const unavailableDepartureDate of unavailabilityDepartureDates) {
    if (unavailableDepartureDate.getTime() >= selectedEndDate.getTime()) {
      return dayjs(unavailableDepartureDate).subtract(1, 'day').toDate();
    }
  }
  return undefined;
};

/** If the start date has moved and there is now an unbookable gap between the start and end date
 * Client needs to figure out how to handle this scenario.
 * Simple solution is to set departure to arrival when this occurs
 */
export const isUnbookableGapBetweenStartAndEnd = ({
  arrival,
  departure,
  unavailabilityDepartureDates,
}: {
  arrival: string;
  departure: string;
  unavailabilityDepartureDates: Date[];
}): boolean => {
  for (const unavailableDepartureDate of unavailabilityDepartureDates) {
    if (
      (isDayWithinRange({
        day: dayjs(unavailableDepartureDate),
        start: dayjs(arrival),
        end: dayjs(departure),
      }) ||
        isDayWithinRange({
          day: dayjs(unavailableDepartureDate),
          start: dayjs(departure),
          end: dayjs(arrival),
        })) &&
      !dayjs(unavailableDepartureDate).isSame(dayjs(arrival), 'day')
    ) {
      return true;
    }
  }

  return false;
};

export interface HandleDayClickArgs {
  day: Date;
  currentlySelecting: 'start' | 'end';
  setStartDate: (date: Date) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date) => void;
  setCurrentlySelecting: (selecting: 'start' | 'end') => void;
  callback?: (selecting: 'start' | 'end', day: Date) => void;
  unavailabilityDeparture: Date[];
  onClickStart?: (day: Date, hasUnbookableGap: boolean) => void;
  onClickEnd?: (day: Date) => void;
}
export const handleDayClick = ({
  day,
  currentlySelecting,
  setStartDate,
  endDate,
  setEndDate,
  callback,
  setCurrentlySelecting,
  unavailabilityDeparture,
  onClickEnd,
  onClickStart,
}: HandleDayClickArgs): void => {
  if (currentlySelecting === 'start') {
    setStartDate(day);

    let outerUnbookableGap = false;
    if (endDate) {
      const hasUnbookableGap = isUnbookableGapBetweenStartAndEnd({
        arrival: dayjsFormatServer(dayjs(day)),
        departure: dayjsFormatServer(dayjs(endDate)),
        unavailabilityDepartureDates: unavailabilityDeparture,
      });
      if (hasUnbookableGap) {
        outerUnbookableGap = true;
        setEndDate(day);
      }
    }

    setCurrentlySelecting('end');
    onClickStart && onClickStart(day, outerUnbookableGap);
    callback && callback('end', day);
  } else if (currentlySelecting === 'end') {
    setEndDate(day);
    setCurrentlySelecting('start');
    onClickEnd && onClickEnd(day);
    callback && callback('start', day);
  }
};

export interface CalculateDisabledDatesArgs {
  currentlySelecting: 'start' | 'end';
  unavailabilityDeparture: Date[];
  unavailabilityArrival: Date[];
  canSelectPastDates: boolean;
  endDate: Date | undefined;
  startDate: Date | undefined;
}
export interface CalculateDisabledDatesReturn {
  disabledDays: Date[];
  before?: Date;
  after?: Date;
}
export const calculateDisabledDates = ({
  currentlySelecting,
  unavailabilityArrival,
  unavailabilityDeparture,
  canSelectPastDates,
  endDate,
  startDate,
}: CalculateDisabledDatesArgs): CalculateDisabledDatesReturn => {
  if (currentlySelecting === 'start') {
    if (canSelectPastDates) {
      return { disabledDays: [...unavailabilityArrival] };
    } else {
      return { disabledDays: [...unavailabilityArrival], before: new Date() };
    }
  } else if (currentlySelecting === 'end') {
    const after =
      unavailabilityDeparture && startDate
        ? calculateDisabledAfterDateSelectingEnd(unavailabilityDeparture, endDate ?? startDate)
        : undefined;

    return {
      disabledDays: startDate ? [...unavailabilityDeparture, startDate] : [...unavailabilityDeparture],
      before: startDate,
      after,
    };
  }

  return {
    disabledDays: [],
  };
};

interface CalculateMinNightsDatesArgs {
  minNightsDates: { [key: string]: number }[];
  startDate: Date | undefined;
}
export const calculateMinNightsDates = ({ startDate, minNightsDates }: CalculateMinNightsDatesArgs): Date[] => {
  const minNights: Date[] = [];
  if (!startDate) return minNights;

  for (let i = 0; i < minNightsDates.length; i++) {
    const currMinNightDate = minNightsDates[i];
    const date = Object.keys(currMinNightDate)[0];
    const days = Object.values(currMinNightDate)[0];

    if (date === dateFormatServer(startDate)) {
      for (let j = 1; j < days; j++) {
        const disabledMinNightDate = dayjs(startDate).add(j, 'day').toDate();
        minNights.push(dayjs(disabledMinNightDate).toDate());
      }
    }
  }

  return minNights;
};

export const calculateModifiers = ({
  startDate,
  minNightsDates,
  endDate,
}: CalculateMinNightsDatesArgs & { endDate: Date | undefined }) => {
  // Min nights dates are not selectable but appear as a special form of date with modifier --minNight css class
  const minNightMods = calculateMinNightsDates({
    minNightsDates,
    startDate,
  });

  const modifiers = {
    start: startDate,
    end: endDate,
    minNight: minNightMods,
  };
  return modifiers;
};
