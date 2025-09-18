import {
  Booking,
  BookingStatusId,
  BookingStatusMessage,
  CustomMessage,
  EditBookingBody,
  FullBooking,
  SparseBooking,
} from '../../../api/booking/types';
import { SurchargeIDEnum, SurchargeNameEnum } from '../../../api/types';
import {
  calculateNights,
  dateFormatServer,
  longMonthFormat,
  numberOfDaysUntil,
  serverStringFormat,
} from '../../helpers/dateHelpers/dateHelpers';
import dayjs, { Dayjs } from 'dayjs';
import { truncate } from '../../helpers/stringHelpers';

import { PropertySurcharge } from '../../../api/property/types';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// Functions defined in this file expect that arrival and departure are serverStringFormat: 'YYYY-MM-DD'

export const hasReview = (booking: SparseBooking) => booking?.REVIEW.ID > 0;
export const hasMadePayment = (booking: SparseBooking) => parseInt(booking?.PAYMENT.PAID_TO_DATE) !== 0;

export const canMakeBookingPayment = (bookingStatusId: BookingStatusId) => {
  return bookingStatusId === BookingStatusId.DepositPaidDue;
};

export const hasVisiblePropertyGuideBookBtn = (bookingStatusId: BookingStatusId, bookingDeparture: string) => {
  return bookingStatusId === BookingStatusId.BalancePaid && !isPastReservation(bookingDeparture);
};

export const hasVisibleRebookPropertyBtn = (bookingDeparture: string) => {
  const today = dayjs();
  const departureDate = dayjs(bookingDeparture, serverStringFormat);

  return today.isSame(departureDate, 'day') || today.isAfter(departureDate, 'day');
};

export const isCurrentReservation = (arrival: string, departure: string) => {
  const arrivalDate = dayjs(arrival, serverStringFormat);
  const departureDate = dayjs(departure, serverStringFormat);
  const now = dayjs();

  return (
    arrivalDate.isSame(now, 'day') ||
    departureDate.isSame(now, 'day') ||
    (arrivalDate.isBefore(now, 'day') && departureDate.isAfter(now, 'day'))
  );
};

export const isPastReservation = (departure: string) => {
  const now = dayjs();
  const departureDate = dayjs(departure, serverStringFormat);

  return !departureDate.isSame(now, 'day') && departureDate.isBefore(now, 'day');
};

type PendingReservationArgs = Pick<Booking, 'STATUS' | 'FLAGS' | 'PAYMENT'>;
export const isPendingReservation = ({ STATUS, FLAGS, PAYMENT }: PendingReservationArgs) => {
  if (STATUS.ID === BookingStatusId.ReservationRequest) {
    return true;
  }
  if (STATUS.ID === BookingStatusId.DepositPaidDue && parseInt(PAYMENT.PAID_TO_DATE) === 0) {
    return true;
  }
  if (FLAGS.IS_PAST_DUE) {
    return true;
  }

  return false;
};

/*  The property guidebook can be viewed if:
    user has payed for the booking (status of balance paid) and
    the current day is between [7-days until arrival ... departure day + 1) [inclusive ... exclusive)
*/
export const canViewPropertyGuidebook = (statusId: BookingStatusId, arrival: string, departure: string) => {
  if (statusId !== BookingStatusId.BalancePaid) {
    return false;
  }

  const now = dayjs();
  const sevenDaysBeforeArrival = dayjs(arrival, serverStringFormat).subtract(7, 'day');
  const dayAfterDeparture = dayjs(departure).add(1, 'day').hour(0);

  return (
    now.isSame(sevenDaysBeforeArrival, 'day') ||
    (now.isAfter(sevenDaysBeforeArrival, 'day') && now.isBefore(dayAfterDeparture))
  );
};

export const propertyGuidebookAvailableDate = (arrival: string) => {
  return dayjs(arrival, serverStringFormat).subtract(7, 'day');
};

export const propertyGuidebookAvailableDateFormatted = (arrival: string) => {
  return propertyGuidebookAvailableDate(arrival).format('MMM D');
};

interface GuestRequestModifyArgs {
  departure: string;
  bookingStatusId: BookingStatusId;
}
/** Comment from Matt: A booking would be adjustable as long as the departure date is not today or in the past.
 * Example:  Dec 11 - Dec 15
 * On the checkout morning of Dec 15, they could NOT adjust it as it wouldnt give the host enough time to approve/adjust pricing
 * The night before the checkout (Dec 14), is a likely scenario to extend the reservation.  “The snow is amazing, lets stay a few more days!”
 *
 * A cancelled booking is not editable
 */
export const canGuestRequestToModifyBooking = ({ departure, bookingStatusId }: GuestRequestModifyArgs): boolean => {
  if (bookingStatusId === BookingStatusId.Cancelled) return false;

  const daysUntilDeparture = numberOfDaysUntil(departure);
  // Departure date is today or in past
  if (daysUntilDeparture <= 0) return false;

  return true;
};

interface HostModifyBookingArgs {
  departure: string;
  bookingStatusId: BookingStatusId;
}
/** Hosts cannot modify a booking that is cancelled or is in the past.
 * This is similar to the guest modify booking except the owner can modify on the last day for added flexibility
 *
 * In the future hosts may need certain permissions to modify a booking (think co-host or property manager with limited ability maybe)
 */
export const canHostModifyBooking = ({ departure, bookingStatusId }: HostModifyBookingArgs): boolean => {
  if (bookingStatusId === BookingStatusId.Cancelled) return false;

  const daysUntilDeparture = numberOfDaysUntil(departure);
  // Departure date is in past
  if (daysUntilDeparture < 0) return false;

  return true;
};

interface HostModifyBookingStartDateArgs {
  arrival: string;
}
/** The host can modify the booking start date up to and including the day of arrival */
export const canHostModifyBookingStartDate = ({ arrival }: HostModifyBookingStartDateArgs): boolean => {
  const daysUntilArrival = numberOfDaysUntil(arrival);
  return daysUntilArrival >= 0;
};

/** Deprecated, use canGuestRequestToModifyBooking instead. Create canHostModifyBooking once details are confirmed */
export const canModifyBooking = (arrival: string, statusId: BookingStatusId) => {
  const daysUntilArrival = numberOfDaysUntil(arrival);

  return daysUntilArrival >= 1 && statusId !== BookingStatusId.Cancelled;
};

export const confirmationPropertyGuidebookText = (statusId: BookingStatusId, arrival: string) => {
  if (statusId === BookingStatusId.DepositPaidDue) {
    return 'after the remaining balance has been paid';
  }

  const sevenDaysBeforeArrival = dayjs(arrival, serverStringFormat).subtract(7, 'day').format(longMonthFormat);

  return sevenDaysBeforeArrival;
};

export const isPaymentButtonVisible = (statusId: BookingStatusId) => {
  // ReservationRequests have payment button disabled
  return statusId === BookingStatusId.DepositPaidDue || statusId === BookingStatusId.ReservationRequest;
};

/** Bookings can only be reviewed if the balance is paid, they are departing or have departed and the booking is less than 2 years in the past */
export const canReviewBooking = (statusId: BookingStatusId, departure: string) => {
  const now = dayjs();
  const departureDate = dayjs(departure, serverStringFormat);

  const yearDifference = Math.abs(dayjs().hour(0).diff(dayjs(departure), 'year'));
  const validYearDifference = yearDifference < 2;

  return (
    statusId === BookingStatusId.BalancePaid &&
    (departureDate.isSame(now, 'day') || departureDate.isBefore(now, 'day')) &&
    validYearDifference
  );
};

export const reservationStatusText = (
  statusId: BookingStatusId,
  isCurrentReservation: boolean,
  hasMadePayment: boolean,
) => {
  switch (statusId) {
    case BookingStatusId.ReservationRequest: {
      return BookingStatusMessage.ReservationRequested;
    }

    case BookingStatusId.DepositPaidDue: {
      if (isCurrentReservation) {
        return BookingStatusMessage.LatePayment;
      }
      if (hasMadePayment) {
        return BookingStatusMessage.PaymentDue;
      }

      return BookingStatusMessage.DepositDue;
    }

    case BookingStatusId.BalancePaid: {
      return BookingStatusMessage.Confirmed;
    }

    case BookingStatusId.Cancelled: {
      return BookingStatusMessage.Cancelled;
    }

    case BookingStatusId.ReservationRequestDeclined: {
      return BookingStatusMessage.ReservationDeclined;
    }

    default: {
      return BookingStatusMessage.UnknownStatusId;
    }
  }
};

export const balanceText = ({
  amountOutstanding,
  statusId,
  balanceDueDate,
  depositDueDate,
  hasMadePayment,
}: {
  amountOutstanding: string;
  statusId: BookingStatusId;
  balanceDueDate: string;
  depositDueDate: string;
  hasMadePayment: boolean;
}) => {
  // Convert negative values (guest is owed damage deposit back) to 0.00.
  const floatAmount = parseFloat(amountOutstanding) > 0 ? parseFloat(amountOutstanding).toFixed(2) : (0).toFixed(2);
  const balanceStr = `${floatAmount}`;
  let detailText = '';

  switch (statusId) {
    case BookingStatusId.ReservationRequest: {
      detailText = 'Pending Confirmation';
      break;
    }

    case BookingStatusId.DepositPaidDue: {
      if (hasMadePayment) {
        detailText = `Due by ${balanceDueDate}`;
      } else {
        detailText = `Due by ${depositDueDate}`;
      }
      break;
    }

    case BookingStatusId.BalancePaid: {
      detailText = 'Paid in Full';
      break;
    }

    case BookingStatusId.Cancelled: {
      detailText = 'Cancelled';
      break;
    }

    default: {
      break;
    }
  }

  return `$${balanceStr} (${detailText})`;
};

export function hasPerGuestMessage(customMessage: CustomMessage): boolean {
  return hasCustomEntryCode(customMessage.ENTRY_CODE) || hasCustomMessage(customMessage.MESSAGE);
}

export function hasCustomMessage(message: string): boolean {
  return message.length > 0;
}

export function hasCustomEntryCode(entryCode: string): boolean {
  return entryCode.length > 0;
}

export function generateCustomMessagePreview(message: string): string {
  const hasMessage = hasCustomMessage(message);

  if (!hasMessage) {
    return 'N/A (Message Not Added)';
  }

  return truncate(message, 100);
}

const generateSurchargeParams = (surcharges: { [key: string]: { IS_ENABLED: boolean; FEE: string } }) => {
  const isPetFeeEnabled = SurchargeNameEnum.pet in surcharges && surcharges.PETS.IS_ENABLED;
  const isCleaningFeeEnabled = SurchargeNameEnum.cleaning in surcharges && surcharges.CLEANING.IS_ENABLED;
  let SURCHARGE_IDS = '';
  let SURCHARGE_AMOUNT_PETS = 0;
  let SURCHARGE_AMOUNT_CLEANING = 0;

  if (isPetFeeEnabled && isCleaningFeeEnabled) {
    const { PETS, CLEANING } = surcharges;

    SURCHARGE_IDS = `${SurchargeIDEnum.cleaningFee},${SurchargeIDEnum.petFee}`;
    SURCHARGE_AMOUNT_PETS = Number(PETS.FEE);
    SURCHARGE_AMOUNT_CLEANING = Number(CLEANING.FEE);
  } else if (isCleaningFeeEnabled) {
    const { CLEANING } = surcharges;

    SURCHARGE_IDS = `${SurchargeIDEnum.cleaningFee}`;
    SURCHARGE_AMOUNT_CLEANING = Number(CLEANING.FEE);
  } else if (isPetFeeEnabled) {
    const { PETS } = surcharges;

    SURCHARGE_IDS = `${SurchargeIDEnum.petFee}`;
    SURCHARGE_AMOUNT_PETS = Number(PETS.FEE);
  }

  return {
    SURCHARGE_IDS,
    SURCHARGE_AMOUNT_PETS,
    SURCHARGE_AMOUNT_CLEANING,
  };
};

// This is for converting an editable booking into the data structure that is used for quotes and
// the body for the edit booking PUT
export const convertBookingServerToParams = (booking: FullBooking): EditBookingBody => {
  const {
    DATES: { ARRIVAL },
    FLAGS: { IS_DIRECT_VACATIONS },
    GUEST: { EMAIL },
    ID,
    NIGHTS,
    NOTES_OWNER,
    PARTY_SIZE: { ADULTS, KIDS },
    PAYMENT: {
      BALANCE: { DUE_DATE: balanceDueDate },
      DAMAGE_DEPOSIT: { AMOUNT: damageDepositAmount, MODE_ID },
      DEPOSIT: { PERCENTAGE, DUE_DATE },
      PRICE_PER_NIGHT,
    },
    PAYMENT_INFORMATION: { BOOKING_NET_BASE_RATE_MINUS_LOS },
    PROPERTY: { ID: PROPERTY_ID },
    SURCHARGES: { LIST },
  } = booking;
  const surchargeParams = generateSurchargeParams(LIST);

  return {
    ...surchargeParams,
    ALLURA_GIFT_CERTIFICATE_CODE: booking.GIFT_CERTIFICATES.ALLURA.OFFER ? booking.GIFT_CERTIFICATES.ALLURA.OFFER.CODE : '',
    ALLURA_GIFT_CERTIFICATE_ID: booking.GIFT_CERTIFICATES.ALLURA.OFFER ? booking.GIFT_CERTIFICATES.ALLURA.OFFER.OFFER_ID : '',
    ALLURA_OFFER_CODE: booking.OFFERS.ALLURA.OFFER ? booking.OFFERS.ALLURA.OFFER.CODE : '',
    ALLURA_OFFER_ID: booking.OFFERS.ALLURA.OFFER ? booking.OFFERS.ALLURA.OFFER.OFFER_ID : '',
    ARRIVAL,
    BALANCE_DUE_DATE: balanceDueDate,
    BOOKING_NET: BOOKING_NET_BASE_RATE_MINUS_LOS,
    DAMAGE_DEPOSIT_AMOUNT: damageDepositAmount,
    DAMAGE_DEPOSIT_MODE_ID: MODE_ID,
    DEPOSIT_PERCENTAGE: PERCENTAGE,
    DEPOSIT_DUE_DATE: DUE_DATE,
    GUEST_EMAIL: EMAIL,
    ID,
    IS_DIRECT_VACATIONS,
    OWNER_GIFT_CERTIFICATE_CODE: booking.GIFT_CERTIFICATES.OWNER.OFFER ? booking.GIFT_CERTIFICATES.OWNER.OFFER.CODE : '',
    OWNER_GIFT_CERTIFICATE_ID: booking.GIFT_CERTIFICATES.OWNER.OFFER ? booking.GIFT_CERTIFICATES.OWNER.OFFER.OFFER_ID : '',
    OWNER_OFFER_CODE: booking.OFFERS.OWNER.OFFER ? booking.OFFERS.OWNER.OFFER.CODE : '',
    OWNER_OFFER_ID: booking.OFFERS.OWNER.OFFER ? booking.OFFERS.OWNER.OFFER.OFFER_ID : '',
    PRICE_PER_NIGHT: Number(PRICE_PER_NIGHT),
    NIGHTS,
    NOTES_OWNER,
    PARTY_SIZE_ADULTS: ADULTS,
    PARTY_SIZE_KIDS: KIDS,
    PROPERTY_ID,
  };
};

// This function will take in a Booking and provide conditionals based
// on the status of the booking

export const generateBookingStatusDetails = (booking: FullBooking) => {
  const {
    PAYMENT: {
      AMOUNT_OUTSTANDING,
      DEPOSIT: { PAYMENT_DATE: DEPOSIT_PAYMENT_DATE, PERCENTAGE },
      DAMAGE_DEPOSIT: { AMOUNT },
    },
  } = booking;

  const hasPaidDeposit = Boolean(DEPOSIT_PAYMENT_DATE);

  const hasPaidFull = Number(AMOUNT_OUTSTANDING) === 0;

  const isFullPayment = Number(PERCENTAGE) === 100;

  const hasDamangeDepositAmount = Number(AMOUNT) > 0;

  return { hasPaidDeposit, hasPaidFull, isFullPayment, hasDamangeDepositAmount };
};

// The Surcharge IDs are used when creating a Booking Quote. A string is sent to the server
export const generateSurchargeIds = (isPetFeeEnabled: boolean, isCleaningFeeEnabled: boolean) => {
  const bothFees = `${SurchargeIDEnum.petFee.toString()},${SurchargeIDEnum.cleaningFee.toString()}`;
  const cleaningFeeID = `${SurchargeIDEnum.cleaningFee.toString()}`;
  const petsFeeID = `${SurchargeIDEnum.petFee.toString()}`;

  if (isPetFeeEnabled && isCleaningFeeEnabled) return bothFees;
  if (isCleaningFeeEnabled) return cleaningFeeID;
  if (isPetFeeEnabled) return petsFeeID;

  return '';
};

export const generateSurchargeData = (surcharges: PropertySurcharge[]) => {
  const petFee = surcharges.find(item => item.ID === SurchargeIDEnum.petFee);
  const cleaningFee = surcharges.find(item => item.ID === SurchargeIDEnum.cleaningFee);

  const { AMOUNT: petFeeAmount, IS_ENABLED: isPetFeeEnabled } = petFee as PropertySurcharge;
  const { AMOUNT: cleaningFeeAmount, IS_ENABLED: isCleaningFeeEnabled } = cleaningFee as PropertySurcharge;

  const surchargeIds = generateSurchargeIds(isPetFeeEnabled, isCleaningFeeEnabled);

  return {
    petFeeAmount,
    isPetFeeEnabled,
    cleaningFeeAmount,
    isCleaningFeeEnabled,
    surchargeIds,
  };
};

// A property will have a setting that determines how many days prior to
// arrival that a booking must be paid in full. When creating a new booking,
// if today's data is after that limit relative to arrival, then 100% of the balance is due.
export const calculateIsWithinBalanceDate = (arrival: Dayjs, balanceDaysBefore: number) => {
  const nightsUntilArrival = calculateNights({
    date1: new Date(),
    date2: arrival,
  });

  return nightsUntilArrival <= balanceDaysBefore;
};

// When a rate quote fails, we still need to be able to produce the data necessary to continue the process.
// This function will take information about the property and generate a large majority of the data required
// to continue the process.

export const generateRateQuoteErrorData = (
  start: Dayjs,
  balanceDaysBeforeArrival: number,
  propertyDepositPercentage: number,
) => {
  const today = dayjs();
  const arrivalDayJs = dayjs(start);
  const dateDifference = arrivalDayJs.diff(today, 'day');
  const isWithinBalanceDaysBeforeArrival = dateDifference <= balanceDaysBeforeArrival;
  const balanceDueDate = dateFormatServer(arrivalDayJs.subtract(balanceDaysBeforeArrival, 'day').toDate());
  const BALANCE_DUE_DATE = isWithinBalanceDaysBeforeArrival ? dateFormatServer(today) : balanceDueDate;
  const DEPOSIT_PERCENTAGE = isWithinBalanceDaysBeforeArrival ? 100 : propertyDepositPercentage;
  const DEPOSIT_DUE_DATE = dateFormatServer(new Date());

  return {
    PRICE_PER_NIGHT: 0,
    BOOKING_NET: '',
    BALANCE_DUE_DATE,
    DEPOSIT_DUE_DATE,
    DEPOSIT_PERCENTAGE,
  };
};

export const isDamageDepositCollected = (booking: FullBooking) => {
  return booking.PAYMENT.DAMAGE_DEPOSIT.IS_COLLECTED;
};
