import { GenerateRateMode, PropertyDefaultContentTypes, RateInsightLevelIdEnum } from './types';
import {
  InfiniteQueryPageDirections,
  NotificationEndpointFilterCategory,
  NotificationEndpointFilterStatus,
} from '../types';

import { BookingStatusId } from '../booking/types';

export const additionalContactEndpoint = '/RESTAUTH/property/emergencycontact/';
export const bookingsFilteredEndPoint = '/RESTAUTH/property/bookings/filtered/';
export const bookingsPaginatedEndPoint = '/RESTAUTH/property/bookings/paginated/';
export const calendarDatesEndpoint = `/RESTAUTH/property/calendardates/`;
export const cancellationPoliciesEndpoint = '/RESTAUTH/property/cancellationpolicy/';
export const checkinEmailPreviewSendEndpoint = `/RESTAUTH/property/checkinemail/`;
export const contentEndpoint = '/RESTAUTH/property/content/';
export const directVacationLogoEndpoint = '/RESTAUTH/property/directvacationslogo/';
export const directVacationSubdomainEndpoint = '/RESTAUTH/property/directvacationssubdomain/';
export const externalUrlsEndpoint = `/RESTAUTH/property/externalurls/`;
export const formEndpoint = '/RESTAUTH/property/forminput/';
export const instructionsEndpoint = '/RESTAUTH/property/instructions/';
export const photoSortEndpoint = '/RESTAUTH/property/photo/sort/';
export const photosEndpoint = `/RESTAUTH/property/photo/`;
export const propertyAmenityEndpoint = '/RESTAUTH/property/amenity/';
export const propertyBlockoffEndpoint = `/RESTAUTH/property/blockoff/`;
export const propertyDefaultContentEndpoint = '/RESTAUTH/property/defaultcontent/';
export const propertyWalkthroughGuidebookEndpoint = `/RESTAUTH/property/walkthrough/propertyguidebook/`;
export const propertyICalEndpoint = '/RESTAUTH/property/ical/';
export const propertyNonResidentEmail = '/RESTAUTH/property/nonresidentsubscription/';
export const propertyPoliciesEndpoint = `/RESTAUTH/property/policies/`;
export const propertyRateGroupEndpoint = '/RESTAUTH/property/rategroup/';
export const propertyRatesScheduleGenerateEndpoint = '/RESTAUTH/property/rateschedule/generate/';
export const propertyTransactionsEndpoint = '/RESTAUTH/property/transactions/';
export const propertyVideosEndpoint = '/RESTAUTH/property/video/';
export const rateScheduleEndpoint = '/RESTAUTH/property/rateschedule/';
export const rentalAgreementSummaryEndpoint = '/RESTAUTH/property/rentalagreement/';
export const resendSubscriptionReceiptEndPoint = `/RESTAUTH/property/resendreceipt/`;
export const reservationRequestEndpoint = '/RESTAUTH/property/reservationrequest/';
export const reservationSettings = '/RESTAUTH/property/reservationsettings/';
export const subformEndpoint = '/RESTAUTH/property/subform/';

export const generateBookingsFilteredEndpoint = ({
  propertyId,
  startDate,
  endDate,
  status,
  sort,
  source,
}: {
  propertyId: number;
  startDate: string;
  endDate: string;
  status: any;
  sort: any;
  source: any;
}): string => {
  return `/RESTAUTH/property/bookings/filtered/?start=${startDate}&end=${endDate}&filter_by=${sort}&source=${source}&id=${propertyId}&status=${status}`;
};

export const generatePropertyGuidebookEndpoint = (propertyId: number) =>
  `/RESTAUTH/property/propertyguidebook/?id=${propertyId}`;
export const generatePropertyGuidebookPDFEndpoint = (propertyId: number) =>
  `/RESTAUTH/property/propertyguidebook/pdf/base64/?id=${propertyId}`;
export const generateLegacyCheckInHTML = (propertyId: number) =>
  `/RESTAUTH/property/checkinlegacyhtml/?id=${propertyId}`;

// this will probably obsolete once the property reservation task is complete
export const generateBookingReservationEndpoint = (bookingId: number, includeTimeline = false) => {
  const timelineParam = includeTimeline ? `&include_timeline=${includeTimeline}` : '';
  return `/RESTAUTH/property/booking/?id=${bookingId}${timelineParam}`;
};

/** Extend or Replace Rate Schedule using rate group data */
export const generateRateScheduleRateGroup = ({
  propertyId,
  num_months,
  start_date,
  is_replace = false,
}: {
  propertyId: number;
  num_months: number;
  start_date: string;
  is_replace?: boolean;
}) => {
  return `/RESTAUTH/property/rateschedule/generate/rategroup/?id=${propertyId}&num_months=${num_months}&start_date=${start_date}&is_replace=${is_replace}`;
};

/** Extend or Replace Rate Schedule using pricing insight data */
export const generateRateScheduleInsight = ({
  propertyId,
  num_months,
  /** The starting date to generate insight rates. The last date of existing date ranges or today if replacing */
  start_date,
  rate_insights_level_id,
  /** Avoid using owner edit dates and no rates dates for graphing previews */
  is_preview = false,
  is_replace = false,
}: {
  propertyId: number;
  num_months: number;
  start_date: string;
  rate_insights_level_id: RateInsightLevelIdEnum;
  is_preview?: boolean;
  is_replace?: boolean;
}) => {
  return `/RESTAUTH/property/rateschedule/generate/insight/?id=${propertyId}&rate_insights_level_id=${rate_insights_level_id}&num_months=${num_months}&start_date=${start_date}&is_preview=${is_preview}&is_replace=${is_replace}`;
};

/** generate a property rate schedule with AirDNA daily insights, using existing date ranges
 * PUT
 */
export const rateScheduleOptimizeEndpoint = '/RESTAUTH/property/rateschedule/generate/optimize/';

export const generatePropertyCodesEndpoint = (propertyId: number): string =>
  `/RESTAUTH/property/codes/?id=${propertyId}`;

export const generatePropertyRatesScheduleGenerateEndpoint = ({
  propertyId,
  mode = GenerateRateMode.DEFAULT,
}: {
  propertyId: number;
  mode: GenerateRateMode;
}) => {
  return `${propertyRatesScheduleGenerateEndpoint}${mode ? mode : ''}?id=${propertyId}`;
};

export const generatePhotosEndPoint = (propertyId: number) => `/RESTAUTH/property/photos/?id=${propertyId}`;

export const generateFormInputEndpoint = (propertyId: number) => `/RESTAUTH/property/formInput/?id=${propertyId}`;

// Todo - encapsulate some of this logic into a shared helper function for all paginated booking queries
export const generateBookingsPaginatedEndPoint = ({
  amount = 10,
  direction = 'future',
  page = 1,
  status_id = undefined,
  propertyId,
}: {
  amount: number;
  direction: 'past' | 'future' | 'all';
  propertyId: number;
  /** This value must always be greater than 0 */
  page: number;
  status_id?: BookingStatusId | undefined;
}) => {
  const status_id_string = status_id ? `&status_id=${status_id}` : '';

  return `${bookingsPaginatedEndPoint}?id=${propertyId}&page=${page}&amount_per_page=${amount}&page_direction=${direction}${status_id_string}`;
};

export const generateExternalEventsEndPoint = (propertyId: number) =>
  `/RESTAUTH/property/externalbookings/?id=${propertyId}`;

export const generateResyncICalEndPoint = (propertyId: number) => `/RESTAUTH/property/ical/resync?id=${propertyId}`;

export const generatePropertyEndPoint = (propertyId: number) => `/RESTAUTH/property/?id=${propertyId}`;

// TODO: this previously used apiUrl(), ensure it uses the base url
export const generatePropertyEndPointQuery = (propertyId: number) => `/RESTAUTH/property/?id=${propertyId}`;

export const generatePropertyNotificationsEndPoint = ({
  amountPerPage,
  status = NotificationEndpointFilterStatus.ACTIVE,
  category = NotificationEndpointFilterCategory.PRIMARY,
  propertyId,
  page = 1,
}: {
  amountPerPage: number;
  status: NotificationEndpointFilterStatus;
  category: NotificationEndpointFilterCategory;
  propertyId: number;
  page: number;
}): string => {
  return `/RESTAUTH/property/notifications/?id=${propertyId}&page=${page}&amount_per_page=${amountPerPage}&category=${category}&status=${status}`;
};

export const propertyDismissNotificationsEndpoint = '/RESTAUTH/property/notifications/dismiss/';
export const generatePropertyDismissNotificationEndpoint = (propertyId: number, notificationIds: number[] | 'all') => {
  return `/RESTAUTH/property/notifications/dismiss/?id=${propertyId}&notification_ids=${notificationIds}`;
};

export const generateReviewsEndPoint = ({
  propertyId,
  page,
  amountPerPage,
  pageDirection,
}: {
  propertyId: number;
  page: number;
  amountPerPage: number;
  pageDirection: InfiniteQueryPageDirections;
}) =>
  `/RESTAUTH/property/reviews/?id=${propertyId}&page=${page}&amount_per_page=${amountPerPage}&page_direction=${pageDirection}`;

export const generateActivationEndPoint = (propertyId: number) =>
  `/RESTAUTH/property/requestactivation/?id=${propertyId}`;

// Pass the booking ID to exclude that booking from your dates. This is for when you want to
// edit a booking
export const generateUnavailabilityEndpoint = ({
  bookingId = null,
  propertyId,
}: {
  bookingId?: number | null;
  propertyId: number;
}) => `/RESTAUTH/property/unavailability/?id=${propertyId}${bookingId ? `&booking_id=${bookingId}` : ''}`;

export const generateLastAndNextGuestEndpoint = (propertyId: number) =>
  `/RESTAUTH/property/lastandnextguest/?id=${propertyId}`;

export const generateBankDepositsEndPoint = (propertyId: number) => `/RESTAUTH/property/bankdeposits/?id=${propertyId}`;

export const generatePropertyDefaultContentEndpoint = (
  propertyId: number,
  contentType: PropertyDefaultContentTypes,
) => {
  return `${propertyDefaultContentEndpoint}?id=${propertyId}&content=${contentType}`;
};

export const generateExternalUrlsEndpoint = (propertyId: number) => {
  return `${externalUrlsEndpoint}?id=${propertyId}`;
};

export const generateCheckInEmailPreviewEndpoint = ({ propertyId }: { propertyId: number }) =>
  `/RESTAUTH/property/checkinemail/?id=${propertyId}`;

export const generateRentalAgreementSummaryEndpoint = (propertyId: number) =>
  `${rentalAgreementSummaryEndpoint}?id=${propertyId}`;

export const generateCalendarEventsEndpoint = ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: number;
  startDate: string;
  endDate: string;
}) => `/RESTAUTH/property/calendarevents/?id=${propertyId}&start=${startDate}&end=${endDate}`;

export const generateCalendarDatesEndpoint = ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: number;
  startDate: string;
  endDate: string;
}) => `/RESTAUTH/property/calendardates/?id=${propertyId}&start=${startDate}&end=${endDate}`;

export const generateReservationRequest = (propertyId: number) =>
  `/RESTAUTH/property/reservationrequest/?id=${propertyId}`;

export const generateRateSuggestionEndpoint = ({ propertyId }: { propertyId: number }): string => {
  return `/RESTAUTH/property/ratesuggestion/?id=${propertyId}`;
};

export const generatePropertyBlockoffsEndpoint = (propertyId: number): string => {
  return `/RESTAUTH/property/blockoffs/?id=${propertyId}`;
};
