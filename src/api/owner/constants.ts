import { JoinStatusIDEnum, PropertySubscriptionTierIdEnum, PropertySurcharge } from '../property/types';
import { RESERVATION_SETTINGS, address } from '../constants';
import { MobileWalkThroughNameEnum, RenewalFeesItem, RenewalTypeItem } from './types';

import { EXTERNAL_EVENT } from '../property/constants';
import { SubscriptionTier } from '../ownerFormInputs/types';
import { User } from '../user/types';
import { USER } from '../user/constants';
import { WithRequiredProperty } from '../types';

// TODO: this object should be in the same format as the Property object
export const OWNER_PROPERTY = {
  ACTIVE_SINCE: '',
  ADDRESS: address,
  CAN_RENEW: true,
  COMPLETION_PERCENTAGE: 0,
  DAYS_TO_EXPIRY: 0,
  DAMAGE_DEPOSIT_MODE_ID: 0,
  EXPIRY_DATE: '',
  HAS_COMPLETED_ONBOARDING: false,
  HAS_SUBSCRIPTION_RECEIPT: false,
  ID: 0,
  IS_ENABLED: true,
  JOIN_STATUS: '',
  JOIN_STATUS_ID: 0 as JoinStatusIDEnum,
  NAME: '',
  NUM_BATHROOMS: 0,
  NUM_BEDROOMS: 0,
  SIZE_CATEGORY: '',
  THUMBNAIL: '',
  SUBSCRIPTION_TIER: {
    NAME: '',
    ID: 0 as PropertySubscriptionTierIdEnum,
    DESCRIPTION: '',
  },
  LISTING_QUALITY: {
    MESSAGE: '',
    STAR_RATING: 0,
  },
  SURCHARGES: [] as PropertySurcharge[],
  RESERVATION_SETTINGS,
};

export const OWNER_MEMBERSHIP_RENEWAL_INFO = {
  IS_ACTIVATION: false,
  IS_ALLURA_ADMIN: false,
  RENEWAL_TYPE: '',
  OWNER: { ...USER } as WithRequiredProperty<User, 'OWNER_PROFILE'>,
  OWNER_ID: '',
  PROPERTY_ID: '',
  PROPERTY_NAME: '',
  RENEWAL_DURATION: '',
  RENEWAL_EXPIRY_DATE: '',
  RENEWAL_FEES: {} as RenewalFeesItem,
  RENEWAL_PAYMENT_OPTIONS: [] as RenewalTypeItem[],
  STRIPE_PUBLISHABLE_KEY: '',
  STRIPE_CUSTOMER: {},
  SUBSCRIPTION_TIERS: [] as SubscriptionTier[],
  RENEWAL_PAYMENT_TYPE: '',
};

const FINANCES_SUMMARY_SECTION = {
  NON_RESIDENT_WITHHELD: '',
  TAXES: [
    {
      OWNER_REMIT_AMOUNT: '',
      NAME: '',
      ID: 0,
      AMOUNT: '',
    },
  ],
  CREDIT_CARD_FEES: '',
  COMMISSION: '',
  RESERVATIONS_COUNT: 0,
  SURCHARGES_AMOUNT: '',
  RESERVATIONS_AMOUNT: '',
};

export const FINANCES_SUMMARY = {
  PROPERTY_ID: 0,
  PROPERTY_ADDRESS: '',
  PROPERTY_THUMBNAIL_URL: '',
  UPCOMING: FINANCES_SUMMARY_SECTION,
  TOTAL: FINANCES_SUMMARY_SECTION,
  PAID: FINANCES_SUMMARY_SECTION,
};

export const OWNER_FINANCES_SUMMARY = {
  OWNER_ID: 0,
  PROPERTIES: [FINANCES_SUMMARY],
  GROSS_VALUES: {
    UPCOMING: '',
    TOTAL: '',
    PAID: '',
  },
};

export const OWNER_FINANCES_TRANSACTION = {
  BOOKING_DATES: '',
  BOOKING_ID: 0,
  BOOKING_REFERENCE: '',
  DETAIL_ID: 0,
  GUEST_NAME: '',
  PROPERTY_ID: 0,
  TRANSFER_AMOUNT: '',
  TRANSFER_DATE: '',
  TRANSFER_DETAILS: '',
};
export const OWNER_FINANCES_TRANSACTIONS = {
  OWNER_ID: 0,
  TRANSACTIONS: [OWNER_FINANCES_TRANSACTION],
};
export const OWNER_FINANCES_RESERVATIONS_COLUMN = {
  NAME: '',
  KEY: '',
};

export const OWNER_FINANCES_RESERVATIONS_TRANSACTION = {
  arrival_date: '',
  bank_deposit: '0',
  booking_id: 0,
  booking_ref: '',
  booking_status: '',
  commission_gst: '',
  commission_net: '',
  credit_card_fee: '0',
  damage_deposit: '',
  gst: '',
  guest_name: '',
  mrdt: '',
  non_resident_withheld: '',
  number_of_nights: 0,
  payment_category: '',
  property_id: 0,
  property_manager_service_fee: '',
  property_manager_service_fee_tax: '',
  pst: '',
  qst: '',
  service_fee_total: '',
  surcharge_gst: '',
  surcharge_mrdt: '',
  surcharge_net: '',
  surcharge_pst: '',
  surcharge_qst: '',
  transaction_amount: '',
  transaction_date: '',
  transaction_id: 0,
  transfer_date: '',
};

export const OWNER_FINANCES_RESERVATIONS = {
  PROPERTY_ID: '',
  OWNER_ID: 0,
  COLUMNS: [OWNER_FINANCES_RESERVATIONS_COLUMN],
  TRANSACTIONS: [OWNER_FINANCES_RESERVATIONS_TRANSACTION],
};

export const OWNER_MINIMAL_PROPERTY = {
  ID: 0,
  TITLE: '',
  THUMBNAIL: '',
};

export const OWNER_EXTERNAL_EVENTS = {
  PROPERTIES: [
    {
      PROPERTY: OWNER_MINIMAL_PROPERTY,
      EXTERNAL_BOOKINGS: [EXTERNAL_EVENT],
    },
  ],
  OWNER_ID: '',
};

export const OWNER_BLOCKED_DATE = {
  ARRIVAL: '',
  DEPARTURE: '',
  BOOKING_ID: 0,
  TITLE: '',
  DESCRIPTION: '',
};

export const OWNER_MIN_NIGHT_GAP = {
  PROPERTY_ID: 0,
  START: '',
  MIN_NIGHTS: 0,
  AVAILABLE_NIGHTS: 0,
  END: '',
};

export const OWNER_UNBOOKABLE_DATES = {
  OWNER_ID: '',
  PROPERTIES: [
    {
      PROPERTY: OWNER_MINIMAL_PROPERTY,
      BLOCKED_DATES: [OWNER_BLOCKED_DATE],
      MIN_NIGHT_GAPS: [OWNER_MIN_NIGHT_GAP],
      LAST_AVAILABLE_DATE: '',
    },
  ],
};

export const OWNER_MOBILE_WALKTHROUGH = {
  WALKTHROUGH_MOBILE: {
    COMPLETED_STEPS: [] as MobileWalkThroughNameEnum[],
    COMPLETION_PERCENTAGE: 0,
    NUM_STEPS: 0,
    STEPS: [
      MobileWalkThroughNameEnum.download,
      MobileWalkThroughNameEnum.introduction,
      MobileWalkThroughNameEnum.installation,
    ],
  },
};
