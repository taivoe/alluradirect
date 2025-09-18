import {
  AlluraNotification,
  BlackoutPeriod,
  LocationDataDevelopment,
  LocationDataRegion,
  LocationDataResort,
  NameIdItem,
  NotificationCategoriesEnum,
  NotificationCategoryIdEnum,
  NotificationLevelsEnum,
} from './types';

// ** PLEASE DO YOUR BEST TO KEEP THIS IN ALPHABETICAL ORDER **

export const address = {
  AREA: '',
  AREA_ID: 0,
  CITY: '',
  COUNTRY: '',
  COUNTRY_CODE: '',
  COUNTRY_ID: 0,
  DEVELOPMENT: '', // Note: some properties are not in a development (House)
  DEVELOPMENT_ID: 0,
  ID: 0,
  LATITUDE: 0,
  LONGITUDE: 0,
  POSTAL: '',
  REGION: '',
  REGION_ID: 0,
  RESORT: '',
  RESORT_ID: 0,
  STREET_NAME: '',
  STREET_NUMBER: '',
  UNIT: '', // Note: some properties will not have a unit # (House)
};

export const amenity = {
  ID: -1,
  NAME: '',
  INSTRUCTIONS: '',
  DESCRIPTION: '',
  PROPERTY_AMENITY_ID: 0,

  /** Optional field on an amenity */
  ACCESS_CODE: '',
  /** Only appears when using the internet amenity */
  INTERNET_PASSWORD: '',
  INTERNET_NETWORK_NAME: '',
};

const policyDateRange = {
  DATE_ACTIVATED: '',
  DESCRIPTION: '',
  FROM_DAYS: '',
  ID: -1,
  LABEL: '',
  REFUND_PERCENTAGE: '',
  TO_DAYS: '',
};

export const CANCELLATION_POLICY = {
  ADMIN_PENALTY: 0,
  ADMIN_PENALTY_UNIT: '',
  BOOKING_GRACE_PERIOD: '',
  DATE_ACTIVATED: '',
  DATE_LAST_UPDATED: '',
  DATE_RANGES: [policyDateRange],
  DESCRIPTION: '',
  ID: 0,
  IS_CREDIT_ONLY_REFUND: false,
  IS_REFUND_REBOOKED_DATES: false,
  IS_SPECIAL_CIRCUMSTANCE: false,
  NAME: '',
  POLICY_ID: 0,
  SERVICE_FEE_REFUND: '',
  SPECIAL_CIRCUMSTANCE_DESCRIPTION: '',
  SPECIAL_CIRCUMSTANCE_ID: 0,
  SPECIAL_CIRCUMSTANCE_NAME: '',
  SURCHARGE_REFUND: '',
};

export const notification = {
  CATEGORY_ID: 0 as NotificationCategoryIdEnum,
  LEVEL_ID: 0,
  IS_DISMISSIBLE: false,
  DATE_CREATED: '',
  CATEGORY_LINK_ID: 0,
  LEVEL_NAME: '' as NotificationLevelsEnum,
  LEVEL: 0,
  HTML_CONTENT: '',
  IS_FEATURED: false,
  IS_DISMISSED: false,
  CATEGORY: '' as NotificationCategoriesEnum,
  DATE_DISMISSED: '',
  ID: 0,
  IMAGE_URL: '',
  TITLE: '',
  DESCRIPTION: '',
  PROPERTY_ID: 0,
  PROPERTY_NAME: '',
  PROPERTY_ADDRESS: '',
};

export const NOTIFICATION_ENDPOINT_RESPONSE = {
  PROPERTY_ID: 0,
  UNREAD_COUNT: 0,
  NOTIFICATIONS: [] as AlluraNotification[],
};

export const BLACKOUT_PERIOD = {
  ID: 0,
  START: '',
  END: '',
}

export const OFFER = {
    BLACKOUT_PERIODS: [] as BlackoutPeriod[],
    CODE: '',
    DESCRIPTION: '',
    DISTRIBUTION: '',
    DISTRIBUTION_ID: 0,
    DOLLAR: '',
    GIFT_CERTIFICATE_URL: '',
    GUEST_EMAIL: '',
    GUEST_ID: 0,
    INSTRUCTIONS: '',
    IS_ALL_PROPERTIES: false,
    IS_EDITABLE: false,
    IS_ENABLED: true,
    IS_PERMANENT_REPEAT_GUEST_OFFER: false,
    IS_PROMOTED: false,
    IS_PUBLIC: true,
    MAX_USAGE_COUNT: 1,
    MIN_NIGHTS: 0,
    NIGHTS_FREE: 0,
    NIGHTS_REQUIRED: 0,
    OFFER_AVAILABILITY_ID: 1,
    OFFER_AVAILABLE_END: '',
    OFFER_AVAILABLE_START: '',
    OFFER_CATEGORY: '',
    OFFER_CATEGORY_ID: 1,
    OFFER_END: '',
    OFFER_ID: 0,
    OFFER_START: '',
    OFFER_TYPE_ID: 1,
    OFFER_URL: '',
    PERCENTAGE: 0,
    PROMOTED_OFFER_ID: 0,
    PROPERTY_IDS: '',
    STATUS: '',
    TITLE: '',
    USAGE_COUNT: 0,
    USER_ID: 0
};

export const tax = {
  AMOUNT: '',
  ID: 0,
  NAME: '',
};

export const taxSurcharge = {
  ...tax,
  IS_PASS_THROUGH_TO_OWNER: false,
};

export const contactTracingGuest = {
  EMAIL: '',
  FIRST_NAME: '',
  ID: 0,
  IS_CHILD: false,
  LAST_NAME: '',
  PHONE: '',
};

export const surchargeTaxItem = {
  ACCOUNT: '',
  STRING: '',
};

export const taxItem = {
  AMOUNT: '',
  ID: 0,
  IS_PASS_THROUGH_TO_OWNER: false,
  NAME: '',
  RATE: 0,
};

const BOOKING_SURCHARGE = {
  IS_ENABLED: false,
  TAX: '',
  TAXES: {},
  FEE: '',
  NAME: '',
  ID: 0,
  TOTAL: '',
};

export const BOOKING_SURCHARGES_LIST = {} as {
  [key: string]: typeof BOOKING_SURCHARGE;
};

export const BOOKING_SURCHARGES = {
  GROSS: '',
  LIST: BOOKING_SURCHARGES_LIST,
  NET: '',
  TAXES_TOTAL: '',
  TAXES_TOTALS: [taxItem],
};

export const DIRECT_VACATIONS = {
  ID: 0,
  IS_ACTIVE: false,
  LOGO: '',
  NAME: '',
  URL: '',
};

export const propertyGuidebookPDF = {
  PROPERTY_GUIDEBOOK_PDF: '', // b64 string of pdf
  BOOKING_ID: 0,
  ID: 0,
};

export const propertyOwner = {
  COMPANY_NAME: '',
  FIRST_NAME: '',
  ID: 0,
  IS_COMPANY: false,
  LAST_NAME: '',
  EMAIL: '',
  THUMBNAIL: '',
};

export const propertyRules = {
  CHECK_IN_TIME: '',
  CHECK_OUT_TIME: '',
  MAX_GUESTS: 0,
  QUIET_TIME: '',
};

export const serviceFee = {
  DESCRIPTION: '',
  FEE: '',
  ID: 0,
  NAME: '',
  TAX: '',
  TAXES: [taxItem],
  TAXES_STRING: '',
  TOTAL: '',
};

export const accommodationTaxItem = {
  AMOUNT: '',
  NAME: '',
};

export const totalsPaid = {
  ACCOMMODATION_NET: '',
  ACCOMMODATION_TAXES: [accommodationTaxItem],
  BANK_DEPOSIT: '',
  COMMISSION: '',
  COMMISSION_PARTNER: '',
  CREDIT_CARD_FEE: '',
  DAMAGE_DEPOSIT: '',
  NR6: '',
  OWNER_PASS_THROUGH_TAXES: [taxItem],
  REVENUE_NET: '',
  PROPERTY_MANAGER_SERVICE_FEE: {
    IS_FEE_ON_SUBTOTAL_TO_OWNER: false,
    NET: '',
    TAXES: [taxItem],
    TOTAL: '',
  },
  SURCHARGE: {
    TAXES: [taxItem],
    NET: '',
  },
  SURCHARGE_NET: '',
  SURCHARGE_TAXES: [taxItem],
  TAX: '',
};

export const serviceFeeTaxItem = {
  AMOUNT: 0,
  ID: 0,
  NAME: '',
  RATE: 0,
};

export const transaction = {
  AMOUNT: '',
  BANK_DEPOSIT: {
    ACCOUNT: '',
    AMOUNT: '',
    DATE: '',
  },
  BOOKING_NET: '',
  CATEGORY: '',
  COMMISSION: {
    GST: '',
    MRDT: '',
    NET: '',
    PST: '',
    TOTAL: '',
  },
  CREDIT_CARD: {
    CARDHOLDER_NAME: '',
    NAME: '',
    NUMBER: '',
  },
  CREDIT_CARD_WITHHELD: '',
  DAMAGE_DEPOSIT_AMOUNT: '',
  DATE: '',
  ID: 0,
  NR6_PERCENTAGE: 0,
  NR6_WITHHELD: '',
  SERVICE_FEE: {
    FEE: 0,
    ID: 0,
    NAME: '',
    TAX: 0,
    TAXES: [serviceFeeTaxItem],
    TOTAL: 0,
  },
  SURCHARGES: BOOKING_SURCHARGES,
  TAX: {
    TAXES: [taxItem],
    TOTAL: '0.00',
    WITHHELD: {
      MRDT: '0.00',
      PST: '0.00',
    },
  },
  TYPE: 'charge',
};

export const initialLocationData = {
  COUNTRIES: [] as NameIdItem[],
  REGIONS: [] as LocationDataRegion[],
  AREAS: [] as NameIdItem[],
  RESORTS: [] as LocationDataResort[],
  DEVELOPMENTS: [] as LocationDataDevelopment[],
  PROPERTY_CATEGORIES: [] as NameIdItem[],
};

export const RESERVATION_SETTINGS = {
  DEPOSIT_PERCENTAGE: 0,
  BALANCE_DAYS_BEFORE_ARRIVAL: 0,
  BOOKING_GATEWAY_MODE_ID: 0,
};
