export const bookingEndpoint = '/RESTAUTH/booking/';

export const bookingQuoteEndpoint = '/RESTAUTH/booking/quote/';
export const bookingNotesEndpoint = '/RESTAUTH/booking/notes/';
export const reviewPublishEndPoint = '/RESTAUTH/booking/review/publish/';
export const reviewDisputeEndpoint = '/RESTAUTH/booking/review/dispute/';
export const reviewResponseEndpoint = '/RESTAUTH/booking/review/response/';
export const bookingEmailEndpoint = `/RESTAUTH/booking/email/`;
export const bookingcustomMessageEndpoint = '/RESTAUTH/booking/custommessage/';

export const generateBookingEmailEndpoint = (
  reservationId: number,
  emailTemplate: 'details' | 'checkin',
  cc_emails = '',
) => {
  return `${bookingEmailEndpoint}?id=${reservationId}&email_template=${emailTemplate}&cc_emails=${cc_emails}`;
};

export const generateBookingCancellationDetailEndpoint = (bookingId: string) =>
  `/RESTAUTH/booking/cancellationDetails/?id=${bookingId}`;

export const generateQuoteEndPoint = () => `/RESTAUTH/booking/quote/`;

export const generateBookingContactTracingEndpoint = () => `/RESTAUTH/booking/contacttracing/`;

export const generateBookingNotesEndpoint = (notesParamString: any) => `/RESTAUTH/booking/notes?${notesParamString}`;

export const generateBookingPropertyGuidebook = (ownerId: number) => {
  return `/RESTAUTH/booking/propertyguidebook/?id=${ownerId}`;
};

export const generateBookingPropertyGuidebookBinaryEndpoint = ({ bookingId }: { bookingId: number }) =>
  `/RESTAUTH/booking/propertyguidebook/pdf/binary/?id=${bookingId}`;

/** @param guestEmail the email of the guest to check if a guest account with that email exists */
export const generateBookingGuestExists = (guestEmail: string) => {
  return `/RESTAUTH/booking/guest/exists/?email=${guestEmail}`;
};
