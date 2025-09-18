import dayjs from 'dayjs';
import { BookingStatusId } from '../../../api/booking/types';
import { AccessCodeIdEnum, AccessCodeTypeIDEnum, AccessMethodIdEnum } from '../../../api/ownerFormInputs/types';
import { dateFormatServer, dateFormatShortMonthDay } from '../../helpers/dateHelpers/dateHelpers';
import {
  accessCodeAvailableDate,
  BookingAccessCodeTextEnum,
  canViewAccessCode,
  generateBookingAccessCodeText,
} from './accessToUnit';

describe(accessCodeAvailableDate.name, () => {
  it('correctly turns the arrival date into the access code available date', () => {
    const arrivalDate = '2022-04-11';
    const date = accessCodeAvailableDate(arrivalDate);
    expect(date.year()).toEqual(2022);
    // Months are 0-indexed...
    expect(date.month()).toEqual(3);
    expect(date.date()).toEqual(11);
  });
});

describe(canViewAccessCode.name, () => {
  it(`cannot view access code if booking status is anything other than ${BookingStatusId.BalancePaid}`, () => {
    const arrival = dateFormatServer(dayjs());
    const departure = dateFormatServer(dayjs().add(5, 'days'));
    const nonViewableStatuses = [
      BookingStatusId.ReservationRequest,
      BookingStatusId.DepositPaidDue,
      BookingStatusId.Cancelled,
      BookingStatusId.ReservationRequestDeclined,
    ];

    nonViewableStatuses.forEach(status => {
      expect(
        canViewAccessCode({
          bookingStatusId: status,
          arrival,
          departure,
        }),
      ).toEqual(false);
    });
  });

  it('cannot view access code if booking arrival date is one day in future', () => {
    const arrival = dateFormatServer(dayjs().add(1, 'day'));
    const departure = dateFormatServer(dayjs().add(5, 'days'));

    expect(canViewAccessCode({ bookingStatusId: BookingStatusId.BalancePaid, arrival, departure })).toBe(false);
  });

  it('can view access code if booking arrival date is current date', () => {
    const arrival = dateFormatServer(dayjs());
    const departure = dateFormatServer(dayjs().add(5, 'days'));

    expect(canViewAccessCode({ bookingStatusId: BookingStatusId.BalancePaid, arrival, departure })).toBe(true);
  });

  it('can view access code if current date is within booking arrival and departure dates', () => {
    const arrival = dateFormatServer(dayjs().subtract(1, 'day'));
    const departure = dateFormatServer(dayjs().add(5, 'days'));

    for (let i = 1; i < 5; i++) {
      expect(
        canViewAccessCode({
          bookingStatusId: BookingStatusId.BalancePaid,
          arrival: dateFormatServer(dayjs(arrival).subtract(i, 'days')),
          departure: dateFormatServer(dayjs(departure).subtract(i, 'days')),
        }),
      ).toBe(true);
    }
  });

  it('can view access code if current date is the departure date', () => {
    const arrival = dateFormatServer(dayjs().subtract(5, 'days'));
    const departure = dateFormatServer(dayjs());

    expect(
      canViewAccessCode({
        bookingStatusId: BookingStatusId.BalancePaid,
        arrival,
        departure,
      }),
    ).toBe(true);
  });

  it('cannot view access code if current date is day after departure date', () => {
    const arrival = dateFormatServer(dayjs().subtract(5, 'days'));
    const departure = dateFormatServer(dayjs().subtract(1, 'day'));

    expect(
      canViewAccessCode({
        bookingStatusId: BookingStatusId.BalancePaid,
        arrival,
        departure,
      }),
    ).toBe(false);
  });
});

describe(generateBookingAccessCodeText.name, () => {
  it('is no longer available when booking is cancelled', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.Cancelled,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(1, 'day')),
    });

    expect(result).toBe(BookingAccessCodeTextEnum.noLongerAvailable);
  });

  it('is no longer available when booking reservation request is declined', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.ReservationRequestDeclined,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(1, 'day')),
    });

    expect(result).toBe(BookingAccessCodeTextEnum.noLongerAvailable);
  });

  it('is says to pay deposit first when booking payment is due', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.DepositPaidDue,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs().subtract(5, 'days')),
      departure: dateFormatServer(dayjs().subtract(1, 'day')),
    });

    expect(result).toBe(BookingAccessCodeTextEnum.payDepositFirst);
  });

  it('is no longer available when after departure date', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs().subtract(5, 'days')),
      departure: dateFormatServer(dayjs().subtract(1, 'day')),
    });

    expect(result).toBe(BookingAccessCodeTextEnum.noLongerAvailable);
  });

  it('is available in a month when booking arrival date is in a month', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs().add(1, 'month')),
      departure: dateFormatServer(dayjs().add(2, 'months')),
    });

    expect(result).toBe('Available in a month');
  });

  it('is available in a day when booking arrival date is in a day', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs().add(1, 'day')),
      departure: dateFormatServer(dayjs().add(2, 'days')),
    });

    expect(result).toBe('Available in a day');
  });

  it('displays customDoorCode when conditions are met', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {} as any,
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(2, 'days')),
      customDoorCode: '123',
    });

    expect(result).toBe('123');
  });

  it('displays standard code', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {
        TYPE: { NAME: '', ID: AccessCodeTypeIDEnum.AccessCode },
        METHOD: { NAME: '', ID: AccessMethodIdEnum.Email },
        CODE: { NAME: '', ID: AccessCodeIdEnum.STANDARD_CODE },
        STANDARD_CODE: '222',
      },
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(2, 'days')),
      customDoorCode: '',
    });

    expect(result).toBe('222');
  });

  it('displays customDoorCode even when a standard code is provided', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {
        TYPE: { NAME: '', ID: AccessCodeTypeIDEnum.AccessCode },
        METHOD: { NAME: '', ID: AccessMethodIdEnum.Email },
        CODE: { NAME: '', ID: AccessCodeIdEnum.STANDARD_CODE },
        STANDARD_CODE: '222',
      },
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(2, 'days')),
      customDoorCode: '123',
    });

    expect(result).toBe('123');
  });

  it('tells the guest to contact the host if unique per guest code option is selected but no unique code entered', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: false,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {
        TYPE: { NAME: '', ID: AccessCodeTypeIDEnum.AccessCode },
        METHOD: { NAME: '', ID: AccessMethodIdEnum.Email },
        CODE: { NAME: '', ID: AccessCodeIdEnum.UNIQUE_PER_GUEST },
        STANDARD_CODE: '',
      },
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(2, 'days')),
      customDoorCode: '',
    });

    expect(result).toBe(BookingAccessCodeTextEnum.guestUnavailableDoorCode);
  });

  it('warns the owner to enter an access code when unique per guest mode and no code entered', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: true,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {
        TYPE: { NAME: '', ID: AccessCodeTypeIDEnum.AccessCode },
        METHOD: { NAME: '', ID: AccessMethodIdEnum.Email },
        CODE: { NAME: '', ID: AccessCodeIdEnum.UNIQUE_PER_GUEST },
        STANDARD_CODE: '',
      },
      arrival: dateFormatServer(dayjs()),
      departure: dateFormatServer(dayjs().add(2, 'days')),
      customDoorCode: '',
    });

    expect(result).toBe('Urgent, Due Immediately');
  });

  it('notifies the owner that the unique access code is due soon', () => {
    const result = generateBookingAccessCodeText({
      isOwnerMode: true,
      bookingStatusId: BookingStatusId.BalancePaid,
      accessToUnit: {
        TYPE: { NAME: '', ID: AccessCodeTypeIDEnum.AccessCode },
        METHOD: { NAME: '', ID: AccessMethodIdEnum.Email },
        CODE: { NAME: '', ID: AccessCodeIdEnum.UNIQUE_PER_GUEST },
        STANDARD_CODE: '',
      },
      arrival: dateFormatServer(dayjs().add(11, 'days')),
      departure: dateFormatServer(dayjs().add(12, 'days')),
      customDoorCode: '',
    });

    // subtract 9 days since the access code is available 9 days before arrival
    expect(result).toBe(`Due ${dateFormatShortMonthDay(dayjs().add(11, 'days').subtract(9, 'days'))}`);
  });
});
