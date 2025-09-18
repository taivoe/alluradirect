import { GuestURLPathsEnum } from './types';
/** Produces a url for use in the React Web App
 ** ex: https://staging.alluradirect.com/guest/booking/1234
 */

export const generateGuestBookingPageLink = ({ baseUrl, bookingId }: { baseUrl: string; bookingId: string | number }) =>
  `${baseUrl}/${GuestURLPathsEnum.booking}/${bookingId}`;
