import { PlatformListedId } from '../property/types';
import { OptionalSubformsEnum, RequiredSubformsEnum } from '../subformNames';

import { NameIdItem } from '../types';
import { initialFormInputs } from './constants';

// Inferred Types
export type FormInputs = typeof initialFormInputs;

// Partial Types

export type FormInputKeys = keyof FormInputs;
export type FormInputValues = FormInputs[FormInputKeys];

export enum ResortIdEnum {
  Whistler = 1,
  SunPeaks = 2,
  BigWhite = 3,
}

export enum PartnerIdEnum {
  Whistler = 4,
  WhistlerBlackomb = 26,
}

export interface NameIdDescriptionItem {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
}

interface TypeItem {
  TYPE: string;
}

export interface LabelNameItem {
  LABEL: string;
  NAME: string;
}

export interface AmenityItem {
  CATEGORY: string;
  LIST: NameIdItem[];
  TITLE: string;
}

export interface Amenities {
  BATHROOM: AmenityItem;
  BUILDING: AmenityItem;
  ESSENTIAL: AmenityItem;
  KITCHEN: AmenityItem;
  LAUNDRY: AmenityItem;
  PRIVATE: AmenityItem;
  SAFETY: AmenityItem;
}

export interface AmenityCategories {
  BATHROOM: TypeItem[];
  BUILDING: TypeItem[];
  ESSENTIAL: TypeItem[];
  KITCHEN: TypeItem[];
  PRIVATE: TypeItem[];
  SAFETY: TypeItem[];
}

export interface BedroomTypeItem {
  DESCRIPTION: string;
  ID: 1;
  IS_BEDROOM: number;
  NAME: string;
  SORT_ORDER: number;
}

export enum CancellationPolicySpecicalCircumstanceIDEnum {
  OneHundredPercentRefund = 1,
  OneHundredPercentCredit = 2,
  Other = 3,
}

export interface FormBookingPlatform {
  NAME: 'Airbnb' | 'VRBO' | 'My Own Site' | 'Other';
  ID: PlatformListedId;
}

export interface FormMostImportant {
  NAME: 'Quality Guests' | 'Higher Revenue';
  ID: number;
}

interface PoliciesItem {
  ID: number;
  NAME: string;
  GROUP: string;
  GROUP_ID: number;
  DEFAULT_DESCRIPTION: string;
  IS_EDITABLE: boolean;
}

export interface Policies {
  ACCOUNT: PoliciesItem[];
  CANCELLATION: PoliciesItem[];
  GENERAL: PoliciesItem[];
  GUEST_STAY: PoliciesItem[];
  RESERVATION: PoliciesItem[];
}

export interface PropertyManagerItem {
  COMPANY_NAME: string;
  EMAIL: string;
  FIRST_NAME: string;
  ID: number;
  LAST_NAME: string;
  PHONE: string;
}

export interface SuitabilityItem {
  ID: number;
  IS_SUITABLE: string | boolean;
  NAME: string;
}

export interface BedroomTypes {
  SORT_ORDER: number;
  NAME: string;
  ID: number;
  DESCRIPTION: string;
  IS_BEDROOM: string;
}

export interface Subforms {
  SORT_ORDER: number;
  MILESTONE: number;
  NAME: RequiredSubformsEnum | OptionalSubformsEnum;
  ID: number;
  DESCRIPTION: string;
}

export interface Channel {
  BOOKING_COMMISSION_DESCRIPTION: string;
  DESCRIPTION: string;
  BOOKING_COMMISSION_PERCENTAGE: number;
  CREDIT_CARD_PERCENTAGE: number;
  ID: number;
  LOGO_URL: string;
  TERMS_OF_SERVICE: string;
  WEBSITE_URL: string;
}

export enum SearchFilterSourceEnum {
  ALL = 'all',
  AD = 'ad',
  DV = 'dv',
  WC = 'wc',
  VAIL = 'vail',
}
export type SearchFilterSourceItemValue = SearchFilterSourceEnum;

interface SearchFilterSourceItem {
  value: SearchFilterSourceEnum;
  label: 'All' | 'alluraDirect' | 'Direct Vacations' | 'Whistler.com' | 'Resort Reservations Vail';
}

export enum SearchFiltersSortEnum {
  ARRIVAL = 'arrival',
  ARRIVAL_DATE = 'arrival_date',
  BOOKING_DATE = 'booking_date',
}
export type SearchFiltersFilterByItemValue = SearchFiltersSortEnum;
interface SearchFiltersFilterByItem {
  value: SearchFiltersFilterByItemValue;
  label: 'Arrival Date' | 'Booking Date';
}

export enum SearchFiltersStatusEnum {
  ALL = 'all',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}
export type SearchFiltersStatusItemValue = SearchFiltersStatusEnum;

interface SearchFiltersStatusItem {
  value: SearchFiltersStatusItemValue;
  label: SearchFiltersStatusEnum;
}
export interface SearchFilters {
  SOURCE: SearchFilterSourceItem[];
  FILTER_BY: SearchFiltersFilterByItem[];
  STATUS: SearchFiltersStatusItem[];
}

export interface JoinStatusItem {
  NAME: string;
  ID: number;
}
export interface FormInputsReservationSettings {
  DEPOSIT_PERCENTAGES: number[];
  BALANCE_DUE_DATES: { ID: number; DESCRIPTION: string }[];
  BOOKING_GATEWAY_MODES: NameIdDescriptionItem[];
}

export interface SubscriptionTier {
  /** premium-only options */
  ANNUAL_FEE: string;
  NUMBER_OF_DAYS: number;

  /** Percentage fee */
  BOOKING_FEE: number;
  /** Percentage fee */
  CREDIT_CARD_FEE: number;
  TITLE: string;
  DESCRIPTION: string;
  SUBTITLE: string;
  ID: number;
  IS_ALLOWED_PRIVATE_SITE: boolean;
  IS_RECOMMENDED: boolean;
  RESORT_ID: number;
  SIMILAR_SITE: string;

  TAXES: [
    {
      NAME: string;
      ID: number;
      TOTAL: string;
      RATE: number;
    },
  ];
}

export enum AccessCodeTypeIDEnum {
  AccessCode = 1,
  PhysicalKeyCard = 2,
}

export enum AccessMethodIdEnum {
  FrontDesk = 1,
  Email = 2,
  LockBox = 3,
  Other = 4,
}

export enum AccessCodeIdEnum {
  NO_CODE = 0,
  STANDARD_CODE = 1,
  UNIQUE_PER_GUEST = 2,
}

export interface PhotoValidation {
  MAX_SIZE_MB: number;
  MIN_HEIGHT_PIXELS: number;
  ACCEPTED_FILE_FORMATS: string;
  ACCEPTED_FILE_FORMATS_EXTENSION: string;
  ACCEPTED_MIME_FORMATS: string;
  LOGO_MAX_SIZE_KB: number;
  LOGO_MAX_SIZE_MB: number;
  MAX_NUMBER_PHOTOS: number;
  MAX_SIZE_BYTES: number;
  MIN_NUMBER_PHOTOS: number;
}

export interface EmergencyContactType {
  SORT_ORDER: number;
  NAME: string;
  ID: number;
}

export interface RateGroupItem {
  TITLE: string;
  DESCRIPTION: string;
  MIN_NIGHTS_RATE: number;
  BASE_RATE: number;
}

export interface RateAutomationItem {
  ID: number;
  NAME: string;
  NUM_MONTHS: number;
}

export interface PropertySettingItem {
  ID: number;
  NAME: string;
}

export interface RateSuggestionItem {
  BASE_RATE: number;
  ID: number;
  MIN_NIGHTS: number;
  RATE_GROUP_TYPE: string;
  RATE_GROUP_TYPE_ID: number;
  RESORT: string;
  RESORT_ID: number;
  SIZE_CATEGORY: string;
  SIZE_CATEGORY_ID: number;
}

export interface PropertySetting extends PropertySettingItem {
  REFERENCE: string;
}
