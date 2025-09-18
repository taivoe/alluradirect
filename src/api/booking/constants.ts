import { ACCESS_TO_UNIT, PROPERTY_CODES, PROPERTY_RULES } from '../property/constants';
import {
  BOOKING_SURCHARGES,
  DIRECT_VACATIONS,
  address,
  contactTracingGuest,
  propertyOwner,
  serviceFee,
  tax,
  taxItem,
  taxSurcharge,
  totalsPaid,
  transaction,
} from '../constants';
import {
  BookingStatusId,
  MessageRecipientIdEnum,
  RatingItem,
  RatingRange,
  ReviewResponse,
  ReviewStatusId,
} from './types';
import { BookingGateWayModeIdEnum, EmergencyContact, JoinStatusIDEnum } from '../property/types';

import { DamageDepositModeId, WithRequiredProperty } from '../types';
import { GUEST_PROFILE, USER } from '../user/constants';
import { User } from '../user/types';

export const bookingStatus = {
  DATE: '',
  IS_DONE: true,
  LABEL: '',
};

export const bookingInfo = {
  RESORT: '',
  NIGHTS: 0,
  ARRIVAL: '',
  DEPARTURE: '',
  DEVELOPMENT: '',
  REFERENCE: '',
  CONFIRMED: '',
  ID: 0,
  PROPERTY_IMAGE: '',
};

const inquiry = {
  GUEST_ID: 0,
  MESSAGE: '',
  PROPERTY_ID: 0,
  SUBJECT: '',
  TO_EMAILS: '',
  DATE_SENT: '',
  MESSAGE_RECIPIENT_ID: MessageRecipientIdEnum.guestToOwner,
  FROM_EMAIL: '',
  TIME_SENT: '',
  BOOKING_ID: 0,
  ID: 0,
  INQUIRY_ID: 0,
};

export const reviewRating = {
  QUESTION: '',
  MAX_SCORE: '',
  ID: 0,
  TITLE: '',
  SCORE: 0 as RatingRange,
};

export const reviewResponses = {
  ID: 0,
  CHECKIN_DATE: '',
  CHECKOUT_DATE: '',
  BOOKING_NUMBER: '',
  HOST_NAME: '',
  HOST_RECOMMENDATION: false,
  HOST_COMMENTS: '',
  HAS_COMMENT_ENABLED: false,
};

export const ELIGIBLE_REVIEW = {
  BOOKING_INFO: bookingInfo,
  ID: 0,
  IS_GUEST_RESPONSE_POSSIBLE: false,
  IS_PUBLISHED: false,
  STATUS: '',
  STATUS_ID: 0 as ReviewStatusId,
};

// review extends fields from ELIGIBLE_REVIEW
export const REVIEW = Object.freeze({
  ...ELIGIBLE_REVIEW,
  PRIVATE_MESSAGE_TO_OWNER: '',
  REVIEW: '',
  GUEST_INFO: {} as any, // TODO: get actual guest info format
  PUBLISHED_DATE: '',
  RATINGS: [] as RatingItem[],
  RATINGS_AVERAGE: 0,
  RESPONSES: [] as ReviewResponse[],
  REVIEW_DATE: '',
  TITLE: '',
  WOULD_RECOMMEND: false,
});

const SURCHARGE = {
  IS_ENABLED: false,
  NAME: '',
  ID: 0,
  AMOUNT: '',
};

const sparseProperty = {
  RULES: {
    CHECK_IN: '',
    CHECK_OUT: '',
    MAX_GUESTS: '',
    MIN_AGE_TO_BOOK: 0,
    MAX_BOOKABLE_DAYS: 0,
    QUIET_TIME: 0,
  },
  ADDRESS: {
    UNIT: '',
    RESORT: '',
    DEVELOPMENT: '',
    STREET_NAME: '',
    STREET_NUMBER: '',
  },
  JOIN_STATUS: {
    STATUS_ID: 0 as JoinStatusIDEnum,
  },
  ID: 0,
  THUMBNAIL_URL: '',
  ACCESS_TO_UNIT,
  CODES: PROPERTY_CODES,
  PRIMARY_CONTACT: {
    COMPANY_NAME: '',
    DESCRIPTION: '',
    EMAIL: '',
    FIRST_NAME: '',
    ID: 0,
    IS_COMPANY: false,
    LAST_NAME: '',
    PHONE: '',
    TYPE: '',
    TYPE_ID: 1,
    THUMBNAIL_URL: '',
  } as EmergencyContact & { THUMBNAIL_URL: string },
};

const sparseBookingDates = {
  ARRIVAL: '',
  BOOKING: '',
  BOOKING_TIME: '',
  CHECK_IN_SENT: '',
  DEPARTURE: '',
  SERVER_TIMESTAMP: '',
};

const fullBookingDates = {
  ...sparseBookingDates,
  NEXT_PAYMENT: '',
  PROPERTY_GUIDEBOOK_SEND: '',
};

export const BOOKING_PROPERTY = {
  ...sparseProperty,
  ADDRESS: address,
  DIRECT_VACATIONS,
  DAMAGE_DEPOSIT: {
    AMOUNT: '',
    DESCRIPTION: '',
    ID: 0,
    IS_COLLECTED: false,
    MODE: '',
  },
  GATEWAY_MODE: {
    ID: 0 as BookingGateWayModeIdEnum,
    VALUE: '',
  },
  RULES: PROPERTY_RULES,
  IS_ENABLED: false,
  MAX_GUESTS: 0,
  NAME: '',
  SIZE_CATEGORY: '',
  SQUARE_FEET: 0,
  SURCHARGES: {
    PETS: SURCHARGE,
    CLEANING: SURCHARGE,
  },
  STYLE: '',
  URL: '',
};

const sparseDamageDeposit = {
  MODE: '',
  MODE_ID: DamageDepositModeId.COLLECT_AT_CHECKIN,
};

const fullDamageDeposit = {
  ...sparseDamageDeposit,
  AMOUNT: '',
  DUE_DATE: '',
  IS_COLLECTED: false,
};

const sparsePayment = {
  AMOUNT_OUTSTANDING: '',
  AMOUNT_REFUNDED: '',
  BALANCE: {
    DUE_DATE: '',
    PAYMENT_DATE: '',
    TOTAL: '',
  },
  BOOKING_NET: '',
  DAMAGE_DEPOSIT: {
    MODE: '',
    MODE_ID: 0 as DamageDepositModeId,
  },
  DEPOSIT: { DUE_DATE: '', PAYMENT_DATE: '', TOTAL: '' },
  NEXT_PAYMENT: {
    DUE_DATE: '',
    IS_PAST_DUE: false,
    NAME: '',
    TOTAL: '',
  },
  PAID_TO_DATE: '',
};

export const fullPayment = {
  ...sparsePayment,
  DAMAGE_DEPOSIT: fullDamageDeposit,
  DEPOSIT: {
    AMOUNT: '',
    DUE_DATE: '',
    NET: '',
    PAYMENT_DATE: '',
    PERCENTAGE: 0,
    TOTAL: '',
  },
  BOOKING_NET: '',
  BOOKING_GROSS: '',
  PAID_TO_DATE: '',
  PRICE_PER_NIGHT: '',
  TAXES_AND_FEES_TOTAL: '',
  LOS_DISCOUNT : ''
};

const sparseFlags = {
  IS_PAST_DUE: false,
};

const fullFlags = {
  ...sparseFlags,
  IS_ALLURA_BOOKING: false,
  IS_BLOCK_OFF: false,
  IS_DIRECT_VACATIONS: false,
  IS_EDITABLE: false,
  IS_INNTOPIA_BOOKING: false,
  IS_LMVR_PARTNER_BOOKING: false,
  IS_LMVR_PM_BOOKING: false,
};

export const BOOKING_STATUS = {
  ID: BookingStatusId.DepositPaidDue,
  NAME: '',
};

export const CUSTOM_MESSAGE = { MESSAGE: '', ENTRY_CODE: '' };

const PROPERTY_MANAGER_SERVICE_FEE = {
  IS_FEE_ON_SUBTOTAL_TO_OWNER: false,
  NET: '',
  TAXES: [taxItem],
  TOTAL: '',
};

const TAX = {
  RATE_TOTAL: 0,
  /** Taxes aplied to the accomodation/booking subtotal (PAYMENT.BOOKING_NET)
   * This can be an empty array due to the rulesets below:
   * 
  # Bookings and Surcharges on Inntopia (Partner Bookings)
  * will have GST applied, if an owner collects GST and has supplied a GST Number
  * if rental in BC, has PST and MRDT applied

  # Bookings on alluraDirect
  * will have GST applied, if an owner collects GST and has supplied a GST Number, and if the booking is under 30 nights, else it is GST exempt and the tax is not applied
  * if rental in BC, has PST and MRDT applied if the booking is under 27 nights, else it is PST/MRDT exempt and those taxes are not applied
  * if rental in PQ, has QST and MTLT applied if owner decides to charge and remit these taxes
   */
  BOOKING: [taxItem],
  BOOKING_AND_FEES: [taxItem],
  BOOKING_AND_FEES_TOTAL: 0,
  PERCENTAGES: '',
  TOTAL: 0,
  TOTALS: [taxItem],
  WITHHELD: {
    GST: '',
    PST: '',
    MRDT: '',
  },
};

const sparsePartySize = {
  ADULTS: 0,
  KIDS: 0,
};

const fullPartySize = {
  ...sparsePartySize,
  MAX: 0,
};

// Minimal booking information. The FULL_BOOKING object contains all of this object's fields and adds additional information
export const SPARSE_BOOKING = {
  CUSTOM_MESSAGE,
  DATES: sparseBookingDates,
  FLAGS: sparseFlags,
  GUEST: {
    AGE: '',
    EMAIL: '',
    FIRST_NAME: '',
    GUEST_PROFILE,
    ID: -1,
    IS_AGE_VERIFIED: false,
    IS_EMAIL_VERIFIED: false,
    IS_SMS_VERIFIED: false,
    LAST_NAME: '',
    PHONE: '',
    THUMBNAIL: '',
  },
  GUEST_COMMENT: '',
  GUEST_REQUESTS: '',
  ID: 0,
  NIGHTS: 0,
  NIGHTLY_RATES: [
    {
      DATE: '',
      DAY: '',
      RATE: '',
      BASE_RATE: '',
      LOS_DISCOUNT: '',
      OFFER_DISCOUNT: '',
    },
  ],
  NOTES_OWNER: '',
  PARTY_SIZE: sparsePartySize,
  PAYMENT: sparsePayment,
  PAYMENT_INFORMATION: {
    ACCOMMODATION_SUBTOTAL: '',
    ALLURA_OFFER_DISCOUNT: '',
    BOOKING_NET_BASE_RATE: '',
    BOOKING_NET_BASE_RATE_MINUS_LOS: '',
    LENGTH_OF_STAY_DISCOUNT: '',
    OWNER_OFFER_DISCOUNT: '',
  },
  PROPERTY: sparseProperty,
  REFERENCE: '',
  REVIEW: { ID: 0 },
  SOURCE: '',
  STATUS: BOOKING_STATUS,
  STATUSES: [bookingStatus],
  SURCHARGES: {
    NET: '',
    TAXES_TOTAL: '',
  },
  TAX: {
    TOTAL: '',
  },
  TOTAL: '',
};

// Extends all fields from SPARSE_BOOKING
export const FULL_BOOKING = {
  ...SPARSE_BOOKING,
  /** Total credit card processing fee on this booking.
   *  Deducted from net amount owner recieves for a booking
   *  Calculated from (accomodation + surcharges) x 0.3 = CREDIT_CARD_FEE
   */
  COMMISSION: '',
  CREDIT_CARD_FEE: '',
  /** Percentage fee deducted from the accomodation + surcharges total  */
  CREDIT_CARD_PERCENTAGE: 0,
  /** The total amount that the owner will receive for this booking after all other deductions and additions */
  BANK_DEPOSIT: {
    AMOUNT: '',
    DATE: '',
    ACCOUNT: '',
  },
  BLOCK_OFF_REASON: '',
  CONTACT_TRACING: [contactTracingGuest],
  DATES: fullBookingDates,
  FLAGS: fullFlags,
  GUEST: { ...USER } as WithRequiredProperty<User, 'GUEST_PROFILE'>,
  GUEST_COMMENT: '',
  INQUIRIES: [] as typeof inquiry[],
  NR6_PERCENTAGE: '',
  NR6_WITHHELD: '',
  PARTNER: {
    INFLATION_TOTAL: 0,
  },
  PARTY_SIZE: fullPartySize,
  PAYMENT: fullPayment,
  PROPERTY: BOOKING_PROPERTY,
  PROPERTY_GUIDEBOOK_SEND_DATE: '',
  PROPERTY_MANAGER_SERVICE_FEE,
  PROPERTY_OWNER: propertyOwner,
  REVIEW: REVIEW,
  SERVICE_FEE: serviceFee,
  SURCHARGES: BOOKING_SURCHARGES,
  /** Taxes applied to the accommodation subtotal */
  TAX,
  THUMBNAIL_URL: '',
  TOTALS_PAID: totalsPaid,
  TRANSACTIONS: [transaction],
  TIMELINE: [
    {
      DATE: '',
      TITLE: '',
      IS_COMPLETED: false,
    },
  ],
};

export const bookingSurcharge = {
  FEE: '',
  ID: 0,
  NAME: '',
  TAX: '',
  Taxes: taxSurcharge,
};

export const bookingSurchargesTotal = {
  TAXES_TOTAL: 0,
  LIST: [],
  NET: '',
  GROSS: '',
  TAXES_TOTALS: '',
};

export const bookingTax = {
  ...tax,
  RATE: 0,
  IS_PASS_THROUGH_TO_OWNER: false,
};

export const BOOKING_GUEST_EXISTS = { IS_EXISTING_GUEST: false };
