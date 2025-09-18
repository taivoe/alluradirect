import { AccessCodeIdEnum, AccessCodeTypeIDEnum, AccessMethodIdEnum } from '../../../api/ownerFormInputs/types';
import { dateFormatShortMonthDay, numberOfDaysUntil, serverStringFormat } from '../../helpers/dateHelpers/dateHelpers';

import { AccessToUnit } from '../../../api/property/types';
import { BookingStatusId } from '../../../api/booking/types';
import dayjs, { Dayjs } from 'dayjs';

/* 
  Guests
  - Can view access codes (door code + other codes) on the day of arrival 
  - Can view access codes on day of departure
  - Cannot view access codes any day before arrival or any day after departure

  Owners
  - Can view their property and door codes at any time
  - Unique per guest codes can be entered at any time
  - Custom message can be entered at any time

*/

/** Guests can view the access code on the day of arrival, owners can view the access code at any time
 * @param arrival is a yyyy-mm-dd formatted string
 */
export function accessCodeAvailableDate(arrival: string): Dayjs {
  return dayjs(arrival, serverStringFormat).hour(0);
}

const isAfterAccessCodeAvailableDate = (departure: string): boolean => {
  const dayAfterDeparture = dayjs(departure).add(1, 'day').hour(0);
  const now = dayjs().hour(0);

  return now.isSame(dayAfterDeparture, 'day') || now.isAfter(dayAfterDeparture, 'day');
};

/** Can the guest view the access code for a specific booking */
export function canViewAccessCode({
  bookingStatusId,
  arrival,
  departure,
}: {
  bookingStatusId: BookingStatusId;
  arrival: string;
  departure: string;
}): boolean {
  if (bookingStatusId !== BookingStatusId.BalancePaid) {
    return false;
  }

  const accessCodeAvailable = accessCodeAvailableDate(arrival);
  const dayAfterDeparture = dayjs(departure).add(1, 'day').hour(0);
  const now = dayjs().hour(0);

  return (
    now.isSame(accessCodeAvailable, 'day') ||
    (now.isAfter(accessCodeAvailable, 'day') && now.isBefore(dayAfterDeparture))
  );
}

/** Owner must enter access codes for a reservation 9 days before the arrival date
 * This is important only when the owner has selected the access code option that requires a unique code for each reservation
 */
export const accessCodeDueDate = (arrival: string) => {
  return dayjs(arrival, serverStringFormat).subtract(9, 'day').hour(0);
};

export function generateAccessCodeDueDate(arrival: string): string {
  const dueDate = accessCodeDueDate(arrival);
  const formattedArrival = dateFormatShortMonthDay(dueDate);
  const numDaysUntilArrival = numberOfDaysUntil(dueDate);

  const dueMessage = `Due ${formattedArrival}`;

  if (numDaysUntilArrival <= 0) {
    return `Urgent, Due Immediately`;
  }

  return `${dueMessage}`;
}

export enum BookingAccessCodeTextEnum {
  noLongerAvailable = 'No Longer Available',
  payDepositFirst = 'Make Payment First',
  providedByHost = 'Provided by Host',
  providedByFrontDesk = 'Provided by Front Desk',
  guestUnavailableDoorCode = 'Unavailable, Contact Host',
}

interface BookingAccessCodeText {
  isOwnerMode: boolean;
  bookingStatusId: BookingStatusId;
  accessToUnit: AccessToUnit;
  arrival: string;
  departure: string;
  customDoorCode?: string;
}
/** Text that will appear for the guest whenever they try to view the door code / access code */
export function generateBookingAccessCodeText({
  isOwnerMode,
  bookingStatusId,
  accessToUnit,
  arrival,
  departure,
  customDoorCode = undefined,
}: BookingAccessCodeText): string {
  if (
    (!isOwnerMode && bookingStatusId === BookingStatusId.Cancelled) ||
    bookingStatusId === BookingStatusId.ReservationRequestDeclined
  ) {
    return BookingAccessCodeTextEnum.noLongerAvailable;
  }

  if (!isOwnerMode && bookingStatusId === BookingStatusId.DepositPaidDue) {
    return BookingAccessCodeTextEnum.payDepositFirst;
  }

  if (!isOwnerMode && !canViewAccessCode({ bookingStatusId, arrival, departure })) {
    if (isAfterAccessCodeAvailableDate(departure)) {
      return BookingAccessCodeTextEnum.noLongerAvailable;
    }

    const today = dayjs().hour(0);
    const viewableDate = accessCodeAvailableDate(arrival);
    const relativeTime = viewableDate.from(today);
    return `Available ${relativeTime}`;
  }

  if (customDoorCode) return customDoorCode;

  const { TYPE, METHOD, CODE, STANDARD_CODE } = accessToUnit;

  switch (TYPE.ID) {
    case AccessCodeTypeIDEnum.AccessCode: {
      if (METHOD.ID === AccessMethodIdEnum.FrontDesk) {
        return BookingAccessCodeTextEnum.providedByFrontDesk;
      } else if (METHOD.ID === AccessMethodIdEnum.Other) {
        return BookingAccessCodeTextEnum.providedByHost;
      } else if (METHOD.ID === AccessMethodIdEnum.Email) {
        if (CODE.ID === AccessCodeIdEnum.STANDARD_CODE) {
          return STANDARD_CODE;
        } else {
          // (CODE.ID === AccessCodeIdEnum.UNIQUE_PER_GUEST)
          // custom door code entered and unique per guest has not been entered
          return isOwnerMode ? generateAccessCodeDueDate(arrival) : BookingAccessCodeTextEnum.guestUnavailableDoorCode;
        }
      } else {
        return BookingAccessCodeTextEnum.providedByHost;
      }
    }
    case AccessCodeTypeIDEnum.PhysicalKeyCard: {
      if (METHOD.ID === AccessMethodIdEnum.FrontDesk) {
        return BookingAccessCodeTextEnum.providedByFrontDesk;
      } else if (METHOD.ID === AccessMethodIdEnum.Other) {
        return BookingAccessCodeTextEnum.providedByHost;
      } else if (METHOD.ID === AccessMethodIdEnum.LockBox) {
        if (CODE.ID === AccessCodeIdEnum.STANDARD_CODE) {
          return STANDARD_CODE;
        } else {
          // (CODE.ID === AccessCodeIdEnum.UNIQUE_PER_GUEST)
          return isOwnerMode ? generateAccessCodeDueDate(arrival) : BookingAccessCodeTextEnum.guestUnavailableDoorCode;
        }
      } else {
        return BookingAccessCodeTextEnum.providedByHost;
      }
    }

    default: {
      return BookingAccessCodeTextEnum.providedByHost;
    }
  }
}

export function generateAccessCodeLabel({ accessToUnit }: { accessToUnit: AccessToUnit }): string {
  switch (accessToUnit.TYPE.ID) {
    case AccessCodeTypeIDEnum.AccessCode: {
      return 'Door Code';
    }

    case AccessCodeTypeIDEnum.PhysicalKeyCard: {
      if (accessToUnit.METHOD.ID === AccessMethodIdEnum.LockBox) {
        return 'Lockbox Access';
      } else {
        return 'Key/Card Access';
      }
    }

    default: {
      return 'Unknown Access Type';
    }
  }
}

function hasSelectedAccessType(typeId: AccessCodeTypeIDEnum | number): boolean {
  return typeId == AccessCodeTypeIDEnum.AccessCode || typeId === AccessCodeTypeIDEnum.PhysicalKeyCard;
}
function hasSelectedAccessMethod(methodId: AccessMethodIdEnum | number): boolean {
  return [
    AccessMethodIdEnum.Email,
    AccessMethodIdEnum.FrontDesk,
    AccessMethodIdEnum.LockBox,
    AccessMethodIdEnum.Other,
  ].includes(methodId);
}
function hasSelectedAccessCode(codeId: AccessCodeIdEnum | number): boolean {
  return [AccessCodeIdEnum.NO_CODE, AccessCodeIdEnum.STANDARD_CODE, AccessCodeIdEnum.UNIQUE_PER_GUEST].includes(codeId);
}

interface AccessOptions {
  codeId: AccessCodeIdEnum;
  methodId: AccessMethodIdEnum;
  typeId: AccessCodeTypeIDEnum;
}

export function accessToUnitSelectedOptions({ codeId, methodId, typeId }: AccessOptions) {
  const hasPropertyAccessType = hasSelectedAccessType(typeId);
  const hasAccessMethod = hasSelectedAccessMethod(methodId);
  const hasAccessCodeSelected = hasSelectedAccessCode(codeId);

  const hasStandardCode = codeId === AccessCodeIdEnum.STANDARD_CODE;
  const hasAccessCode = typeId === AccessCodeTypeIDEnum.AccessCode;
  const hasAccessCodeEmailMethod = methodId === AccessMethodIdEnum.Email;
  const hasKeyLockboxMethod = methodId === AccessMethodIdEnum.LockBox;
  const hasFrontDeskMethod = methodId === AccessMethodIdEnum.FrontDesk;
  const hasOtherDeskMethod = methodId === AccessMethodIdEnum.Other;

  const hasAccessCodeSection = hasAccessMethod && (hasAccessCodeEmailMethod || hasKeyLockboxMethod);

  return {
    hasSelectedPropertyAccessType: hasPropertyAccessType,
    hasSelectedAccessMethod: hasAccessMethod,
    hasSelectedAccessCode: hasAccessCodeSelected,

    hasStandardCode,
    hasAccessCode,
    hasAccessCodeEmailMethod,
    hasKeyLockboxMethod,
    hasFrontDeskMethod,
    hasOtherDeskMethod,

    hasAccessCodeSection,
  };
}
