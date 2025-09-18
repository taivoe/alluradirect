import {
  BOOKING_PROPERTY,
  ELIGIBLE_REVIEW,
  FULL_BOOKING,
  REVIEW,
  SPARSE_BOOKING,
  bookingInfo,
  bookingStatus,
  bookingSurcharge,
  bookingSurchargesTotal,
  bookingTax,
  CUSTOM_MESSAGE,
  BOOKING_GUEST_EXISTS,
} from './constants';

export enum OfferTypeId {
  PERCENTAGE = 1,
  DOLLAR = 2,
  FREE_NIGHTS = 3,
  GIFT_CERTIFICATE = 4
}

export enum OfferAvailabilityId {
  AllGuests = 1,
  RepeatGuests = 2,
  SpecificGuest = 3,
}

export enum OfferDistributionId {
  WITHPROPERTYGUIDEBOOK = 1,
  WHENNONREFUNDABLE = 2,
}


interface OfferCommon {
  BLACKOUT_PERIODS: { START: string; END: string }[];
  CODE: string;
  DESCRIPTION: string;
  DISTRIBUTION: string;
  DISTRIBUTION_ID: number;
  DOLLAR: string;
  GIFT_CERTIFICATE_URL: string;
  GUEST_EMAIL: string;
  GUEST_ID: number;
  INSTRUCTIONS: string;
  IS_ALL_PROPERTIES: boolean;
  IS_EDITABLE: boolean;
  IS_ENABLED: boolean;
  IS_PROMOTED: boolean;
  IS_PUBLIC: boolean;
  MAX_USAGE_COUNT: number;
  MIN_NIGHTS: string;
  NIGHTS_FREE: number;
  NIGHTS_REQUIRED: number;
  OFFER_AVAILABILITY_ID: number;
  OFFER_AVAILABLE_END: string;
  OFFER_AVAILABLE_START: string;
  OFFER_CATEGORY: string;
  OFFER_CATEGORY_ID: number;
  OFFER_END: string;
  OFFER_ID: number;
  OFFER_START: string;
  OFFER_TYPE: string;
  OFFER_TYPE_ID: number;
  OFFER_URL: string;
  PERCENTAGE: number;
  PROPERTY_IDS: string;
  STATUS: string;
  TITLE: string;
  USAGE_COUNT: number;
  USER_ID: number;
}

export interface OfferPercent extends OfferCommon {
  OFFER_TYPE_ID: OfferTypeId.PERCENTAGE;
}

export interface OfferDollar extends OfferCommon {
  OFFER_TYPE_ID: OfferTypeId.DOLLAR;
}

export interface OfferNights extends OfferCommon {
  OFFER_TYPE_ID: OfferTypeId.FREE_NIGHTS;
}

export interface OfferGiftCertificate extends OfferCommon {
  OFFER_TYPE_ID: OfferTypeId.GIFT_CERTIFICATE;
}

export type Offer = OfferPercent | OfferDollar | OfferNights | OfferGiftCertificate | undefined | '';

// Full Server Types

// FullBookingRoot is a direct superset of SparseBooking (includes every field that SparseBooking has and adds additional fields)
type FullBookingRoot = typeof FULL_BOOKING;


export type Offers = {
  OWNER: { 
    OFFER: Offer, 
    TOTAL: ''
  },
  ALLURA: { 
    OFFER: Offer, 
    TOTAL: ''
  },
};

// Gift Certificates
export type GiftCertificates = {
  OWNER: { 
    OFFER: Offer, 
    TOTAL: ''
  },
  ALLURA: { 
    OFFER: Offer, 
    TOTAL: ''
  },
};
// Gift Certificates

 export interface iFullBookingRoot extends FullBookingRoot {
   OFFERS: Offers
// Gift Certificates
   ,
   GIFT_CERTIFICATES: GiftCertificates
// Gift Certificates
}


//export interface FullBookingRootPlus = FullBookingRoot & Offers

// INFLATED_BOOKING is used for Partner Bookings as they include fees that are in excess of what the owner will deal with.
// This value is only included in Partner Bookings, and will not show up in a normal booking.

interface InflatedFullBooking extends iFullBookingRoot {
  /** This is the value of the commission fee that will be paid to a partner.
   * This is useful for an owner when they want to know how much commission a guest has paid on their reservation.
   * For instance, an owner may receive $100 for a booking, but the guest would have paid $120.
   * In this case, the commission is $20 */
  PARTNER_COMMISSION_FEE_TOTAL: number;
}


export interface FullBooking extends iFullBookingRoot {
  INFLATED_BOOKING?: InflatedFullBooking;
}

export type SparseBooking = typeof SPARSE_BOOKING;
export type Booking = SparseBooking | FullBooking;

export type Review = typeof REVIEW;
export type EligibleReview = typeof ELIGIBLE_REVIEW;

export type BookingStatus = typeof bookingStatus;
// Booking Client has the dates formatted as Date Objects
export type BookingSurcharge = typeof bookingSurcharge;
export type BookingTax = typeof bookingTax;
export type BookingTaxes = BookingTax[];
export type BookingSurchargesTotal = typeof bookingSurchargesTotal;
export type BookingInfo = typeof bookingInfo;
export type BookingProperty = typeof BOOKING_PROPERTY;
export type BookingGuestExists = typeof BOOKING_GUEST_EXISTS;

// Partial Types / Other
export type CustomMessage = typeof CUSTOM_MESSAGE;

export type RatingRange = 0 | 1 | 2 | 3 | 4 | 5;

export enum BookingSourceNameEnum {
  directVacations = 'DirectVacations.com',
  directVacationsLabel = 'Emails and logos will be sent and branded with DirectVacations.com',
  alluraDirect = 'alluraDirect Vacation Rentals',
  alluraDirectLabel = '*Recommended (Trusted Brand) - Emails and logos will be sent and branded with alluraDirect',
}

export enum BookingStatusId {
  ReservationRequest = 1,
  /* DepositPaidDue
    DepositDue: guest has not made any payments yet (pending reservation). Occurs:
      1. Gateway closed mode, the owner approves a reservation, guest needs to take action to pay first payment
      2. Owner creates custom discounted price booking for the guest, they need to sign into allura after creation to pay
    PaymentDue: upcoming reservation where
      1. Guest has made no payments or
      2. Guest has made deposit payment (has not payed full amount) or
      3. Guest balance owing is > 0
  */
  DepositPaidDue = 2,
  BalancePaid = 3,
  Cancelled = 4,
  ReservationRequestDeclined = 5,
}

// User-facing status
export enum BookingStatusMessage {
  ReservationRequested = 'Reservation Requested',
  DepositDue = 'Deposit Due',
  PaymentDue = 'Payment Due',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  ReservationDeclined = 'Reservation Declined',
  LatePayment = 'Late Payment',
  Completed = 'Completed',

  UnknownStatusId = 'Unknown Status',
}

// See: https://alluradirect.atlassian.net/wiki/spaces/GUEST/pages/995426305/Guest+Reviews+Statuses
export enum ReviewStatusId {
  ADD_REVIEW = 0,
  SUBMITTED = 1,
  AD_APPROVED = 2,
  AD_REJECTED = 3,
  PUBLISHED = 4,
  OWNER_HIDDEN = 5,
  OWNER_DISPUTED = 6,
}

export interface ReviewResponse {
  ID: number;
  RESPONSE: string;
  RESPONSE_DATE: string;
  TITLE: string;
  USER_ROLE: 'owner' | 'guest';
}

export interface RatingItem {
  QUESTION: string;
  MAX_SCORE: number;
  ID: number;
  TITLE: string;
  SCORE: RatingRange;
}

// This object is helpful for getting the params structured properly. However, it is not as ideal as a data structure for
// a form. For instance, NIGHTS does not work for a range select as we would typically want an ARRIVAL and DEPARTURE
// structure

export interface CreateBookingBody {
  ALLURA_GIFT_CERTIFICATE_ID?: number | string;
  ALLURA_GIFT_CERTIFICATE_CODE?: string;
  ALLURA_OFFER_ID?: number | string;
  ALLURA_OFFER_CODE?: string;
  ARRIVAL: string;
  BALANCE_DUE_DATE: string;
  BOOKING_NET: string;
  DAMAGE_DEPOSIT_AMOUNT: string;
  DAMAGE_DEPOSIT_MODE_ID: number | string;
  DEPOSIT_DUE_DATE: string;
  DEPOSIT_PERCENTAGE: number;
  GUEST_EMAIL: string;
  GUEST_FIRST_NAME?: string;
  GUEST_LAST_NAME?: string;
  GUEST_PHONE?: string;
  IS_DIRECT_VACATIONS: boolean;
  NIGHTS: number;
  NOTES_OWNER: string;
  OWNER_GIFT_CERTIFICATE_ID?: number | string;
  OWNER_GIFT_CERTIFICATE_CODE?: string;
  OWNER_OFFER_ID?: number | string;
  OWNER_OFFER_CODE?: string;
  PARTY_SIZE_ADULTS: number;
  PARTY_SIZE_KIDS: number;
  PRICE_PER_NIGHT: number;
  PROPERTY_ID: number;
  SURCHARGE_AMOUNT_CLEANING: number | string;
  SURCHARGE_AMOUNT_PETS: number | string;
  SURCHARGE_IDS: string;
}

export interface EditBookingBody extends CreateBookingBody {
  ID: number;
}

// TODO - move these when we can get RQ working in the shared folder.
// Ideally these would just live next to the hook that uses them.

// The Quote Param is simply an extension of the CreateBookingBody with ARRIVAL and NIGHTS being required
// and the rest are optional. Ideally ,we would be able to create a root level of this interface, with the required
// variables (ARRIVAL, NIGHTS) being included and then have the remainder be required or optional.

export interface QuoteParams {
  // REQUIRED
  ARRIVAL: string;
  NIGHTS: number;

  // OPTIONAL
  ALLURA_GIFT_CERTIFICATE_ID?: number | string;
  ALLURA_GIFT_CERTIFICATE_CODE?: string;
  ALLURA_OFFER_ID?: number | string;
  ALLURA_OFFER_CODE?: string;
  BALANCE_DUE_DATE?: string;
  BOOKING_NET?: string;
  DAMAGE_DEPOSIT_AMOUNT?: number;
  DAMAGE_DEPOSIT_MODE_ID?: number;
  DEPOSIT_DUE_DATE?: string;
  DEPOSIT_PERCENTAGE?: number;
  GUEST_EMAIL?: string;
  GUEST_FIRST_NAME?: string;
  GUEST_LAST_NAME?: string;
  ID?: number;
  IS_DIRECT_VACATIONS?: boolean;
  NOTES_OWNER?: string;
  OWNER_GIFT_CERTIFICATE_ID?: number | string;
  OWNER_GIFT_CERTIFICATE_CODE?: string;
  OWNER_OFFER_ID?: number | string;
  OWNER_OFFER_CODE?: string;
  PARTY_SIZE_ADULTS?: number;
  PARTY_SIZE_KIDS?: number;
  PRICE_PER_NIGHT?: number;
  SURCHARGE_AMOUNT_CLEANING?: number;
  SURCHARGE_AMOUNT_PETS?: number;
  SURCHARGE_IDS?: string;
}

export enum MessageRecipientIdEnum {
  guestToOwner = 1,
  ownerToGuest = 2,
  guestToAllura = 3,
  ownerToAllura = 4,
  alluraToOwner = 5,
  alluraToGuest = 6,
}
/** Endpoint:    `/booking/cancellationDetails/?id=${bookingId}`;*/
export interface CancellationDetails {
  /** The total amount of money that allura has collected from the guest*/
  AMOUNTS_COLLECTED: {
    /** The value of the accommodation, does not include taxes or fees */
    ACCOMMODATION_NET: string;
    /** The total amount that the owner received */
    BANK_DEPOSIT_TOTAL: string;
    /** allura booking subscription commission (paid by Owner) */
    BOOKING_COMMISSION: string;
    /** Currently 3% of all AMOUNTS_COLLECTED minus GUEST_SERVICE_FEE */
    CREDIT_CARD_FEES: string;
    /** Only applicable when Property requires a payment upfront  */
    DAMAGE_DEPOSIT: string;
    /** allura Booking Service Fee (paid by Guest) */
    GUEST_SERVICE_FEE: string;
    /** Only applies to Non Resident Owners - the amount that allura holds */
    NON_RESIDENT_WITHHELD: string;
    /** Net value of surcharges, Pets and Cleaning fee for example */
    SURCHARGES_NET: string;
    TAXES: {
      /** allura can manage taxes for an owner and remit them to the government */
      ALLURA_REMITTED: string;
      /** the owner can manage their own taxes */
      OWNER_RECEIVED: string;
      /** Combined value of owner received and allura remitted */
      TOTAL: string;
    };
    /** The total amount that the guest was charged */
    TOTAL_GUEST_CHARGE: string;
  };
  /** The status of booking at this time (Deposit Paid/Due||Balance Paid) */
  BOOKING_STATUS: BookingStatusId;
  /** The amount that the guest will receive*/
  CANCELLATION_AMOUNT: {
    /** If the Guest Cancels the booking, this is how much the owner must e-transfer to Allura */
    BY_GUEST: string;
    /** If the Owner Cancels the booking, this is how much the owner must e-transfer to Allura */
    BY_OWNER: string;
  };
  CANCELLATION_POLICY: {
    NAME: string;
    HTML: string;
  };
}
