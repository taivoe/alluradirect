import { NotificationEndpointFilterCategory, NotificationEndpointFilterStatus } from '../types';

import { BookingStatusId } from '../booking/types';
import { GuestBookingType } from './types';

type Offer = { code: string; id: string; };


export const guestEndpoint = '/RESTAUTH/guest/';

export const guestBookingAlertsEndpoint = `/RESTAUTH/guest/alerts/`;
export const generateGuestAlertsEndpoint = (userId: number) => {
  return `${guestBookingAlertsEndpoint}?id=${userId}`;
}

export const guestBookingEndpoint = `/RESTAUTH/guest/booking/`;

// Gift Certificates
export const generateGuestBookingEndpoint = (bookingId: number, guestId: number, includeTimeline = false, ownerOffer?: Offer, alluraOffer?: Offer, alluraGiftCertificate?: Offer, ownerGiftCertificate?: Offer) => {
  const timelineParam = includeTimeline ? `&include_timeline=${includeTimeline}` : '';
  const ownerOfferParam = ownerOffer ? `&owner_offer_code=${ownerOffer.code}&owner_offer_id=${ownerOffer.id}` : '';
  const alluraOfferParam = alluraOffer ? `&allura_offer_code=${alluraOffer.code}&allura_offer_id=${alluraOffer.id}` : '';
  const alluraGiftCertificateParam = alluraGiftCertificate ? `&allura_gift_certificate_code=${alluraGiftCertificate.code}&allura_gift_certificate_id=${alluraGiftCertificate.id}` : '';
  const ownerGiftCertificateParam = ownerGiftCertificate ? `&owner_gift_certificate_code=${ownerGiftCertificate.code}&owner_gift_certificate_id=${ownerGiftCertificate.id}` : '';
  return `${guestBookingEndpoint}?booking_id=${bookingId}&id=${guestId}${timelineParam}${ownerOfferParam}${alluraOfferParam}${alluraGiftCertificateParam}${ownerGiftCertificateParam}`;
};
// Gift Certificates

// For GETs to pull Cancel data after a POST, reason_id will be ignored
// For GETs to pull Cancel data before a POST, reason_id can change values
export const guestBookingCancelEndpoint = `/RESTAUTH/guest/booking/cancel/`;
export const generateGuestBookingCancelEndpoint = (userId: number, bookingId: number) => {
  return `${guestBookingCancelEndpoint}?id=${userId}&booking_id=${bookingId}`;
}

export const guestBookingEditEndpoint = `/RESTAUTH/guest/booking/edit/`;
export const generateGuestBookingEditEndpoint = (userId: number, bookingId: number) => {
  return `${guestBookingEditEndpoint}?id=${userId}&booking_id=${bookingId}`;
}

// export const generateGuestBookingCancelEndpoint = (userId: number, bookingId: number, reasonId: any) => {
//   if( typeof reasonId == 'number' ){
//     return `${guestBookingCancelEndpoint}?id=${userId}&booking_id=${bookingId}&reason_id=${reasonId}`;
//   } else {
//     return `${guestBookingCancelEndpoint}?id=${userId}&booking_id=${bookingId}&reason_id=`;
//   }
// }

export const guestCancellationPolicyEndpoint = '/RESTAUTH/guest/booking/cancellationpolicy/';
export const generateGuestCancellationPolicyEndpoint = (bookingId: number, guestId: number, isHTML = false) =>
  `${guestCancellationPolicyEndpoint}?booking_id=${bookingId}&id=${guestId}&is_html=${isHTML}`;

export const guestContactTracingEndpoint = `/RESTAUTH/guest/booking/contacttracing/`;
export const guestBookingDateChangeEndpoint = `RESTAUTH/guest/booking/date-change/`;

export const generateGuestMakePaymentEndpoint = ({
  bookingId,
  bookingType,
  guestId,
  /** Is the guest paying for the entire booking now or doing a deposit then a balance payment later */
  isFullPayment = 0,
}: {
  bookingId: number;
  bookingType: GuestBookingType;
  guestId: number;
  isFullPayment: 0 | 1;
}) => {
  return `/RESTAUTH/guest/booking/payment/?id=${guestId}&booking_id=${bookingId}&booking_type=${bookingType}&is_full_payment=${isFullPayment}`;
};

export const guestBookingPaymentDueEndpoint = '/RESTAUTH/guest/booking/paymentdue/';
export const generateGuestBookingPaymentDueEndpoint = (bookingId: number, guestId: number) => {
  return `${guestBookingPaymentDueEndpoint}?id=${guestId}&booking_id=${bookingId}`;
};

export const generateGuestBookingPropertyEndpoint = (bookingId: number, guestId: number) =>
  `/RESTAUTH/guest/booking/property/?booking_id=${bookingId}&id=${guestId}`;

export const guestBookingPropertyGuidebook = '/RESTAUTH/guest/booking/propertyguidebook/';
export const generateGuestPropertyGuidebookEndpoint = (bookingId: number, guestId: number) => {
  return `${guestBookingPropertyGuidebook}?id=${guestId}&booking_id=${bookingId}`;
};
/** Returns a base64 encoded pdf */
export const generateGuestPropertyGuidebookPDFEndpoint = (bookingId: number, guestId: number) =>
  `${guestBookingPropertyGuidebook}pdf/base64/?id=${guestId}&booking_id=${bookingId}`;
/** Returns a binary encoded pdf */
export const generateGuestPropertyGuidebookBinaryPDFEndpoint = ({
  guestId,
  bookingId,
}: {
  guestId: number;
  bookingId: number;
}) => `${guestBookingPropertyGuidebook}pdf/binary/?id=${guestId}&booking_id=${bookingId}`;


export const guestBookingReceiptEndpoint = '/RESTAUTH/guest/booking/receipt/';
export const generateGuestBookingReceiptEndpoint = (bookingId: number, userId: number) =>
  `${guestBookingReceiptEndpoint}?id=${userId}&booking_id=${bookingId}`;

export const guestRentalAgreementSummaryEndpoint = '/RESTAUTH/guest/booking/rentalagreement/';
export const generateGuestRentalAgreementSummaryEndpoint = (bookingId: number, guestId: number) =>
  `${guestRentalAgreementSummaryEndpoint}?id=${guestId}&booking_id=${bookingId}`;

  export const guestBookingReviewEndpoint = '/RESTAUTH/guest/booking/review/';

export const guestBookingReviewResponseEndpoint = '/RESTAUTH/guest/booking/review/response/';
export const generateGuestResponseEndPoint = (reviewId: number, guestId: number) => `${guestBookingReviewResponseEndpoint}?id=${guestId}&review_id=${reviewId}`;

export const guestBookingUnavailableDatesEndpoint = '/RESTAUTH/guest/booking/unavailability/';
export const generateGuestUnavailableDatesEndpoint = (bookingId: number, guestId: number) =>
  `${guestBookingUnavailableDatesEndpoint}?id=${guestId}&booking_id=${bookingId}`;

export const guestBookingsEndpoint = `/RESTAUTH/guest/bookings/`;
export const generateGuestBookingsEndpoint = ({
  amount = 20,
  direction = 'future',
  guestId,
  page = 1,
  statusIdFilter = undefined,
}: {
  amount?: number;
  direction?: 'future' | 'past' | 'all';
  guestId: number;
  page?: number;
  statusIdFilter?: BookingStatusId;
}) => {
  const statusFilter = statusIdFilter ? `&status_id=${statusIdFilter}` : '';
  return `${guestBookingsEndpoint}?id=${guestId}&page=${page}&amount_per_page=${amount}&page_direction=${direction}${statusFilter}`;
};

export const guestCredentialsEndpoint = '/RESTAUTH/guest/credentials/';
export const guestInquiryEndpoint = '/RESTAUTH/guest/inquiry/';

export const guestFormInputEndpoint = '/RESTAUTH/guest/formInput/';
export const generateGuestFormInputEndPoint = (guestId: number) => `${guestFormInputEndpoint}?id=${guestId}`;

export const guestOfferCodeEndpoint = '/RESTAUTH/guest/offer/code/';
export const generateGuestOfferCodeEndpoint = (userId: number | undefined, propertyId: string | undefined, arrival: string | undefined, departure: string | undefined) => {
  const id = userId === undefined ? 0 : userId;
  const pid = propertyId === undefined ? '' : propertyId;
  const arr = arrival === undefined ? '' : arrival;
  const dep = departure === undefined ? '' : departure;
  return `${guestOfferCodeEndpoint}?id=${id}&property_id=${pid}&arrival=${arr}&departure=${dep}`;
}


export const guestOffersEndpoint = '/RESTAUTH/guest/offers/';
export const generateGuestOffersEndpoint = (userId: number | undefined, propertyId: string | undefined, arrival: string | undefined, departure: string | undefined) => {
  const id = userId === undefined ? 0 : userId;
  const pid = propertyId === undefined ? '' : propertyId;
  const arr = arrival === undefined ? '' : arrival;
  const dep = departure === undefined ? '' : departure;
  return `${guestOffersEndpoint}?id=${id}&property_id=${pid}&arrival=${arr}&departure=${dep}`;
}

export const guestLoginEndpoint = '/RESTAUTH/guest/login/';
export const guestLogoutEndpoint = '/RESTAUTH/guest/logout/';

export const generateGuestNotificationsEndpoint = ({
  amountPerPage,
  page,
  guestId,
  category,
  status,
}: {
  amountPerPage: number;
  page: number;
  guestId: number;
  category: NotificationEndpointFilterCategory;
  status: NotificationEndpointFilterStatus;
}) => {
  const statusParam = status ? `&status=${status}` : '';
  return `/RESTAUTH/guest/notifications/?id=${guestId}&amount_per_page=${amountPerPage}&page=${page}&category=${category}${statusParam}`;
};
  
export const guestDismissNotificationsEndpoint = `/RESTAUTH/guest/notifications/dismiss/`;
export const guestPrivacyEndpoint = `/RESTAUTH/guest/privacy/`;
export const guestReferralEndpoint = '/RESTAUTH/guest/referral/';

export const guestReviewEndpoint = '/RESTAUTH/guest/review/';
export const generateGuestNewReviewEndpoint = (bookingId: number, reviewId: number, guestId: number) =>
  `${guestReviewEndpoint}?id=${guestId}&booking_id=${bookingId}&review_id=${reviewId}`;

export const generateGuestReviewEndpoint = (reviewId: number, guestId: number) =>
  `${guestReviewEndpoint}?id=${guestId}&review_id=${reviewId}`;


export const guestReviewsEndpoint = `/RESTAUTH/guest/reviews/`;
export const generateGuestReviewsEndpoint = (guestId: number) => `${guestReviewsEndpoint}?id=${guestId}`;

export const generateGuestEligibleReviewsEndpoint = (guestId: number) =>
`/RESTAUTH/guest/reviews/invitations/?id=${guestId}`;
  





