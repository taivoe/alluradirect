import { NotificationEndpointFilterCategory, NotificationEndpointFilterStatus } from '../types';

import { BookingStatusId } from '../booking/types';
import { OwnerFinancesSort } from './types';

export const ownerContactAlluraEndpoint = `/RESTAUTH/owner/contact/allura/`;
export const ownerCredentialsEndpoint = `/RESTAUTH/owner/credentials/`;
export const ownerLoginEndpoint = '/RESTAUTH/owner/login/';
export const ownerLogoutEndpoint = `/RESTAUTH/owner/logout/`;
export const ownerMobileWalkthroughEndpoint = `/RESTAUTH/owner/walkthrough/mobile/complete/`;
export const ownerPutEndpoint = `/RESTAUTH/owner/`;
export const ownerReferalEndpoint = '/RESTAUTH/owner/referral/';
export const requestPropertyDeactivationEndPoint = `/RESTAUTH/owner/property/requestdeactivation/`;
export const ownerPropertyLoginEndpoint = '/RESTAUTH/owner/property/login/';
export const ownerPropertyCreateEndpoint = '/RESTAUTH/owner/property/create/';

export const generateOwnerGuestsEndpoint = (ownerId: number) => `/RESTAUTH/owner/guests/?id=${ownerId}`;
export const generateOwnerMobileWalkthroughEndpoint = (id: number) => `/RESTAUTH/owner/walkthrough/mobile/?id=${id}`;
export const generatePriorityBookingsEndpoint = (ownerId: number) => `/RESTAUTH/owner/prioritybookings/?id=${ownerId}`;
export const membershipRenewalInfo = (propertyId: number, ownerId: number) => {
  return `/RESTAUTH/owner/property/renewalinfo/?id=${ownerId}&property_id=${propertyId}`;
};
export const renewalTransaction = (propertyId: number, ownerId: number) =>
  `/RESTAUTH/owner/property/renewaltransaction/?property_id=${propertyId}&id=${ownerId}`;

export const generateOwnerNotificationsEndPoint = ({
  amountPerPage,
  page,
  category,
  ownerId,
  status,
  propertyId = undefined,
}: {
  amountPerPage: number;
  page: number;
  ownerId: number;
  category: NotificationEndpointFilterCategory;
  status: NotificationEndpointFilterStatus;
  propertyId?: number;
}) => {
  const propertyIdParam = propertyId ? `&property_id=${propertyId}` : '';
  const statusParam = status ? `&status=${status}` : '';
  return `/RESTAUTH/owner/notifications/?id=${ownerId}&amount_per_page=${amountPerPage}&page=${page}&category=${category}${statusParam}${propertyIdParam}`;
};

export const ownerDismissNotificationsEndpoint = '/RESTAUTH/owner/notifications/dismiss/';

export const generateOwnerPropertiesEndPoint = (ownerId: number) => `/RESTAUTH/owner/properties/?id=${ownerId}`;

// Pass in an empty array to retreive all bookings
// Pass in an array of selected property_ids to retreive a specific property or multiple properties
// 30/08/2021 - We currently do not have any UI that fetches multiple properties at once. This is a feature that will be developed in the future
export const generateOwnerBookingsEndpoint = ({
  page = 1,
  ownerId,
  status_id = undefined,
  amountPerPage = 10,
  direction = 'future',
  propertyIds = [],
}: {
  page: number;
  ownerId: number;
  direction?: 'future' | 'past' | 'all';
  amountPerPage?: number;
  propertyIds: number[];
  status_id?: BookingStatusId | undefined;
}) => {
  const status_id_string = status_id ? `&status_id=${status_id}` : '';
  return `/RESTAUTH/owner/bookings/?page_direction=${direction}&property_ids=${propertyIds.join()}${status_id_string}&amount_per_page=${amountPerPage}&page=${page}&id=${ownerId}`;
};

export interface FinancesArgs {
  ownerId: number;
  year: number;
  fromMonth: number;
  toMonth: number;
  sortOrder: OwnerFinancesSort;
  propertyId?: number;
}

export const generateOwnerFinancesSummaryEndpoint = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId = undefined,
}: FinancesArgs): string => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/finances/summary/?id=${ownerId}&year=${year}&from_month=${fromMonth}&to_month=${toMonth}&sort_order=${sortOrder}${pid}`;
};

export interface TransactionsArgs extends FinancesArgs {
  filter: 'completed' | 'upcoming';
}

export const generateOwnerFinancesTransactionsEndpoint = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId,
  filter,
}: TransactionsArgs) => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/finances/transactions/?id=${ownerId}&year=${year}&from_month=${fromMonth}&to_month=${toMonth}&sort_order=${sortOrder}&filter=${filter}${pid}`;
};

export const generateOwnerFinancesReservationsEndpoint = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId,
}: FinancesArgs) => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/finances/reservations/?id=${ownerId}&year=${year}&from_month=${fromMonth}&to_month=${toMonth}&sort_order=${sortOrder}${pid}`;
};

export const generateOwnerFinancesReservationsCsvEndpoint = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId,
}: FinancesArgs): string => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/finances/reservations/csv/?id=${ownerId}&year=${year}&from_month=${fromMonth}&to_month=${toMonth}&sort_order=${sortOrder}${pid}`;
};

// TODO: add transactions csv endpoint

export const generateOwnerFinancesTransactionsCsvEndpoint = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId,
}: FinancesArgs): string => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/finances/transactions/csv/?id=${ownerId}&year=${year}&from_month=${fromMonth}&to_month=${toMonth}&sort_order=${sortOrder}${pid}`;
};

interface OwnerUnbookableProps {
  ownerId: number;
  propertyId?: number;
  numMonths: number;
}

/** Despite what the name might suggest, this endpoint returns all external events from synced iCals */
export const generateOwnerExternalBookingsEndpoint = ({
  ownerId,
  propertyId,
  numMonths,
}: OwnerUnbookableProps): string => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/externalbookings/?id=${ownerId}&num_months=${numMonths}${pid}`;
};

export const generateOwnerUnbookableDates = ({ ownerId, numMonths, propertyId }: OwnerUnbookableProps): string => {
  const pid = propertyId === undefined ? '' : `&property_id=${propertyId}`;
  return `/RESTAUTH/owner/unbookabledates/?id=${ownerId}&num_months=${numMonths}${pid}`;
};
