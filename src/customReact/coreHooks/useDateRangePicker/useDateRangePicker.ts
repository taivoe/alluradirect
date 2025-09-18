import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { calculateNights } from '../../../business/helpers/dateHelpers/dateHelpers';
import { handleDayClick, calculateDisabledDates, calculateModifiers, CalculateDisabledDatesReturn } from './helpers';

// TODO: missing hovered dates functionality
export interface UseDateRangePickerArgs {
  initialStart?: Date;
  initialEnd?: Date;
  initialMonth?: Date;
  initialCurrentlySelecting?: 'start' | 'end';
  /** Formatted key: YYYY-MM-DD, value: <num_nights> */
  minNightsDates?: { [key: string]: number }[];
  unavailabilityArrival?: Date[];
  unavailabilityDeparture?: Date[];
  canSelectPastDates?: boolean;

  onClickStart?: (day: Date, hasUnbookableGap: boolean) => void;
  onClickEnd?: (day: Date) => void;
}

export const useDateRangePicker = ({
  initialStart,
  initialEnd,
  initialMonth = new Date(),
  initialCurrentlySelecting = 'start',
  minNightsDates = [],
  unavailabilityDeparture = [],
  unavailabilityArrival = [],
  canSelectPastDates = false,
  onClickStart,
  onClickEnd,
}: UseDateRangePickerArgs) => {
  const [startDate, setStartDate] = useState<Date | undefined>(initialStart);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEnd);
  const nights = useMemo(() => {
    return calculateNights({ date1: startDate ?? dayjs(), date2: endDate ?? dayjs() });
  }, [endDate, startDate]);
  const [currentlySelecting, setCurrentlySelecting] = useState<'start' | 'end'>(initialCurrentlySelecting);

  const onDayClick = useCallback(
    (day: Date, callback?: (selecting: 'start' | 'end', day: Date) => void) => {
      return handleDayClick({
        currentlySelecting,
        day,
        endDate,
        setStartDate,
        setEndDate,
        unavailabilityDeparture,
        setCurrentlySelecting,
        callback,
        onClickEnd,
        onClickStart,
      });
    },
    [currentlySelecting, endDate, onClickEnd, onClickStart, unavailabilityDeparture],
  );

  const disabledDates: CalculateDisabledDatesReturn = useMemo(() => {
    return calculateDisabledDates({
      canSelectPastDates,
      currentlySelecting,
      endDate,
      startDate,
      unavailabilityArrival,
      unavailabilityDeparture,
    });
  }, [canSelectPastDates, currentlySelecting, endDate, startDate, unavailabilityArrival, unavailabilityDeparture]);

  const modifiers = useMemo(() => {
    return calculateModifiers({
      minNightsDates,
      endDate,
      startDate,
    });
  }, [endDate, minNightsDates, startDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentlySelecting,
    setCurrentlySelecting,
    onDayClick,
    disabledDates,
    modifiers,
    initialMonth,
    nights,

    /** Re-export so we can pass the return of this hook to the component */
    unavailabilityArrival,
    unavailabilityDeparture,
    canSelectPastDates,
  };
};

export type UseDateRangePickerReturn = ReturnType<typeof useDateRangePicker>;
