import { AccessCodeIdEnum, AccessCodeTypeIDEnum, AccessMethodIdEnum } from '../ownerFormInputs/types';
import { Amenity, DamageDepositModeId, WithRequiredProperty } from '../types';
import {
  Bathroom,
  Bedroom,
  EmergencyContact,
  GuidebookWalkthrough,
  GuidebookWizardFormNamesEnum,
  JoinStatusIDEnum,
  NoRatesDate,
  Photo,
  Policy,
  PricingStrategyEnum,
  PropertySubscriptionTierIdEnum,
  RateAvailabilityIdEnum,
  RateGroup,
  RateInsightLevelIdEnum,
  RatesSettingsWeekendPremiumId,
  ServerRateSchedule,
} from './types';
import { CANCELLATION_POLICY, DIRECT_VACATIONS, address } from '../constants';
import { OptionalSubformsEnum, RequiredSubformsEnum } from '../subformNames';

import { EventTypeEnum } from './types';
import { RESERVATION_SETTINGS } from '../constants';
import { ReviewStatusId } from '../booking/types';
import { User, UserRoleIDEnum } from '../user/types';
import { PropertyPermission, USER } from '../user/constants';

export const RATES_SETTINGS = {
  /** Every month, extend the users rate schedule up to their availability window, cannot be use when availability window is unrestricted */
  IS_AVAILABILITY_AUTOMATION_ENABLED: false,
  /** AKA Pricing insights/Smart Pricing data
   * If true then the property has the option to enable optimized pricing */
  HAS_RATE_INSIGHTS_DATA: false,
  /** Every month, optimize the users rate schedule using the smart pricing level set
   *  Each date range can have its own smart pricing level, otherwise uses the property-level smart pricing level */
  IS_OPTIMIZED_PRICING_ENABLED: false,
  NO_RATES_DATES: [] as NoRatesDate[],
  PRICING_STRATEGY: {
    ID: 0 as PricingStrategyEnum,
    RATE_INSIGHTS_LEVEL_ID: 0 as RateInsightLevelIdEnum,
  },
  WEEKEND_PREMIUM: {
    ID: 0 as RatesSettingsWeekendPremiumId,
    DOLLAR_AMOUNT: 0,
    PERCENTAGE_AMOUNT: 0,
  },
  AVAILABILITY_WINDOW: {
    ID: 0 as RateAvailabilityIdEnum,
  },
  DATE_LAST_SAVED: '',
  RATE_GROUPS: {
    HIGH: {} as RateGroup,
    LOW: {} as RateGroup,
    PRIME: {} as RateGroup,
    MID: {} as RateGroup,
  },
  DISCOUNT_GROUP: {
    TEN_DAY: 0,
    SEVEN_DAY: 0,
    FIVE_DAY: 0,
    ID: 0,
  },
  ID: 0,
};

const AMENITIES = {
  BUILDING: { TYPE: 'BUILDING', LIST: [] as Amenity[] },
  ESSENTIAL: { TYPE: 'ESSENTIAL', LIST: [] as Amenity[] },
  KITCHEN: { TYPE: 'KITCHEN', LIST: [] as Amenity[] },
  PRIVATE: { TYPE: 'PRIVATE', LIST: [] as Amenity[] },
  SAFETY: { TYPE: 'SAFETY', LIST: [] as Amenity[] },
};

export const ACCESS_TO_UNIT = {
  CODE: { NAME: '', ID: 0 as AccessCodeIdEnum },
  METHOD: { NAME: '', ID: 0 as AccessMethodIdEnum },
  /** STANDARD_CODE and FRONT_DOOR_CODE are linked for a property */
  STANDARD_CODE: '',
  TYPE: { NAME: '', ID: 0 as AccessCodeTypeIDEnum },
};

const BANKING = {
  ACCOUNTHOLDER: {
    ADDRESS: address,
    COMPANY_NAME: '',
    FIRST_NAME: '',
    IS_COMPANY: false,
    LAST_NAME: '',
  },
  BANK: {
    ACCOUNT_NUMBER: '',
    INSTITUTION: '',
    NAME: '',
    TRANSIT: '',
    ID: 0,
  },
};

const CLEANING_PROTOCOL = {
  HAS_AUTOMATIC_BUFFER_DAYS: false,
  IS_APPLY_TO_EXISTING_BOOKINGS: false,
  NUMBER_OF_BLOCKOFF_DAYS: 0,
};

export const SURCHARGE = {
  AMOUNT: '',
  ID: 0,
  IS_ENABLED: false,
  NAME: '',
};
export const PROPERTY_SURCHARGES = {
  CLEANING: SURCHARGE,
  PETS: SURCHARGE,
};
const SUITABILITY = {
  ID: 0,
  DESCRIPTION: '',
  IS_SUITABLE: false,
  NAME: '',
};
const SUITABILITIES = {
  LONG_TERM_RENTALS: SUITABILITY,
  PARTIES_EVENTS: SUITABILITY,
  PETS: SUITABILITY,
  SMOKING: SUITABILITY,
  TRAVEL_RESELLERS: SUITABILITY,
  WHEELCHAIR_ACCESSIBLE: SUITABILITY,
};

const TAX = {
  IS_MANDATORY: false,
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: '',
  ID: 0,
  RATE: 0,
  REGISTRATION_NUMBER: '',
  DESCRIPTION: '',
};

const TAXES = [] as typeof TAX[];

export const ITN_INFORMATION = {
  ID: 0,
  ITN: 0,
  PERCENTAGE_OWNERSHIP: 0,
  DOB: '',
  FIRST_NAME: '',
  LAST_NAME: '',
};

export const NON_RESIDENT = {
  ITN_INFO: [ITN_INFORMATION],
  IS_NON_RESIDENT: false,
  WITHHOLDING_PERCENTAGE: 0,
};

export const PROPERTY_CODES = {
  BIKE_LOCKER_CODE: '',
  /** Used for building entrance when a single door code is not sufficient */
  DEVELOPMENT_DOOR_CODE: '',
  /** Used for sauna and steam room */
  DEVELOPMENT_GYM_CODE: '',
  DEVELOPMENT_HOT_TUB_CODE: '',
  /** Used for pool and hot-tub */
  DEVELOPMENT_POOL_CODE: '',
  DEVELOPMENT_SAUNA_CODE: '',
  DEVELOPMENT_STEAM_ROOM_CODE: '',
  /** Used for access to unit/building. This is linked to the ACCESS_TO_UNIT STANDARD_CODE field */
  FRONT_DOOR_CODE: '',
  GAMES_REC_ROOM_CODE: '',
  GARAGE_DOOR_CODE: '',
  GARBAGE_RECYCLING_CODE: '',
  ID: 0,
  INTERNET_NETWORK_NAME: '',
  INTERNET_PASSWORD: '',
  PHONE_NUMBER: '',
  PROPERTY_ID: '',
  SKI_LOCKER_CODE: '',
  DATE_LAST_UPDATED: '',
};

export const PROPERTY_RULES = {
  ID: 0,
  ADVANCED_BOOKING: { NAME: '', ID: 0 },
  CHECK_IN: '',
  CHECK_OUT: '',
  MAX_BOOKABLE_DAYS: 30,
  MAX_GUESTS: 1,
  MIN_AGE_TO_BOOK: 18,
  QUIET_TIME: '',
};

const PROPERTY_GUIDEBOOK_WALKTHROUGH: GuidebookWalkthrough = {
  COMPLETED_STEPS: [],
  COMPLETION_PERCENTAGE: 0,
  NUM_STEPS: 0,
  STEPS: [
    GuidebookWizardFormNamesEnum.introduction,
    GuidebookWizardFormNamesEnum.welcomeMessage,
    GuidebookWizardFormNamesEnum.directions,
    GuidebookWizardFormNamesEnum.checkIn,
    GuidebookWizardFormNamesEnum.departure,
    GuidebookWizardFormNamesEnum.houseKeeping,
    GuidebookWizardFormNamesEnum.uniqueCodes,
    GuidebookWizardFormNamesEnum.amenities,
    GuidebookWizardFormNamesEnum.gettingAround,
    GuidebookWizardFormNamesEnum.frontDesk,
    GuidebookWizardFormNamesEnum.commonQuestions,
  ],
};

const PROPERTY_CO_HOST = {
  ...USER,
  COHOST_PROFILE: {
    PERMISSIONS: {} as Omit<PropertyPermission, 'PROPERTY_ID'>,
    PROPERTY_IDS: [],
  },
};

/** The property contact is the primary contact, they are the same */
const PROPERTY_CONTACT = {
  ...USER,
  PROPERTY_MANAGER_PROFILE: {
    PERMISSIONS: {} as Omit<PropertyPermission, 'PROPERTY_ID'>,
    PROPERTY_IDS: [],
  },
};

export const initialPropertyState = {
  ID: 0,
  ACCESS_TO_UNIT,
  ADDRESS: address,
  AMENITIES,
  BANKING,
  BATHROOMS: [] as Bathroom[],
  BEDROOMS: [] as Bedroom[],
  BLOCKOFFS: [],
  CANCELLATION_POLICY,
  CLEANING_PROTOCOL,
  CODES: PROPERTY_CODES,
  CO_HOST: PROPERTY_CO_HOST,
  CONTENT: {
    ABOUT_THE_BUILDING: '',
    DESCRIPTION: '',
    KITCHEN: '',
    LOCATION: '',
    SUMMARY: '',
    TITLE: '',
  },
  DAMAGE_DEPOSIT: {
    AMOUNT: '',
    TYPE: {
      ID: 0 as DamageDepositModeId,
      NAME: '',
    },
  },
  DAYS_TO_EXPIRY: 0,
  DIRECT_VACATIONS,
  EMERGENCY_CONTACTS: {
    PRIMARY: {
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
    } as EmergencyContact,
    OTHERS: [] as EmergencyContact[],
  },
  EXTERNAL_URLS: {
    URL_AIRBNB: '',
    URL_OTHER: '',
    URL_VRBO: '',
  },
  ICALS: {
    HAS_ICALS: false,
    PRIMARY: {
      ALLURA_URL: '',
      AVAILABILITY_WINDOW: 0,
      IS_AVAILABILITY_WINDOW: false,
      IS_BLOCK_RATELESS: true,
    },
    SECONDARY: {
      ALLURA_URL: '',
      AVAILABILITY_WINDOW: 0,
      IS_ACTIVE: true,
      IS_AVAILABILITY_WINDOW: false,
      IS_BLOCK_RATELESS: true,
    },
    EXTERNAL: [{ ID: 0, LISTING_URL: '', NAME: '', URL: '' }],
  },
  INSTRUCTIONS: {
    ABOUT_THE_BUILDING: '',
    ACTIVITIES: '',
    BUILDING_COMMON_AREAS: '',
    CHECK_IN: '',
    CHECK_OUT: '',
    EMERGENCY_CONTACTS: '',
    FRONT_DESK: '',
    GARBAGE_RECYCLING: '',
    GETTING_AROUND: '',
    GETTING_TO_UNIT: '',
    HEATING: '',
    HOUSEKEEPING: '',
    ID: 0,
    INFANT_SUPPLIES: '',
    KITCHEN: '',
    LATE_CHECK_IN: '',
    LINENS_AND_TOWELS: '',
    OTHER: '',
    PARKING: '',
    RESTAURANTS: '',
    SERVICES: '',
    SKI_IN_SKI_OUT: '',
    TO_FROM_LIFTS: '',
    WELCOME: '',
    WHAT_TO_BRING: '',
  },
  IS_ALLURA_RATES: false,
  IS_CO_HOST_MANAGER_ENABLED: '',
  IS_ENABLED: false,
  IS_SKI_IN_SKI_OUT: false,
  JOIN_STATUS: {
    COMPLETION_PERCENTAGE_REQUIRED: 0,
    COMPLETION_PERCENTAGE_OPTIONAL: 0,
    DATES: { CREATED: '', LAST_UPDATED: '', ACTIVATED: '', ACTIVATION_REQUEST: '' },
    HAS_COMPLETED_ONBOARDING: false,
    STATUS: '',
    STATUS_ID: 0 as JoinStatusIDEnum,
    SUBFORMS_COMPLETED: [] as RequiredSubformsEnum[],
    SUBFORMS_OPTIONAL_COMPLETED: [] as OptionalSubformsEnum[],
  },
  LISTING_QUALITY: {
    MESSAGE: '',
    RATES_AVAILABILITY: {
      MESSAGE: '',
      PROPERTY_COUNT: 0,
      RECOMMENDED_COUNT: 0,
      SCORE: 0,
    },
    PROPERTY_GUIDEBOOK: {
      MESSAGE: '',
      PROPERTY_COUNT: 0,
      RECOMMENDED_COUNT: 0,
      SCORE: 0,
    },
    STAR_RATING: 0,
    PHOTOS: {
      MESSAGE: '',
      PROPERTY_COUNT: 0,
      RECOMMENDED_COUNT: 0,
      SCORE: 0,
    },
  },
  NAME: '',
  NON_RESIDENT,
  OFFERS: {
    IS_NEW_LISTING_OFFER_ENABLED: false,
    IS_NEW_LISTING_OFFER_BLACKOUT_ENABLED: false,
  },
  OWNER: { ...USER } as WithRequiredProperty<User, 'OWNER_PROFILE'>,
  PARKING: {
    DESCRIPTION: '',
    HAS_ADDITIONAL_FREE_SPOTS: '',
    HAS_ADDITIONAL_PAID_SPOTS: '',
    INSTRUCTIONS: '',
    IS_DEFAULT_DESCRIPTION: false,
    NUM_SPOTS_PROVIDED: '',
  },
  PARTNERS: [],
  PHOTOS: [] as Photo[],
  POLICIES: {
    ACCOUNT: [] as Policy[],
    GENERAL: [] as Policy[],
    GUEST_STAY: [] as Policy[],
    HOUSE_RULES: [] as Policy[],
    PROPERTY: [] as Policy[],
    RESERVATION: [] as Policy[],
  },
  /** Either the owner of the property or the PROPERTY_CONTACT if defined */
  PRIMARY_CONTACT: { ...USER } as User,
  /** PROPERTY_CONTACT is either sent with info or sent as an empty object
   * The PROPERTY_CONTACT is the rental manager of the property
   * The values are pre-filled so that the rental manager form can use those values  */
  PROPERTY_CONTACT,
  RATES_SCHEDULE: [] as ServerRateSchedule[],
  RATES_SETTINGS: RATES_SETTINGS,
  RESERVATION_SETTINGS,
  RULES: PROPERTY_RULES,
  SETUP_QUESTIONS: {
    NUM_PROPERTIES: 0,
    PLATFORMS_LISTED: [
      {
        ID: 0,
        URL: '',
      },
    ],
    ID: 0,
  },
  SIZE_CATEGORY: {
    NAME: '',
    ID: 0,
  },
  SQUARE_FEET: '',
  STYLE: {
    NAME: '',
    ID: 0,
  },
  SURCHARGES: PROPERTY_SURCHARGES,
  SUBSCRIPTION: {
    COMMISSION_PERCENTAGE: 0,
    CREDIT_CARD_PERCENTAGE: 0,
    DESCRIPTION: '',
    DURATION: '',
    FEE: '',
    GST: '',
    GST_RATE: 0,
    ID: 0,
    NAME: '',
    NUMBER_OF_DAYS: 0,
    RESORT_ID: 0,
    SUBSCRIPTION_TIER_ID: 0 as PropertySubscriptionTierIdEnum,
  },
  SUITABILITIES,
  TAXES,
  TAX_NUMBERS: {
    BC_SHORT_TERM_REGISTRY_NUMBER: '',
    BUSINESS_LICENCE_NUMBER: '',
    GST_NUMBER: '',
    PST_NUMBER: '',
  },
  THUMBNAIL_URL: '',
  URL: '',
  VIDEOS: {
    THREESIXTY: { DATA: '', ID: 0 },
    YOUTUBE: [] as { DATA: string; ID: number }[],
    FEATURED: { DATA: '', ID: 0 },
  },
  WALKTHROUGH: {
    PROPERTY_GUIDEBOOK: PROPERTY_GUIDEBOOK_WALKTHROUGH,
  },
};

export const calendarEvent = {
  ARRIVAL: '',
  ARRIVAL_UTC: 0,
  BOOKING_NET: '',
  DATE_CREATED: '',
  DEPARTURE: '',
  DEPARTURE_UTC: 0,
  GUEST: {
    EMAIL: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    MEMBER_SINCE: '',
    NAME: '',
    NUM_BOOKINGS: 0,
    NUM_RECOMMENDATIONS: 0,
    NUM_REVIEWS: 0,
    PHONE: '',
    THUMBNAIL: '',
  },
  GUEST_REQUESTS: '',
  HAS_PETS: false,
  ID: 0,
  IS_ALLURA_BOOKING: false,
  NOTES_OWNER: '',
  PAID_TO_DATE: '',
  PARTY_SIZE_ADULTS: 0,
  PARTY_SIZE_KIDS: '',
  PROPERTY: {
    THUMBNAIL_URL: '',
  },
  REFERENCE: '',
  SOURCE: '',
  STATUS: '',
  TITLE: '',
  TYPE: '' as EventTypeEnum,
};

export const sparseRate = { NIGHTS: 0, ID: 0, RATE: '' };

export const sparseSeason = {
  START: '',
  NAME: '',
  ID: 0,
  COMMENT: '',
  END: '',
  RATES: [],
};

export const calendarDate = {
  IS_BOOKED: false,
  DATE: '',
  DATE_UTC: 0,
  ID: 0,
  TYPE: '',
  SEASON: sparseSeason,
};

export const reservationDetails = {
  ARRIVAL_DATE: '',
  DEPARTURE_DATE: '',
  GUEST_NAME: '',
  GUEST_EMAIL: '',
  GUEST_PHONE: '',
  /** The guest's ID */
  ID: 0,
  USER_TYPE_ID: 0 as UserRoleIDEnum,
  REFERENCE: '',
  BOOKING_ID: '',
  BOOKING_STATUS: '',
  CONFIRMED_DATE: '',
};

export const initialLastAndNextGuest = {
  HAS_LAST_GUEST: false,
  LAST_GUEST: reservationDetails,
  HAS_NEXT_GUEST: false,
  NEXT_GUEST: reservationDetails,
  PROPERTY_ID: '',
};

export const BANK_DEPOSITS = {
  TRANSFERRED: [
    {
      BANK_ACCOUNT_HOLDER: '',
      BANK_ACCOUNT_NUMBER: '',
      EXPECTED_DEPOSIT_DATE: '',
      TRANSACTION_ID: 0,
      BOOKING_ID: 0,
      REFERENCE: '',
      TRANSFER_DATE: '',
      AMOUNT: 0,
    },
  ],
  EXPECTED: { EXPECTED_PAYOUT: '', SUM_IN_TRANSIT: 0 },
};

export const UNAVAILABLE_DATES = {
  CANNOT_ARRIVE: [] as string[],
  CANNOT_DEPART: [] as string[],
  UNAVAILABILITY_ARRIVAL: [] as string[],
  UNAVAILABILITY_DEPARTURE: [] as string[],
};

export const PHOTO = {
  ORIGINAL: '',
  CAPTION: '',
  SORT_ORDER: 0,
  THUMB: '',
  FULL: '',
  ID: 0,
};

export const PROPERTY_DEFAULT_CONTENT = {
  DEFAULT_CONTENT: '',
  OTHER_DEFAULTS: [''],
  ID: 0,
};

export const EXTERNAL_EVENT = {
  SOURCE: '',
  NIGHTS: 0,
  ARRIVAL: '',
  DEPARTURE: '',
  ID: 0,
  SUMMARY: '',
};

const REVIEW = {
  ID: 0,
  IS_GUEST_RESPONSE_POSSIBLE: false,
  BOOKING_INFO: {
    RESORT: '',
    PROPERTY_IMAGE: '',
    NIGHTS: 0,
    ARRIVAL: '',
    DEPARTURE: '',
    REFERENCE: '',
    CONFIRMED: '',
    ID: 0,
    DEVELOPMENT: '',
  },
  REVIEW: '',
  STATUS: '',
  STATUS_ID: 0 as ReviewStatusId,
  REVIEW_DATE: '',
  GUEST_INFO: {
    MEMBER_SINCE: '',
    COUNTRY: '',
    NUM_BOOKINGS: 0,
    FIRST_NAME: '',
    STATUS: '',
    NUM_HOST_RECOMMENDATIONS: 0,
    LAST_NAME: '',
    ID: 0,
    NUM_RECOMMENDS: 0,
    CITY: '',
    NUM_REVIEWS: 0,
    USER_TYPE_ID: 0,
    THUMBNAIL: ''
  },
  RATINGS: [{ QUESTION: '', MAX_SCORE: 0, ID: 0, TITLE: '', SCORE: 0 }],
  RATINGS_AVERAGE: 0,
  IS_PUBLISHED: false,
  WOULD_RECOMMEND: false,
  PUBLISHED_DATE: '',
  TITLE: '',
  RESPONSES: [
    {
      RESPONSE: '',
      RESPONSE_DATE: '',
      USER_ROLE: '',
      TITLE: '',
    },
  ],
};

export const PROPERTY_REVIEWS = {
  PROPERTY_ID: 0,
  AVERAGE_SCORE: 0,
  AVERAGE_SCORES: [{ AVERAGE_SCORE: 0, TITLE: '' }],
  NUM_REVIEWS: 0,
  REVIEWS: [REVIEW],
};

export const RATE_SUGGESTION = {
  DATE: '',
  LOW: '',
  LOW_MID: '',
  MID: '',
  MID_HIGH: '',
  HIGH: '',
  ID: 0,
};

export const RATE_SUGGESTIONS = {
  ID: 0,
  RESORT: '',
  RESORT_ID: 0,
  SIZE_CATEGORY: '',
  SIZE_CATEGORY_ID: 0,
  RATES_SCHEDULE: [RATE_SUGGESTION],
};

export const RATE_SCHEDULE_GENERATE_OPTIMIZE = {
  ID: 0 as string | number,
  RATES_SCHEDULE: [] as ServerRateSchedule[],
};

export const RATE_SCHEDULE_GENERATE_INSIGHT = {
  ID: 0 as string | number,
  RATES_SCHEDULE: [] as ServerRateSchedule[],
};
