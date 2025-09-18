import {
  BLACKOUT_PERIOD,
  BOOKING_SURCHARGES_LIST,
  CANCELLATION_POLICY,
  NOTIFICATION_ENDPOINT_RESPONSE,
  address,
  amenity,
  contactTracingGuest,
  initialLocationData,
  notification,
  propertyGuidebookPDF,
  propertyOwner,
  tax,
  taxSurcharge,
  transaction,
} from './constants';
import { FetchMethodTypes, FetchMethods } from '../customReact/apiHooks/types';

// INFERRED TYPES - full api responses
export type NotificationEndpointResponse = typeof NOTIFICATION_ENDPOINT_RESPONSE;
export type PropertyGuidebookPDF = typeof propertyGuidebookPDF;
export type BookingSurchargesList = typeof BOOKING_SURCHARGES_LIST;

// Partial Types - Used as part of api responses
export type Address = typeof address;
export type CancellationPolicy = typeof CANCELLATION_POLICY;

export type Tax = typeof tax;
export type TaxSurcharge = typeof taxSurcharge;
export type Transaction = typeof transaction;
export type LocationDetails = typeof initialLocationData;
export type AlluraNotification = typeof notification;
export type Amenity = typeof amenity;
export type BlackoutPeriod = typeof BLACKOUT_PERIOD;

/** Group an api url with corresponding methods and typings!
 * Makes it easy for developers to put together related info regarding an endpoint
 */
export type APIEndpoint<TEndpoint = any, TReturn = any, TSend = any> = {
  endpoint: TEndpoint;
  method: FetchMethods | FetchMethodTypes;
  returnType: TReturn;
  sendType?: TSend;
};

// alluraDirect API responses return data in the following format
// Can provide a server type in the generic param or allow the default of any
// This type is useful when you want to type the full API response in the DATA field with a specific type T
export type APIResponse<T> = {
  DATA: T;
  ERRORS: { CLIENT_MESSAGE?: string; DEVELOPER_MESSAGE?: string };
  MESSAGES: { CLIENT_MESSAGE?: string; DEVELOPER_MESSAGE?: string };
  SUCCESS: boolean;
};

// This type is useful when you want to add a type T to a specific key P in an API data response
export interface APIKeyResponse<T, P extends string> extends Omit<APIResponse<T>, 'DATA'> {
  DATA: {
    [key in P]: T;
  };
}

// https://bobbyhadz.com/blog/typescript-make-property-required#:~:text=To%20make%20an%20optional%20property,specified%20property%20marked%20as%20required.
// Mark an optional property as required
export type WithRequiredProperty<Type, Key extends keyof Type> = Type &
  {
    [Property in Key]-?: Type[Property];
  };

// ENUMS
export enum SurchargeIDEnum {
  cleaningFee = 1,
  petFee = 2,
}

export enum SurchargeNameEnum {
  cleaning = 'CLEANING',
  pet = 'PETS',
}

export enum TaxIDEnum {
  GST = 1,
  PST = 2,
  MRDT = 19,
}

// Allura User Types (source: Taivo)
// 1	Allura Admin
// 2	Owner
// 3	Guest
// 4	Resort Admin
// 5	Property Contact
// 6	Title Holder
// 7	Emergency Contact
// 8	Allura Developer
// 9	Allura Finance
// 10	Global Admin
// 11	API User
// 12	Property Manager
// 13	Co-Host

// TODO: separate enum for owner and property notifications
export enum NotificationCategoriesEnum {
  NEWS = 'news',
  BOOKING = 'booking',
  FINANCE = 'finance',
  INQUIRIES = 'inquiry',
  PROPERTIES = 'properties',
  REVIEW = 'review',
  RESERVATION_REQUEST = 'reservation_request',
  SUBSCRIPTION_RENEWAL = 'subscription_renewal',
  UNBOOKABLE_DATES = 'unbookable_dates',
  UPDATE_LISTING = 'update_listing',
}

export enum NotificationCategoryIdEnum {
  ALLURA_NEWS = 1,
  BOOKING = 2,
  FINANCE = 3,
  INQUIRY = 4,
  REVIEW = 5,
  /** Appears when a property is in gateway closed mode */
  RESERVATION_REQUEST = 6,
  SUBSCRIPTION_RENEWAL = 7,
  UNBOOKABLE_DATES = 8,
  UPDATE_LISTING = 9,
}

export enum NotificationEndpointFilterCategory {
  NEWS = 'news',
  FEATURED = 'featured',

  PRIMARY = 'primary',
}

export enum NotificationEndpointFilterStatus {
  ALL = 'all',
  DISMISSED = 'dismissed',
  ACTIVE = 'active',
}

export enum NotificationLevelsEnum {
  INFORMATIONAL = 'informational',
  DEADLINE_APPROACHING = 'deadline approaching',
  REQUIRES_ACTION = 'requires action',
  URGENT_NOTICE = 'urgent notice',
}

export enum DamageDepositModeId {
  // Charge CC at guest arrival
  COLLECT_AT_CHECKIN = 1,
  // Collect at a balance payment sometime starting 45 days before arrival
  COLLECT_45_DAYS_BEFORE_ARRIVAL = 3,
  // Charge if property is damaged
  COLLECT_DAMAGE_UPON_DEPARTURE = 4,
}

export interface LocationDataResort {
  REGION_ID: number;
  NAME: string;
  ID: number;
}

export interface LocationDataDevelopment {
  AREA_ID: number;
  ID: number;
  NAME: string;
  RESORT_ID: number;
}

export interface LocationDataRegion {
  ID: number;
  NAME: string;
  COUNTRY_ID: number;
}

export interface NameIdItem {
  NAME: string;
  ID: number;
}

export enum PropertyTaxIDEnum {
  GST = 1,
  PST_BC = 2,
  MRDT_WHISTLER = 19,
}

export enum PropertyAmenityId {
  PRIVATE_SKI_STORAGE = 14,
  PRIVATE_BIKE_STORAGE = 15,

  BUILDING_BIKE_STORAGE = 21,
  BUILDING_SKI_STORAGE = 22,
  BUILDING_HOT_TUB = 25,
  BUILDING_SAUNA = 26,
  BUILDING_STEAM_ROOM = 27,
  BUILDING_POOL = 28,
  BUILDING_FITNESS_FACILITIES = 30,
  BUILDING_GAMES_REC_ROOM = 31,

  WIFI = 93,
}

export enum LocationURLParamsEnum {
  developments = 'developments',
  countries = 'countries',
  resorts = 'resorts',
  regions = 'regions',
  areas = 'areas',
  property_categories = 'property_categories',
}

// TODO: remove as part of notistack
export enum ToastVariants {
  default = 'default',
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

export enum NotificationStatus {
  DISMISSED = 'dismissed',
  ACTIVE = '',
}

export type ContactTracingGuest = typeof contactTracingGuest;

export type PropertyOwner = typeof propertyOwner;

export type InfiniteQueryPageDirections = 'future' | 'past';
