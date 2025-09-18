import {
  FINANCES_SUMMARY,
  OWNER_BLOCKED_DATE,
  OWNER_EXTERNAL_EVENTS,
  OWNER_FINANCES_RESERVATIONS,
  OWNER_FINANCES_RESERVATIONS_TRANSACTION,
  OWNER_FINANCES_SUMMARY,
  OWNER_FINANCES_TRANSACTION,
  OWNER_FINANCES_TRANSACTIONS,
  OWNER_MEMBERSHIP_RENEWAL_INFO,
  OWNER_MINIMAL_PROPERTY,
  OWNER_MIN_NIGHT_GAP,
  OWNER_MOBILE_WALKTHROUGH,
  OWNER_PROPERTY,
  OWNER_UNBOOKABLE_DATES,
} from './constants';

// Full server types
export type OwnerFinancesSummary = typeof OWNER_FINANCES_SUMMARY;
export type OwnerFinancesTransactions = typeof OWNER_FINANCES_TRANSACTIONS;
export type OwnerFinancesReservations = typeof OWNER_FINANCES_RESERVATIONS;
/** From /owner/externalbookings */
export type OwnerExternalEvents = typeof OWNER_EXTERNAL_EVENTS;
/** From /owner/unbookabledates */
export type OwnerUnbookableDates = typeof OWNER_UNBOOKABLE_DATES;
export type OwnerMobileWalkthrough = typeof OWNER_MOBILE_WALKTHROUGH;

// TODO: this should be a subset of the fields of the Property type
export type OwnerProperty = typeof OWNER_PROPERTY;

export type OwnerMembershipRenewalInfo = typeof OWNER_MEMBERSHIP_RENEWAL_INFO;

// Partial types
export type FinancesSummary = typeof FINANCES_SUMMARY;
export type OwnerFinancesTransaction = typeof OWNER_FINANCES_TRANSACTION;
export type OwnerFinancesReservationsTransaction = typeof OWNER_FINANCES_RESERVATIONS_TRANSACTION;
export type OwnerMinimalProperty = typeof OWNER_MINIMAL_PROPERTY;
export type OwnerBlockedDate = typeof OWNER_BLOCKED_DATE;
export type OwnerMinNightGap = typeof OWNER_MIN_NIGHT_GAP;

interface TaxItem {
  NAME: string;
  RATE: string;
  AMOUNT: string;
}
export interface RenewalFeesItem {
  TAX_TOTAL: string;
  RENEWAL_FEE: string;
  TOTAL: string;
  OWNER_CREDIT: string;
  SUBTOTAL_LESS_OWNER_CREDIT: string;
  TAXES: TaxItem[];
}

export interface RenewalTypeItem {
  TITLE: string;
  TYPE: string;
  PAYMENTS?: {
    DATE: string;
    AMOUNT: string;
  }[];
}
// An owner can have a list of all guests that have stayed at their property.
// This is used in the Guest Select Tool in the Mobike App
export interface OwnerGuest {
  EMAIL: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  ID: number;
}

export type OwnerFinancesSort = 'arrival_date' | 'transaction_date';

export enum MobileWalkThroughNameEnum {
  /** The user has viewed the download link */
  download = 'DownloadApp',
  /** The user has viewed the mobile app introduction app */
  introduction = 'Introduction',
  /** The user has installed the mobile app and entered the confirmation code */
  installation = 'InstallationConfirmation',
}
