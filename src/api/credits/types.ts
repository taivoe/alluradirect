import { CREDITS_OVERVIEW } from './constants';

export type CreditsOverview = typeof CREDITS_OVERVIEW;

export enum CreditStatusEnum {
  PENDING = 1,
  APPROVED = 2,
  CANCELLED = 3,
  SPENT = 4,
}

export enum CreditReasonGivenEnum {
  OWNER_RECOMMENDATION = 1,
  GUEST_RECOMMENDATION = 2,
  ALLURA_CREDIT = 3,
}
