import Big from 'big.js';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { CancellationPolicySpecicalCircumstanceIDEnum } from '../../api/ownerFormInputs/types';
import { PricingStrategyEnum, RatesSettingsWeekendPremiumId } from '../../api/property/types';
import { OptionalSubformsEnum, RequiredSubformsEnum } from '../../api/subformNames';
import { PropertyTaxIDEnum } from '../../api/types';
import { UserTypeEnum } from '../../api/user/types';
import {
  accessCode,
  addressValidation,
  boolean,
  buttonGroupValidation,
  buttonGroupValidationNotRequired,
  city,
  currency,
  description,
  email,
  htmlRequired,
  id,
  idNameValidation,
  instruction,
  minAge,
  numberRegExp,
  rateGroup,
  requiredString,
  squareFeet,
  streetName,
  streetNumber,
  suitability,
  twentyFourHourTime,
  unit,
  url,
  number,
  name,
  amenitySchema,
  phone,
} from './baseSchemas';
import { messages } from './messages';

/** Used for subform validation schemas only
 *  Subform schemas are 'currently' used in onboarding and dashboard
 */

const { requiredValue, longString, requiredNumber, minNumber, unselectedOption, maxString5000, maxString2500 } =
  messages;

const styleSquareFootage = {
  [RequiredSubformsEnum.StyleSquareFootageForm]: yup.object().shape({
    SQUARE_FEET: squareFeet,
    STYLE: yup.object().shape(buttonGroupValidation),
    SIZE_CATEGORY: yup.object().shape(buttonGroupValidation),
  }),
};

export const accountOwner = {
  [RequiredSubformsEnum.AccountOwnerForm]: yup.object().shape({
    [UserTypeEnum.USER]: yup.object().shape({
      IS_COMPANY: boolean,
      COMPANY_NAME: yup.string().when('IS_COMPANY', {
        is: true,
        then: yup.string().max(75).required(requiredValue),
      }),
      FIRST_NAME: yup.string().when('IS_COMPANY', {
        is: false,
        then: yup.string().max(50).required(requiredValue),
      }),
      LAST_NAME: yup.string().when('IS_COMPANY', {
        is: false,
        then: yup.string().max(50, longString).required(requiredValue),
      }),
      EMAIL: email.required(requiredValue),
      PHONE: requiredString,
      IS_SMS_VERIFIED: yup.boolean().isTrue().required().label('SMS Verified'),
      IS_EMAIL_VERIFIED: yup.boolean().isTrue().required().label('Email Verified'),
      ADDRESS: yup.object().shape(addressValidation),
    }),
  }),
};

const amenityArray = yup.array().of(amenitySchema);

// This form is only on Dashboard;
const allAmenitiesForm = {
  [OptionalSubformsEnum.AllAmenitiesFormOptional]: yup.object().shape({
    BuildingAmenitiesForm: yup.object().shape({ AMENITIES_BUILDING: amenityArray }),
    EssentialAmenitiesForm: yup.object().shape({ AMENITIES_ESSENTIAL: amenityArray }),
    KitchenAmenitiesForm: yup.object().shape({ AMENITIES_KITCHEN: amenityArray }),
    PrivateSafetyAmenitiesForm: yup
      .object()
      .shape({ AMENITIES_PRIVATE: amenityArray, AMENITIES_ESSENTIAL: amenityArray }),
  }),
};

const setUpQuestions = {
  [RequiredSubformsEnum.SetupQuestionsForm]: yup.object().shape({
    NUM_PROPERTIES: yup.number().min(1, requiredValue).max(4, requiredValue).required(requiredValue).nullable(),
    PLATFORMS_LISTED: yup.array().of(
      yup.object().shape({
        ID: yup.number().required('Platform Id'),
        URL: yup.string().max(500),
      }),
    ),
  }),
};

const essentialAmenities = {
  [RequiredSubformsEnum.EssentialAmenitiesForm]: yup.object().shape({
    AMENITIES_ESSENTIAL: amenityArray,
  }),
};

const essentialAmenitiesOptional = {
  [OptionalSubformsEnum.EssentialAmenitiesFormOptional]: yup.object().shape({
    AMENITIES_ESSENTIAL: amenityArray,
  }),
};

const privateSafetyAmenities = {
  [RequiredSubformsEnum.PrivateSafetyAmenitiesForm]: yup.object().shape({
    AMENITIES_PRIVATE: yup.array().of(
      yup.object().shape({
        ID: yup.number().min(1, minNumber),
        DESCRIPTION: yup.string().max(1000, longString),
        INSTRUCTIONS: yup.string().max(5000, maxString5000),
      }),
    ),
    AMENITIES_SAFETY: yup.array().of(
      yup.object().shape({
        ID: yup.number().min(1, minNumber),
        DESCRIPTION: yup.string().max(1000, longString),
        INSTRUCTIONS: yup.string().max(5000, maxString5000),
      }),
    ),
  }),
};

const generateBedrooms = (
  subformName: RequiredSubformsEnum.BedroomsForm | OptionalSubformsEnum.BedroomsFormOptional,
) => ({
  [subformName]: yup.object().shape({
    BEDROOMS: yup
      .array()
      .required(requiredValue)
      .of(
        yup.object().shape({
          BEDS: yup
            .array()
            .of(
              yup.object().shape({
                ID: yup.number().positive(unselectedOption).required(requiredValue),
                NAME: yup.string(),
              }),
            )
            .min(1, 'You must add at least one bed'),
          HAS_ENSUITE: boolean,
          HAS_STAIRS: boolean,
          ID: id,
          SLEEPS: number,
          TYPE: yup.object().shape({
            ID: yup.number().positive(unselectedOption),
            NAME: yup.string(),
          }),
          NAME: name.required(requiredValue),
          DESCRIPTION: yup.string().max(2500, longString),
        }),
      )
      .min(1),
    RULES: yup.object().shape({
      MAX_GUESTS: number,
    }),
  }),
});

const bedroomsRequired = {
  ...generateBedrooms(RequiredSubformsEnum.BedroomsForm),
};

const bedroomsOptional = {
  ...generateBedrooms(OptionalSubformsEnum.BedroomsFormOptional),
};

const propertyAddress = {
  [RequiredSubformsEnum.PropertyAddressForm]: yup.object().shape({
    ADDRESS: yup.object().shape({
      ...addressValidation,
      DEVELOPMENT_ID: yup.number().min(1, requiredValue).required(requiredValue),
      RESORT_ID: yup.number().min(1, requiredValue).required(requiredValue),
      // TODO: min should be set to 1 when we actually implement AREA_ID
      // Area and Area Id are not used in the frontend
      AREA_ID: yup.number().min(0, minNumber),

      COUNTRY_ID: yup.number().min(1, minNumber),
      REGION_ID: yup.string().required(requiredValue),

      UNIT: unit,
      CITY: city,
      STREET_NAME: streetName,
      STREET_NUMBER: streetNumber,

      ID: yup.number(),
      LATITUDE: yup.number(),
      LONGITUDE: yup.number(),
    }),
  }),
};

const generateBathrooms = (
  subformName: RequiredSubformsEnum.BathroomsForm | OptionalSubformsEnum.BathroomsFormOptional,
) => ({
  [subformName]: yup.object().shape({
    BATHROOMS: yup.array().of(
      yup.object().shape({
        HAS_BATH: yup.boolean().required(requiredValue).nullable(),
        HAS_SHOWER: yup.boolean().required(requiredValue).nullable(),
        IS_ENSUITE: boolean,
        NAME: name.required(requiredValue),
        DESCRIPTION: yup.string().max(2500, maxString2500),
        ID: id.required(requiredValue),
      }),
    ),
  }),
});

const bathroomsRequired = {
  ...generateBathrooms(RequiredSubformsEnum.BathroomsForm),
};

const bathroomsOptional = {
  ...generateBathrooms(OptionalSubformsEnum.BathroomsFormOptional),
};

const rateSettings = {
  [RequiredSubformsEnum.RateSettingsForm]: yup.object().shape({
    IS_AVAILABILITY_AUTOMATION_ENABLED: yup.boolean().required(requiredValue),
    IS_OPTIMIZED_PRICING_ENABLED: yup.boolean().required(requiredValue),
    PRICING_STRATEGY: yup.object().shape({
      ID: yup.number().min(1, requiredValue).required(requiredValue),
      RATE_INSIGHTS_LEVEL_ID: yup.number().min(1, requiredValue).required(requiredValue),
    }),
    NO_RATES_DATES: yup.array().required(requiredValue),
    RATE_GROUPS: yup
      .object()
      .when('PRICING_STRATEGY.ID', {
        is: PricingStrategyEnum.rateGroup,
        then: yup.object().shape({
          HIGH: yup.object().shape(rateGroup),
          LOW: yup.object().shape(rateGroup),
          MID: yup.object().shape(rateGroup),
          PRIME: yup.object().shape(rateGroup),
        }),
      })
      .when('PRICING_STRATEGY.ID', {
        is: PricingStrategyEnum.smartPricing,
        then: yup.object().shape({
          HIGH: yup.object().shape({ MIN_NIGHTS: yup.number().min(1, requiredValue).required(requiredValue) }),
          LOW: yup.object().shape({ MIN_NIGHTS: yup.number().min(1, requiredValue).required(requiredValue) }),
          MID: yup.object().shape({ MIN_NIGHTS: yup.number().min(1, requiredValue).required(requiredValue) }),
          PRIME: yup.object().shape({ MIN_NIGHTS: yup.number().min(1, requiredValue).required(requiredValue) }),
        }),
      }),
    WEEKEND_PREMIUM: yup.object().shape({
      ID: yup.number().min(1, requiredValue).required(requiredValue),
      DOLLAR_AMOUNT: yup.number().when('ID', {
        is: RatesSettingsWeekendPremiumId.DOLLAR,
        then: yup.number().min(1, requiredNumber).required(requiredValue),
      }),
      PERCENTAGE_AMOUNT: yup.number().when('ID', {
        is: RatesSettingsWeekendPremiumId.PERCENTAGE,
        then: yup.number().min(1, requiredNumber).required(requiredValue),
      }),
    }),
    DISCOUNT_GROUP: yup.object().shape({
      FIVE_DAY: yup.number().required(requiredValue),
      SEVEN_DAY: yup.number().required(requiredValue),
      TEN_DAY: yup.number().required(requiredValue),
    }),
    AVAILABILITY_WINDOW: yup.object().shape({
      ID: yup.number().min(1, requiredValue).required(requiredValue),
    }),
  }),
};

const ratesSchedule = {
  [RequiredSubformsEnum.RatesScheduleForm]: yup.object().shape({
    RATES_SCHEDULE: yup
      .array()
      .min(1, 'You must create at least one Rate Schedule')
      .required('You must create at least one Rate Schedule'),
  }),
};

export const rentalManagerCoHost = {
  [RequiredSubformsEnum.PropertyContactForm]: yup.object().shape({
    IS_CUSTOM_PROPERTY_CONTACT: yup.boolean().required(requiredValue),
    PROPERTY_CONTACT: yup.object().when('IS_CUSTOM_PROPERTY_CONTACT', {
      is: true,
      then: yup.object().shape({
        EMAIL: email.required(requiredValue),
        PHONE: phone.required().label('Phone Number'),
        /**  0 when new property contact, <ID> when existing contact */
        ID: yup.number().required(requiredValue),
        NOTIFY_CHECKIN_REMINDER: yup.boolean().required(requiredValue),
        IS_COMPANY: yup.boolean().required(requiredValue),
        COMPANY_NAME: yup.string().when('IS_COMPANY', {
          is: true,
          then: yup.string().required(requiredValue),
        }),
        FIRST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().required(requiredValue),
        }),
        LAST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().required(requiredValue),
        }),
      }),
    }),
    IS_CO_HOST_MANAGER_ENABLED: yup.boolean().required(requiredValue),
    CO_HOST: yup.object().when('IS_CO_HOST_MANAGER_ENABLED', {
      is: true,
      then: yup.object().shape({
        EMAIL: email.required(requiredValue),
        IS_COMPANY: yup.boolean().required(requiredValue),
        COMPANY_NAME: yup.string().when('IS_COMPANY', {
          is: true,
          then: yup.string().required(requiredValue),
        }),
        FIRST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().required(requiredValue),
        }),
        LAST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().required(requiredValue),
        }),
        /**  0 when new co-host, <ID> when existing co-host */
        ID: yup.number().required(requiredValue),
        NOTIFY_RESORT_SPECIFIC: yup.boolean().required(requiredValue),
        NOTIFY_GENERAL_INQUIRIES: yup.boolean().required(requiredValue),
        NOTIFY_ALL_OWNERS: yup.boolean().required(requiredValue),
        NOTIFY_RESERVATION_REQUESTS: yup.boolean().required(requiredValue),
        NOTIFY_RENEWALS: yup.boolean().required(requiredValue),
        NOTIFY_RESERVATIONS_CANCELLED: yup.boolean().required(requiredValue),
        NOTIFY_RESERVATIONS_ADDED: yup.boolean().required(requiredValue),
      }),
    }),
  }),
};

const calendarBlockoffs = {
  [RequiredSubformsEnum.CalendarBlockOffsForm]: yup.object().shape({
    CALENDAR_SYNC_CONFIRMED: yup.boolean().required(messages.requiredValue).isTrue('You must agree to the terms'),
    BLOCKOFFS: yup.array().of(
      yup.object().shape({
        START: yup.string().required(requiredValue),
        END: yup
          .string()
          .required(requiredValue)
          .when('START', (START, schema) => {
            return schema.test({
              test: (END: any) => {
                const start = dayjs(START);
                const end = dayjs(END);

                return end.isAfter(start, 'day') || end.isSame(start, 'day');
              },
              message: 'Invalid start and end dates entered',
            });
          }),
      }),
    ),
    ICALS: yup.object().shape({
      HAS_ICALS: yup.boolean().required(requiredValue),
      EXTERNAL: yup.array().when('HAS_ICALS', {
        is: true,
        then: yup
          .array()
          .min(1, 'You must add at least one external calender when this option is selected')
          .of(
            yup.object().shape({
              ID: yup.number().required(requiredValue),
              LISTING_URL: url,
              NAME: yup.string().max(200, longString).required(requiredValue),
              URL: url.required(requiredValue),
            }),
          ),
      }),
    }),
  }),
};

const commonBuildingSchema = yup.object().shape({
  CONTENT: yup.object().shape({
    ABOUT_THE_BUILDING: instruction,
  }),
  AMENITIES_BUILDING: yup.array().of(amenitySchema),
});

const buildingAmenities = {
  [RequiredSubformsEnum.BuildingAmenitiesForm]: commonBuildingSchema,
};

const buildingAmenitiesOptional = {
  [OptionalSubformsEnum.BuildingAmenitiesFormOptional]: commonBuildingSchema,
};

const locationRequired = {
  [RequiredSubformsEnum.LocationForm]: yup.object().shape({
    CONTENT: yup.object().shape({ LOCATION: description }),
    IS_SKI_IN_SKI_OUT: yup.boolean().required(requiredValue),
  }),
};

const locationOptional = {
  [OptionalSubformsEnum.LocationFormOptional]: yup.object().shape({
    IS_SKI_IN_SKI_OUT: yup.boolean().required(requiredValue),
    CONTENT: yup.object().shape({
      LOCATION: description,
    }),
    INSTRUCTIONS: yup.object().shape({
      SKI_IN_SKI_OUT: description,
      TO_FROM_LIFTS: description,
      GETTING_AROUND: description,
      GETTING_TO_UNIT: description,
    }),
  }),
};

const accessToUnit = {
  [RequiredSubformsEnum.AccessToUnitForm]: yup.object().shape({
    ACCESS_TO_UNIT: yup.object().shape({
      TYPE: yup.object().shape(buttonGroupValidation),
      METHOD: yup.object().when('TYPE', {
        is: (val: any) => {
          return val.ID === 0;
        },
        then: yup.object().shape(buttonGroupValidationNotRequired),
        otherwise: yup.object().shape(buttonGroupValidation),
      }),
      CODE: yup.object().when('METHOD', {
        is: (val: any) => {
          return val.ID === 2 || val.ID === 3;
        },
        then: yup.object().shape(buttonGroupValidation),
        otherwise: yup.object().shape(buttonGroupValidationNotRequired),
      }),
      STANDARD_CODE: yup.string().when('CODE', {
        is: (val: any) => {
          return val.ID === 1;
        },
        then: requiredString,
        otherwise: yup.string(),
      }),
      CHECK_IN_PROCEDURE: yup.string().min(1).required().label('Check In Procedure'),
      CODES: yup.object().shape({
        INTERNET_NETWORK_NAME: accessCode,
        INTERNET_PASSWORD: accessCode,
        GARAGE_DOOR_CODE: accessCode,
        DEVELOPMENT_DOOR_CODE: accessCode,
        DEVELOPMENT_GYM_CODE: accessCode,
        DEVELOPMENT_HOT_TUB_CODE: accessCode,
        DEVELOPMENT_POOL_CODE: accessCode,
        DEVELOPMENT_SAUNA_CODE: accessCode,
        DEVELOPMENT_STEAM_ROOM_CODE: accessCode,
        SKI_LOCKER_CODE: accessCode,
        BIKE_LOCKER_CODE: accessCode,
        GARBAGE_RECYCLING_CODE: accessCode,
        GAMES_REC_ROOM_CODE: accessCode,
      }),
    }),
  }),
};

const propertyTitle = {
  [OptionalSubformsEnum.PropertyTitleSummaryFormOptional]: yup.object().shape({
    CONTENT: yup.object().shape({
      SUMMARY: yup.string().max(500, longString).required(requiredValue),
      TITLE: yup.string().max(75, longString).required(requiredValue),
      DESCRIPTION: yup.string().max(25000, 'Maximum 25000 characters allowed').required(requiredValue),
    }),
  }),
};

const instructions = {
  [OptionalSubformsEnum.CheckInEmailFormOptional]: yup.object().shape({
    INSTRUCTIONS: yup.object().shape({
      WELCOME: instruction,
      HOUSEKEEPING: instruction,
      LINENS_AND_TOWELS: instruction,
      GARBAGE_RECYCLING: instruction,
      FRONT_DESK: instruction,
      TO_FROM_LIFTS: instruction,
      SKI_IN_SKI_OUT: instruction,
      GETTING_AROUND: instruction,
      WHAT_TO_BRING: instruction,
      RESTAURANTS: instruction,
      SERVICES: instruction,
      OTHER: instruction,
    }),
  }),
};

// TODO: figure out how to get formInput photo validation into this schema
export const minPhotos = 5;
export const photos = {
  [RequiredSubformsEnum.PhotosForm]: yup.object().shape({
    EXTERNAL_URLS: yup.object().shape({
      URL_AIRBNB: yup.string().trim().url('Field must be a valid url'),
      URL_VRBO: yup.string().trim().url('Field must be a valid url'),
      URL_OTHER: yup.string().trim().url('Field must be a valid url'),
    }),
    NUM_PHOTOS: yup.number().when('EXTERNAL_URLS', externalUrls => {
      const hasExternalUrl = Object.keys(externalUrls).some(key => {
        if (!externalUrls[key]) return false;

        return externalUrls[key].length !== 0;
      });

      if (hasExternalUrl) {
        return yup.number().min(0, 'No photos are required');
      } else {
        return yup.number().min(minPhotos, 'Please enter at least 5 photos').required(requiredValue);
      }
    }),
  }),
};

const cancellationPolicy = {
  [RequiredSubformsEnum.CancellationPoliciesForm]: yup.object().shape({
    CANCELLATION_POLICY: yup.object().shape({
      IS_CREDIT_ONLY_REFUND: yup.string().required(requiredValue),
      IS_REFUND_REBOOKED_DATES: yup.string().required(requiredValue),
      IS_SPECIAL_CIRCUMSTANCE: yup.boolean().required(unselectedOption),
      SPECIAL_CIRCUMSTANCE_ID: yup.number().when('IS_SPECIAL_CIRCUMSTANCE', {
        is: true,
        then: yup.number().min(1, unselectedOption).max(6, unselectedOption).required(requiredValue),
      }),
      // @ts-ignore
      SPECIAL_CIRCUMSTANCE_DESCRIPTION: yup.string().test({
        message: requiredValue,
        test: function (this, value) {
          const isCustomSelected =
            Number(this.parent.SPECIAL_CIRCUMSTANCE_ID) === CancellationPolicySpecicalCircumstanceIDEnum.Other;
          const isValid = value && value.length > 0;

          return isCustomSelected ? isValid : true;
        },
      }),
      ADMIN_PENALTY_UNIT: yup.string().matches(/^$|\$|%/, 'Must enter percentage or dollar amount'),
      ADMIN_PENALTY: yup
        .number()
        .test({
          message: 'Must Be Greater Than Zero',
          test: function (this, value) {
            const hasSelectedAdminPenalty = this.parent.ADMIN_PENALTY_UNIT;
            const isGreaterThanZero = value !== undefined && value > 0;

            return hasSelectedAdminPenalty ? isGreaterThanZero : true;
          },
        })
        .test({
          message: 'Cannot exceed 100%',
          test: function (this, value) {
            const hasSelectedPercentage = this.parent.ADMIN_PENALTY_UNIT === '%';
            const isValid = value !== undefined && value <= 100;

            return hasSelectedPercentage ? isValid : true;
          },
        }),
      POLICY_ID: yup.number().min(1, unselectedOption).max(4, unselectedOption).required(requiredValue),
    }),
  }),
};

const suitabilities = {
  [RequiredSubformsEnum.SuitabilitiesForm]: yup.object().shape({
    RULES: yup.object().shape({
      MIN_AGE_TO_BOOK: minAge,
      QUIET_TIME: yup.string().required(requiredValue),
    }),
    SUBMIT_OK: yup.bool().oneOf([true], 'All fields must be selected'),
    SUITABILITIES: yup.object().shape({
      LONG_TERM_RENTALS: suitability,
      PARTIES_EVENTS: suitability,
      PETS: suitability,
      SMOKING: suitability,
      TRAVEL_RESELLERS: suitability,
      WHEELCHAIR_ACCESSIBLE: suitability,
    }),
  }),
};

const checkInOut = {
  [RequiredSubformsEnum.CheckInOutForm]: yup.object().shape({
    RULES: yup.object().shape({
      CHECK_IN: twentyFourHourTime,
      CHECK_OUT: twentyFourHourTime,
    }),
    INSTRUCTIONS: yup.object().shape({
      LATE_CHECK_IN: yup.string().max(5000, maxString5000),
      CHECK_IN: yup.string().max(5000, maxString5000),
      CHECK_OUT: yup.string().max(5000, maxString5000),
    }),
    CODES: yup.object().shape({
      GARBAGE_RECYCLING_CODE: accessCode,
      DEVELOPMENT_DOOR_CODE: accessCode,
    }),
  }),
};

const advancedBookingSettings = {
  AdvancedBookingSettingsForm: yup.object().shape({
    RULES: yup.object().shape({
      ADVANCED_BOOKING: yup.object().shape(buttonGroupValidation),
    }),
  }),
};

const surcharges = {
  SurchargesForm: yup.object().shape({
    SURCHARGES: yup.object().shape({
      PETS: yup.object().shape({
        IS_ENABLED: yup.boolean().required(requiredValue),
        AMOUNT: yup.number().when('IS_ENABLED', {
          is: true,
          then: yup.number().min(1, minNumber).required(requiredValue),
        }),
      }),
      CLEANING: yup.object().shape({
        IS_ENABLED: yup.boolean().required(requiredValue),
        AMOUNT: yup.number().when('IS_ENABLED', {
          is: true,
          then: yup.number().min(1, minNumber).required(requiredValue),
        }),
      }),
    }),
    IS_SUITABILITY_PETS_ENABLED: yup.boolean().required(requiredValue),
  }),
};

const damageDeposit = {
  DamageDepositForm: yup.object().shape({
    DAMAGE_DEPOSIT: yup.object().shape({
      TYPE: yup.object().shape(idNameValidation).required(requiredValue),
      AMOUNT: yup.number().when('TYPE', {
        is: (val: any) => val.ID === '1',
        then: currency.min(1, minNumber),
        otherwise: yup.number().when('TYPE', {
          is: (val: any) => val.ID === '3',
          then: currency.min(1, minNumber),
        }),
      }),
    }),
  }),
};

const taxes = {
  TaxesForm: yup.object().shape({
    TAXES: yup.array().of(
      yup.object().shape({
        IS_ENABLED: yup.boolean().required(),
        TAX_NUMBER: yup.string().test({
          message: requiredValue,
          test: function (this, value) {
            const isNumberRequired =
              this.parent.ID === PropertyTaxIDEnum.PST_BC || this.parent.ID === PropertyTaxIDEnum.GST;
            const isValueValid = this.parent.IS_ENABLED ? (value as string)?.length > 0 : true;

            return isNumberRequired ? isValueValid : true;
          },
        }),
        ID: yup.number(),
      }),
    ),
  }),
};

const ownerAddress = {
  OwnerAddressForm: yup.object().shape({
    OWNER: yup.object().shape({
      COMPANY_NAME: yup.string().max(75, longString),
      FIRST_NAME: yup.string().max(50, longString),
      LAST_NAME: yup.string().max(50, longString),
      EMAIL: email,
      ADDRESS: yup.object().shape(addressValidation),
    }),
  }),
};

export const parkingFormSchema = {
  [RequiredSubformsEnum.ParkingForm]: yup.object({
    PARKING: yup.object().shape({
      DESCRIPTION: yup.string().max(500, longString),
      INSTRUCTIONS: htmlRequired(5000),
      HAS_ADDITIONAL_FREE_SPOTS: boolean,
      HAS_ADDITIONAL_PAID_SPOTS: boolean,
      NUM_SPOTS_PROVIDED: yup.number().min(0).required(requiredValue),
      IS_DEFAULT_DESCRIPTION: yup.boolean().required(requiredValue),
      CODES: yup.object().shape({
        GARAGE_DOOR_CODE: accessCode,
      }),
    }),
  }),
};

const emergencyContacts = {
  [RequiredSubformsEnum.EmergencyContactsForm]: yup.object().shape({
    EMERGENCY_CONTACTS: yup.object().shape({
      PRIMARY: yup.object().shape({
        IS_COMPANY: yup.boolean().required(requiredValue),
        COMPANY_NAME: yup.string().when('IS_COMPANY', {
          is: true,
          then: yup.string().required(requiredValue),
        }),
        FIRST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().max(50, longString).required(requiredValue),
        }),
        LAST_NAME: yup.string().when('IS_COMPANY', {
          is: false,
          then: yup.string().max(50, longString).required(requiredValue),
        }),
        EMAIL: email,
        PHONE: requiredString,
        ID: yup.number().required(),
      }),
      OTHERS: yup.array().of(
        yup.object().shape({
          ID: yup.number().required(requiredValue),
          IS_COMPANY: yup.boolean().required(requiredValue),
          COMPANY_NAME: yup.string().when('IS_COMPANY', {
            is: true,
            then: yup.string().required(requiredValue),
          }),
          FIRST_NAME: yup.string().when('IS_COMPANY', {
            is: false,
            then: yup.string().max(50, longString).required(requiredValue),
          }),
          LAST_NAME: yup.string().when('IS_COMPANY', {
            is: false,
            then: yup.string().max(50, longString),
          }),
          EMAIL: email,
          PHONE: requiredString,
          TYPE_ID: yup.number().min(1, requiredValue).required(requiredValue),
        }),
      ),
      INSTRUCTIONS: yup.string(),
    }),
  }),
};

const banking = {
  [RequiredSubformsEnum.BankingForm]: yup.object().shape({
    BANKING: yup.object().shape({
      ACCOUNTHOLDER: yup.object().shape({
        IS_COMPANY: yup.boolean().required(requiredValue),
        COMPANY_NAME: yup.string().when('IS_COMPANY', {
          is: true,
          then: yup.string().required(requiredValue),
        }),
        FIRST_NAME: yup
          .string()
          .max(100, 'Too Long!')
          .when('IS_COMPANY', {
            is: false,
            then: yup.string().required(requiredValue),
          }),
        LAST_NAME: yup
          .string()
          .max(100, 'Too Long!')
          .when('IS_COMPANY', {
            is: false,
            then: yup.string().required(requiredValue),
          }),
        ADDRESS: yup.object().shape(addressValidation),
      }),
      BANK: yup.object().shape({
        ACCOUNT_NUMBER: yup
          .string()
          .required('required')
          .matches(numberRegExp, 'Account Number must be a number')
          .min(5, 'Must be more than four characters')
          .max(34, 'Must be less than 35 characters'),
        TRANSIT: yup
          .string()
          .required('required')
          .matches(numberRegExp, 'Transit Number must be a number')
          .min(5, 'Must be five characters')
          .max(5, 'Must be five characters'),
        NAME: yup.string().min(2, 'Must be two characters').max(50, longString).required(requiredValue),
        INSTITUTION: yup
          .string()
          .required('required')
          .matches(numberRegExp, 'Institution Number must be a number')
          .min(3, 'Must be three characters')
          .max(3, 'Must be three characters'),
      }),
    }),
  }),
};

const cleaningProtocol = {
  CleaningProtocolForm: yup.object().shape({
    CLEANING_PROTOCOL: yup.object().shape({
      IS_APPLY_TO_EXISTING_BOOKINGS: yup.boolean().required(requiredValue),
      HAS_AUTOMATIC_BUFFER_DAYS: yup.boolean().required(requiredNumber),
      NUMBER_OF_BLOCKOFF_DAYS: yup.number().when('HAS_AUTOMATIC_BUFFER_DAYS', {
        is: true,
        then: yup.number().moreThan(-1).required(requiredValue),
      }),
    }),
  }),
};

const partnersForm = {
  [RequiredSubformsEnum.PartnersForm]: yup.object().shape({
    PARTNERS: yup.array().of(
      yup.object().shape({
        ID: yup.number().positive().integer().required(requiredValue),
      }),
    ),
  }),
};

const nonResident = {
  [RequiredSubformsEnum.NonResidentStatusForm]: yup.object().shape({
    NON_RESIDENT: yup.object().shape({
      IS_NON_RESIDENT: yup.boolean().required(requiredValue),
      ITN_INFO: yup.array().when('IS_NON_RESIDENT', {
        is: true,
        then: yup.array().of(
          yup.object().shape({
            ITN: yup
              .string()
              .notRequired()
              .min(9, 'ITN must be 9 digits or longer')
              .max(20, 'ITN must be 20 digits or less'),
            PERCENTAGE_OWNERSHIP: yup.number().notRequired().min(0).max(100),
            FIRST_NAME: yup.string().required('Please Enter Your First Name'),
            LAST_NAME: yup.string().required('Please Enter Your Last Name'),
            DOB: yup.string().notRequired(),
            YEAR: yup.string().notRequired(),
            MONTH: yup.string().notRequired(),
            DAY: yup.string().notRequired(),
          }),
        ),
      }),
      ITN_DATA: yup.string().when('IS_NON_RESIDENT', {
        is: true,
        then: yup.string().test({
          message: 'Percentage Ownership Must Total 100%',
          test: function () {
            const itnInfo = this.parent.ITN_INFO;

            // If no owners, do not worry about this validation
            if (itnInfo.length === 0) {
              return true;
            }

            for (let i = 0; i < itnInfo.length; i++) {
              if (isNaN(parseInt(itnInfo[i].PERCENTAGE_OWNERSHIP))) {
                return false;
              }
            }

            const percentageTotal: Big = itnInfo.reduce((prev: Big, curr: any) => {
              const currPercentage = curr.PERCENTAGE_OWNERSHIP;
              const isNum = !isNaN(parseInt(currPercentage));

              if (isNum) {
                return prev.add(currPercentage);
              }

              return prev;
            }, new Big(0));

            // We give some leeway to make the total percentage calculation easy on users
            return percentageTotal.gte(97) && percentageTotal.lte(103);
          },
        }),
      }),
    }),
  }),
};

export const schema = {
  ...advancedBookingSettings,
  ...accessToUnit,
  ...accountOwner,
  ...allAmenitiesForm,
  ...banking,
  ...bathroomsOptional,
  ...bathroomsRequired,
  ...bedroomsOptional,
  ...bedroomsRequired,
  ...buildingAmenities,
  ...buildingAmenitiesOptional,
  ...calendarBlockoffs,
  ...cancellationPolicy,
  ...checkInOut,
  ...cleaningProtocol,
  ...damageDeposit,
  ...emergencyContacts,
  ...essentialAmenities,
  ...essentialAmenitiesOptional,
  ...instructions,
  ...locationOptional,
  ...locationRequired,
  ...nonResident,
  ...ownerAddress,
  ...parkingFormSchema,
  ...partnersForm,
  ...photos,
  ...privateSafetyAmenities,
  ...propertyAddress,
  ...propertyTitle,
  ...rateSettings,
  ...ratesSchedule,
  ...rentalManagerCoHost,
  ...setUpQuestions,
  ...styleSquareFootage,
  ...suitabilities,
  ...surcharges,
  ...taxes,
} as any;

export const generateSchema = (subformName: RequiredSubformsEnum | OptionalSubformsEnum) => {
  return yup.object().shape({ [subformName]: schema[subformName] });
};

export const formSchemas = {
  emptySchema: yup.object,
};
