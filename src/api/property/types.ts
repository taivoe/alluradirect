import {
  ACCESS_TO_UNIT,
  BANK_DEPOSITS,
  EXTERNAL_EVENT,
  ITN_INFORMATION,
  PHOTO,
  PROPERTY_DEFAULT_CONTENT,
  PROPERTY_REVIEWS,
  PROPERTY_SURCHARGES,
  RATES_SETTINGS,
  RATE_SCHEDULE_GENERATE_INSIGHT,
  RATE_SCHEDULE_GENERATE_OPTIMIZE,
  RATE_SUGGESTION,
  RATE_SUGGESTIONS,
  SURCHARGE,
  UNAVAILABLE_DATES,
  calendarDate,
  calendarEvent,
  initialLastAndNextGuest,
  initialPropertyState,
  sparseRate,
  sparseSeason,
} from './constants';
import {
  SearchFilterSourceItemValue,
  SearchFiltersFilterByItemValue,
  SearchFiltersStatusEnum,
} from '../ownerFormInputs/types';

import { RESERVATION_SETTINGS } from '../constants';

// Full Server Types
export type Property = typeof initialPropertyState;
export type UnavailableDates = typeof UNAVAILABLE_DATES;
export type BankDeposits = typeof BANK_DEPOSITS;
export type PropertySurcharge = typeof SURCHARGE;
export type PropertySurcharges = typeof PROPERTY_SURCHARGES;
export type Photo = typeof PHOTO;
export type PropertyDefaultContent = typeof PROPERTY_DEFAULT_CONTENT;
export type ExternalEvent = typeof EXTERNAL_EVENT;
export type LastAndNextGuest = typeof initialLastAndNextGuest;
export type PropertyReviews = typeof PROPERTY_REVIEWS;
/** Returned from /property/ratesuggestion/ */
export type RateSuggestions = typeof RATE_SUGGESTIONS;
/** Return from /property/rateschedule/generate/optimize/ */
export type RateScheduleGenerateOptimize = typeof RATE_SCHEDULE_GENERATE_OPTIMIZE;
/** /property/rateschedule/generate/insight/ */
export type RateScheduleGenerateInsight = typeof RATE_SCHEDULE_GENERATE_INSIGHT;

// Partial Server Types
export type AccessToUnit = typeof ACCESS_TO_UNIT;
export type PropertyCodes = typeof initialPropertyState.CODES;
export type RateSuggestion = typeof RATE_SUGGESTION;

export type ReservationSettings = typeof RESERVATION_SETTINGS;
export interface CalendarDate extends Omit<typeof calendarDate, 'SEASON'> {
  SEASON: SparseSeason;
}
export type CalendarDates = CalendarDate[];
export interface CalendarEvent extends Omit<typeof calendarEvent, 'TYPE'> {
  TYPE: EventTypeEnum;
}
export type CalendarEvents = CalendarEvent[];
export interface Bed {
  NAME: string;
  ID: number;
  QUANTITY: number;
}

export interface BathroomAmenity {
  CATEGORY: string;
  NAME: string;
  CATEGORY_ID: number;
  ID: number;
}

export interface Bathroom {
  DESCRIPTION: string;
  HAS_BATH: boolean | null;
  HAS_SHOWER: boolean | null;
  ID: number;
  IS_ENSUITE: boolean;
  NAME: string;
  AMENITIES_BATHROOM: BathroomAmenity[];
}

export enum BedroomTypeIDEnum {}

export interface Bedroom {
  BEDS: Bed[];
  DESCRIPTION: string;
  HAS_ENSUITE: boolean;
  HAS_STAIRS: boolean;
  ID: number;
  IS_COMMON_AREA: boolean;
  IS_DEN: boolean;
  IS_LOFT: boolean;
  LEVEL: number;
  NAME: string;
  SLEEPS: number;
  TYPE: { ID: number; NAME: string };
}

export interface EmergencyContact {
  DESCRIPTION: string;
  EMAIL: string;
  ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  PHONE: string;
  COMPANY_NAME: string;
  IS_COMPANY: boolean;
  TYPE: string;
  TYPE_ID: number;
}

export enum EventTypeEnum {
  // 'physically' block calendar dates
  Blockoff = 'blockoff',
  Booking = 'booking',
  Cleaning = 'cleaning',
  ExternalBooking = 'external_booking',
  Gap = 'gap',

  NewBlockoff = 'newBlockoff',
  NewBooking = 'newBooking',
  Quote = 'quote',
  Season = 'season',

  // Rate Schedule
  RateSchedule = 'rateSchedule',
}

export interface OwnerResponse {
  ID: number;
  MESSAGE: string;
  RESPONSE_DATE: string;
  RESPONSE_TIME: string;
  SUBJECT: string;
  TO_EMAILS: string;
  FROM_EMAIL: string;
  INQUIRY_ID: number;
}

export interface Inquiry {
  ID: number;
  GUEST_REQUESTS: string;
  INQUIRY_TIME: string;
  INQUIRY_DATE: string;
  NIGHTS: number;
  ARRIVAL: string;
  DEPARTURE: string;
  NUM_HOST_RECOMMENDATIONS: string;
  GUEST_PHONE: string;
  GUEST_NAME: string;
  GUEST_EMAIL: string;
  PARTY_SIZE: number;
  OWNER_RESPONSES: OwnerResponse[];
}

// See: https://alluradirect.atlassian.net/wiki/spaces/DD/pages/835387393/Property+Join+Status
export enum JoinStatusIDEnum {
  // Property has not started onboarding (has not completed a single form)
  NotStarted = 1,
  // Some (not all) onboarding forms completed
  InProgress = 2,
  // All required forms in onboarding completed
  FormsCompleted = 3,
  // Forms completed and activation requested
  ActivationRequested = 4,
  // After requesting activation and before approved
  AskedForMoreInformation = 5,
  // Legacy property that has not started onboarding
  SetUpInProgress = 6,
  // Property has been approved and is now 'live'
  ListingActive = 7,
  // After requesting activation the property has been declined
  ApplicationDeclined = 8,
  // After listing active, requested deactivation
  DeactivationRequested = 9,
  // Property is fully deactivated/disabled
  ListingDisabled = 10,
  // Legacy property that has not renewed subscription
  ListingInactive = 11,
}

export interface Policy {
  DATE_CREATED: Date | string;
  DATE_UPDATED: Date | string;
  DESCRIPTION: string;
  GROUP: 'General' | 'Reservation' | 'House_Rules' | 'Property';
  GROUP_ID: number;
  ID: number;
  IS_EDITABLE: boolean;
  NAME: string;
  PROPERTY_ID: number;
}

export type PolicyCategories = typeof initialPropertyState.POLICIES;

export enum PropertySubscriptionTierIdEnum {
  PREMIUM = 1,
  /** Host Commission */
  STANDARD = 2,
  GUEST_COMMISION = 3,
}

export type RatesSettings = typeof RATES_SETTINGS;

export enum RatesSettingsWeekendPremiumId {
  NOT_SET = 0,
  DISABLED = 1,
  DOLLAR = 2,
  PERCENTAGE = 3,
}

export enum RatePropertySettingEnum {
  NOT_SET = 0,
  // Static setting indicates single RateGroup
  STATIC = 1,
  // Dynamic setting indicates LOW, MID, HIGH, PRIME RateGroups
  DYNAMIC = 2,
}

export enum RateAvailabilityIdEnum {
  NOT_SET = 0,
  MONTHS_12 = 1,
  MONTHS_15 = 2,
  MONTHS_18 = 3,
  UNRESTRICTED = 4,
  MONTHS_6 = 5,
}

export type RateGroups = typeof RATES_SETTINGS.RATE_GROUPS;
export type AvailabilityWindow = typeof RATES_SETTINGS.AVAILABILITY_WINDOW;

export interface RateGroup {
  ID: number;
  NAME: string;
  RATE_GROUP_TYPE_ID: RateGroupTypesIdEnum;
  PROPERTY_ID: number;
  BASE_RATE: string;
  MIN_NIGHTS: number;
}

export interface RateSchedule {
  /** The id of this specific rate schedule, set to 0 for a new rate schedule to be saved on the backend */
  ID: number;
  NAME: string;
  /** The actual setting id. 1-4 for low,mid,high,prime and 7 for manual */
  RATE_GROUP_TYPE_ID: RateGroupTypesIdEnum;
  BASE_RATE: string;
  DATE_ADDED: string;
  MIN_NIGHTS: number;
  IS_WEEKEND_PREMIUM_ENABLED: boolean;
  IS_DISCOUNT_GROUP_ENABLED: boolean;
  /** 0 for disabled, otherwise the date range gets its base rate automatically updated each month at the pricing level set */
  RATE_INSIGHTS_LEVEL_ID: 0 | RateInsightLevelIdEnum;
  /** Users can overwrite the property setting for optimized pricing by modifying an individual rate schedule */
  IS_OPTIMIZED_PRICING_ENABLED: boolean;
}

export interface ServerRateSchedule extends RateSchedule {
  START: string;
  END: string;
}

export interface Rate {
  ID: number;
  NIGHTS: number;
  RATE: string;
}

export enum RateGroupTypesIdEnum {
  LOW = 1,
  MID = 2,
  HIGH = 3,
  PRIME = 4,
  MANUAL = 7,
}

export interface Season {
  COMMENT: string;
  ID: number;
  NAME: string;
  RATES: Rate[];
  END: string;
  START: string;
}

export enum SeasonType {
  newSeason = 'newSeason',
  alluraSeason = 'alluraSeason',
}

export type SparseRate = typeof sparseRate;

export interface SparseSeason extends Omit<typeof sparseSeason, 'RATES'> {
  RATES: SparseRate[];
}

export interface Suitability {
  ID: number;
  IS_SUITABLE: boolean;
  NAME: string;
  DESCRIPTION: string;
}

export enum SurchargeId {
  SMOKING = 1,
  PETS,
  LONG_TERM_RENTALS,
  PARTIES_AND_EVENTS,
  TRAVEL_RESELLERS,
  WHEELCHAIR_ACCESSIBLE,
}
export interface Surcharge {
  NAME: string;
  ID: SurchargeId;
  VALUE: number;
}

// TODO: add to property object constant
export enum BookingGateWayModeIdEnum {
  closed = 1,
  open = 2,
}

export enum PropertyFeesIdEnum {
  Cleaning = 1,
  Pets = 2,
}

export interface EmergencyContact {
  ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  COMPANY_NAME: string;
  IS_COMPANY: boolean;
  EMAIL: string;
  PHONE: string;
  DESCRIPTION: string;
  TYPE: string;
}

export type EmergencyContacts = typeof initialPropertyState.EMERGENCY_CONTACTS;

export type ITNInformation = typeof ITN_INFORMATION;

export enum PropertyDefaultContentTypes {
  TITLE = 'title',
  SEARCHSUMMARY = 'searchsummary',
  DESCRIPTION = 'description',
}

// Rate Schedule generation mode
export enum GenerateRateMode {
  DEFAULT = '',
  BLANK = 'blank/',
  // Generate from pre-existing rates (legacy property only)
  MANUAL = 'manual/',
}

export interface TransactionsOrReservationsServerSearchTool {
  sort: SearchFiltersFilterByItemValue;
  source: SearchFilterSourceItemValue;
  status: SearchFiltersStatusEnum;
  startDate: string;
  endDate: string;
}

// Acceptable 'name' values for the /property/instructions endpoint
export enum PropertyInstructionsEnum {
  aboutTheBuilding = 'about_the_building',
  checkIn = 'check_in',
  checkOut = 'check_out',
  toFromLifts = 'to_from_lifts',
  emergencyContacts = 'emergency_contacts',
  frontDesk = 'front_desk',
  garbageAndRecycling = 'garbage_recycling',
  gettingAround = 'getting_around',
  heating = 'heating',
  housekeeping = 'housekeeping',
  lateCheckIn = 'late_check_in',
  linensAndTowels = 'linens_and_towels',
  location = 'location',
  other = 'other',
  parking = 'parking',
  welcome = 'welcome',
  restaurants = 'restaurants',
  services = 'services',
  skiInSkiOut = 'ski_in_ski_out',
  whatToBring = 'what_to_bring',
  gettingToUnit = 'getting_to_unit',
}

export enum RateInsightLevelIdEnum {
  low = 1,
  lowMid,
  mid,
  midHigh,
  high,
}

export enum PricingStrategyEnum {
  rateGroup = 1,
  smartPricing = 2,
}

export interface NoRatesDate {
  START_MONTH: number;
  END_MONTH: number;
  START_DAY: number;
  END_DAY: number;
  ID: number;
}

export enum GuidebookWizardFormNamesEnum {
  amenities = 'AmenitiesSubform',
  checkIn = 'CheckinSubform',
  commonQuestions = 'CommonQuestionsSubform',
  departure = 'DepartureSubform',
  directions = 'DirectionsSubform',
  frontDesk = 'FrontDeskSubform',
  houseKeeping = 'HousekeepingSubform',
  introduction = 'Introduction',
  gettingAround = 'GettingAroundSubform',
  uniqueCodes = 'UniqueCodesSubform',
  welcomeMessage = 'WelcomeMessageSubform',
}

export interface GuidebookWalkthrough {
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
  ];
  COMPLETION_PERCENTAGE: number;
  COMPLETED_STEPS: GuidebookWizardFormNamesEnum[];
  NUM_STEPS: number;
}

/** Setup Questions form which platforms are you listed on */
export enum PlatformListedId {
  airbnb = 1,
  vrbo = 2,
  my_site = 3,
  other = 4,
}
