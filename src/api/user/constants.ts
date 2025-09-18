import { address } from '../constants';
import { UserRoleIDEnum } from './types';

export const GUEST_PROFILE = {
  MEMBER_SINCE: 'YYYY-MM-DD',
  PERMISSIONS: {
    SHOW_NUM_REVIEWS: false,
    SHOW_MEMBER_SINCE: false,
    SHOW_NUM_RECOMMENDS: false,
  },
  NUM_BOOKINGS: 0,
  NUM_RECOMMENDATIONS: 0,
  NUM_REVIEWS: 0,
};

export const OWNER_PROFILE = {
  PROPERTY_IDS: [] as number[],
  MEMBER_SINCE: 'YYYY-MM-DD',
};

export interface PropertyPermission {
  PROPERTY_ID: number;
  NOTIFY_CHECKIN_REMINDER: false;
  NOTIFY_RESORT_SPECIFIC: false;
  NOTIFY_GENERAL_INQUIRIES: false;
  NOTIFY_ALL_OWNERS: false;
  NOTIFY_RESERVATION_REQUESTS: false;
  NOTIFY_RENEWALS: false;
  NOTIFY_RESERVATIONS_CANCELLED: false;
  NOTIFY_RESERVATIONS_ADDED: false;
}

export const PROPERTY_MANAGER_PROFILE = {
  PERMISSIONS: [] as PropertyPermission[],
  PROPERTY_IDS: [] as number[],
};

export const COHOST_PROFILE = {
  PERMISSIONS: [] as PropertyPermission[],
  PROPERTY_IDS: [] as number[],
};

export const USER = {
  ID: 0,
  FIRST_NAME: '',
  LAST_NAME: '',
  IS_COMPANY: false,
  COMPANY_NAME: '',
  THUMBNAIL: '',
  PHONE: '',
  EMAIL: '',
  CREATED_DATE: '',
  DATE_LAST_LOGIN: '',
  DATE_UPDATED: '',
  ADDRESS: address,
  IS_SMS_VERIFIED: false,
  IS_EMAIL_VERIFIED: false,
  DATE_EMAIL_VERIFIED: '',
  DATE_SMS_VERIFIED: '',
  DATE_OF_BIRTH: '',
  /** Django-compatibility fields */
  IS_ACTIVE: false,
  IS_STAFF: false,
  IS_SUPERUSER: false,
  IS_DUE_DILIGENCE_REQUIRED : false
};

/** Inquiry message OR Booking message */
export const MESSAGE = {
  MESSAGE: '',
  SUBJECT: '',
  TO_EMAILS: '',
  DATE_SENT: '',
  FROM_EMAIL: '',
  RECIPIENT: '',
  THUMBNAIL: '',
  TIME_SENT: '',
  ID: 0,
  RECIPIENT_ID: 0,
  IS_READ: false,
  READ_DATE: '',
  READ_TIME: '',
  NUM_UNREAD: 0,
  ARRIVAL_DATE: '',
  DEPARTURE_DATE: '',
  CREATED_DATE: '',
  NUM_BEDS: 0,
  NUM_GUESTS: 0,
  IS_INQUIRY: false,
};

/** Only appears on Booking messages */
export const MESSAGE_BOOKING = {
  ID: 0,
  ARRIVAL_DATE: '',
  DEPARTURE_DATE: '',
  CREATED_DATE: '',
  REFERENCE: '',
};

export const MESSAGE_PROPERTY = {
  ID: 0,
  THUMBNAIL: '',
  NAME: '',
  SIZE_CATEGORY: '',
};

export const MESSAGE_CONTACT = {
  ID: 0,
  THUMBNAIL: '',
  NAME: '',
  USER_TYPE_ID: 0 as UserRoleIDEnum,
  EMAIL: '',
};

export const USER_LOGIN = {
  IS_AUTHENTICATED_GUEST: false,
  IS_AUTHENTICATED_OWNER: false,
  GUEST_ID: 0,
  OWNER_ID: 0,
  HAS_GUEST_AND_OWNER_ACCOUNTS: false,
  IS_PASSWORDS_SYNCED: false,
  OLD_PASSWORD_USER_ROLE_ID: 0 as UserRoleIDEnum,
};

export const GUEST_OWNER_LOGIN = {
  USER_ROLE_ID: 0 as UserRoleIDEnum.owner,
  JSESSIONID: '',
  ID: 0,
};

export const USER_MESSAGE_SUBJECT = {
  ID: 0,
  CONTACT: MESSAGE_CONTACT,
  BOOKING: MESSAGE_BOOKING,
  PROPERTY: MESSAGE_PROPERTY,
  MESSAGE,
};

export const USER_MESSAGE_OVERVIEW = {
  ID: 0,
  MESSAGE: {
    MESSAGE: '',
    MESSAGE_HTML: '',
    SUBJECT: '',
    TO_EMAILS: '',
    DATE_SENT: '',
    FROM_EMAIL: '',
    RECIPIENT: '',
    THUMBNAIL: '',
    TIME_SENT: '',
    ID: 0,
    RECIPIENT_ID: 0,
    IS_READ: false,
    READ_DATE: '',
    READ_TIME: '',
    NUM_UNREAD: 0,
  },
  PROPERTY: MESSAGE_PROPERTY,
  CONTACT: {
    DETAILS: {
      NEXT_RESERVATION_DATE: '',
      MEMBER_SINCE: '',
      HAS_NEXT_RESERVATION: false,
      HAS_MEMBER_SINCE: false,
      DETAILS_NUMBER_OF_RESERVATIONS: 0,
      HAS_NUMBER_OF_RESERVATIONS: false,
      HAS_LAST_RESERVATION: false,
      LAST_RESERVATION_DATE: '',
    },
    ...MESSAGE_CONTACT,
  },
};

export const MESSAGE_THREAD = {
  MESSAGE: {
    MESSAGE: '',
    IS_READ: false,
    SUBJECT: '',
    TO_EMAILS: '',
    FROM_EMAIL: '',
    THUMBNAIL: '',
    SENT_DATE: '',
    SENT_TIME: '',
    BOOKING_ID: 0,
    ID: 0,
    READ_DATE: '',
    READ_TIME: '',
    INQUIRY_ID: 0,
    SENDER_USER_ID: 0,
    SENDER_USER_TYPE_ID: 0 as UserRoleIDEnum,
    RECEIVER_USER_ID: 0,
    RECEIVER_USER_TYPE_ID: 0 as UserRoleIDEnum,
    ARRIVAL_DATE: '',
    DEPARTURE_DATE: '',
    IS_INQUIRY: false,
    NUM_BEDS: 0,
    NUM_GUESTS: 0,
  },
  PROPERTY: MESSAGE_PROPERTY,
  BOOKING: MESSAGE_BOOKING,
};

export const MESSAGE_UNREAD_COUNT = {
  USER_MESSAGE_COUNT: 0,
};
