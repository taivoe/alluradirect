import { ACCESS_TO_UNIT, PROPERTY_CODES } from '../property/constants';
import { BOOKING_STATUS, CUSTOM_MESSAGE } from '../booking/constants';
import { Bathroom, Bedroom, EmergencyContact, Photo } from '../property/types';
import { GuestBooking, GuestBookingType } from './types';
import { GuestPaymentFee, GuestPaymentTaxes, GuestRatingQuestion, GuestRecommendation } from './types';
import { RatingRange, Review } from '../booking/types';
import { address, amenity } from '../constants';

import { User } from '../user/types';
import { USER } from '../user/constants';
import { WithRequiredProperty } from '../types';

export const GUEST_FORM_INPUTS = {
  GUEST_ID: 0,
  REVIEW: {
    RATINGS: [] as GuestRatingQuestion[],
    RESPONSES: {
      GUEST_MAXIMUM_NUMBER: 0,
      OWNER_MAXIMUM_NUMBER: 0,
    },
    STATUSES: [],
  },
};

export const GUEST_RATING_QUESTION = {
  QUESTION: '',
  MAX_SCORE: 0,
  ID: 0,
  TITLE: '',
  SCORE: 0 as RatingRange,
  SORT_ORDER: 0,
};

export const GUEST_REVIEWS = {
  REVIEWS: [] as Review[],
  RECOMMENDATIONS: [] as GuestRecommendation[],
};

export const GUEST_RECOMMENDATION = {
  ARRIVAL: '',
  COMMENTS: '',
  CONFIRMED: '',
  DEPARTURE: '',
  HAS_COMMENTS_ENABLED: false,
  HOST_NAME: '',
  ID: 0,
  IS_RECOMMENDED: false,
  REFERENCE: '',
  BOOKING_ID: 0,
};

export const GUEST_PAYMENT = {
  ID: 0,
  BOOKING_ID: 0,
  BOOKING: {} as GuestBooking,
  BOOKING_TYPE: '' as GuestBookingType,
  PAYMENT_RECEIPT: '',
};

export const GUEST_PAYMENT_INFORMATION = {
  ID: 0,
  PAYMENT_DUE: {
    BOOKING: {
      AMOUNT_DUE: 0, // How much the guest has to pay for this payment. Guest may not have to pay the full amount (see BOOKING_TOTAL)
      ARRIVAL: '',
      BOOKING_NET: 0, // (NIGHTLY_RATE * NIGHTS)
      BOOKING_TOTAL: 0, // Gross payable/Total amount due. the full amount the guest will have to pay
      DAMAGE_DEPOSIT: 0,
      DEPARTURE: '',
      ID: 0,
      NIGHTLY_RATE: 0,
      NIGHTS: 0,
      PAID_TO_DATE: 0,
      PARTY_SIZE: 0,
      TAXES_AND_FEES_TOTAL: 0,
    },
    FEES: [] as GuestPaymentFee[],
    TAXES: [] as GuestPaymentTaxes[],
  },
};

export const subSection = {
  ID: -1,
  HTML: [''] as string[] | string,
  DETAILS: [{ NAME: 'STRING', VALUE: 'STRING' }],
};

const generalSubSection = {
  DATA: subSection,
  ICON: '',
  DESCRIPTION: '',
  TITLE: '',
};

const amenitiesSubSection = {
  DATA: [amenity],
  ICON: '',
  DESCRIPTION: '',
  TITLE: '',
};

const privateBuildingSubSection = {
  DATA: {
    PRIVATE: amenity,
    BUILDING: amenity,
  },
  ICON: '',
  DESCRIPTION: '',
  TITLE: '',
};

const htmlSubSection = {
  DATA: [''] as string[] | string,
  ICON: '',
  DESCRIPTION: '',
  TITLE: '',
};

export const propertyGuidebook = Object.freeze({
  PROPERTY_GUIDEBOOK: {
    BOOKING: {
      CUSTOM_MESSAGE,
      STATUS: BOOKING_STATUS,
    },
    PROPERTY: {
      ID: 0,
      IS_SKI_IN_SKI_OUT: false,
      THUMBNAIL: '',
      IS_COMPANY: '',
      ARRIVAL: '',
      DEPARTURE: '',
      CHECK_IN_TIME: '',
      CHECK_OUT_TIME: '',
      QUIET_TIME: '',
      BATHROOMS: [] as Bathroom[],
      BEDROOMS: [] as Bedroom[],
      LOGO: '',
      COVER_PHOTO: '',
      LISTING_PAGE: '',
      ACCESS_TO_UNIT,
      ADDRESS: address,
      OWNER: { ...USER } as WithRequiredProperty<User, 'OWNER_PROFILE'>,
      CODES: PROPERTY_CODES,
      EMERGENCY_CONTACTS: {
        DESCRIPTION: '',
        CONTACTS: {
          OTHERS: [] as EmergencyContact[],
          PRIMARY: {} as EmergencyContact,
        },
      },
      PHOTOS: [] as Photo[],
      PRIMARY_CONTACT: { ...USER } as User,
    },
    SECTIONS: {
      WELCOME: {
        DESCRIPTION_PER_GUEST: '', // html
        TITLE: '',
        DESCRIPTION_PER_PROPERTY: '', // html
      },
      ARRIVAL: {
        ACCESS_DETAILS: generalSubSection,
        DIRECTIONS_TO_PROPERTY: generalSubSection,
        PARKING: generalSubSection,
        CHECK_IN_PROCESS: generalSubSection,
      },
      DEPARTURE: {
        CHECK_OUT_PROCESS: generalSubSection,
        GARBAGE_REMOVAL: generalSubSection,
      },
      PROPERTY_AMENITIES: {
        PRIVATE: amenitiesSubSection,
        ESSENTIALS: amenitiesSubSection,
        KITCHEN: amenitiesSubSection,
        SAFETY: amenitiesSubSection,
        HEATING_INSTRUCTIONS: htmlSubSection,
        LINENS_TOWELS: htmlSubSection,
      },
      BUILDING_FACILITIES: {
        ABOUT_BUILDING: generalSubSection,
        FRONT_DESK: generalSubSection,
        BUILDING_AMENITIES: amenitiesSubSection,
      },
      EQUIPMENT_STORAGE: {
        SKI_STORAGE: privateBuildingSubSection,
        BIKE_STORAGE: privateBuildingSubSection,
      },
      GETTING_AROUND: {
        SKI_IN_OUT: generalSubSection,
        DIRECTIONS_TO_LIFTS: generalSubSection,
        GETTING_AROUND: generalSubSection,
      },
      RECOMMENDATIONS: {
        WHAT_TO_BRING: generalSubSection,
        RESTAURANTS: generalSubSection,
      },
      SERVICES_OTHER: {
        AVAILABLE_SERVICES: generalSubSection,
        HOUSEKEEPING: generalSubSection,
        OTHER: generalSubSection,
      },
    },
  },
  BOOKING_ID: 0,
  ID: 0,
});

export const B64_PROPERTY_GUIDEBOOK = {
  PROPERTY_GUIDEBOOK_PDF: '',
};
