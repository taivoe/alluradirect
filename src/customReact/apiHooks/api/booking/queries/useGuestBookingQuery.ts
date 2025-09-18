import { FullBooking } from '../../../../../api/booking/types';
import { generateGuestBookingEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  bookingId: number;
  guestId: number;
  includeTimeline?: boolean;
  isEnabled?: boolean;
  onSuccess?: (booking: FullBooking) => void;

  ownerOffer?: { code: string; id: string; };
  alluraOffer?: { code: string; id: string; };
  alluraGiftCertificate?: { code: string; id: string; };
  ownerGiftCertificate?: { code: string; id: string; };
}

const select = (data: any) => data.DATA.BOOKING;

export const guestBookingQueryKey = queryKeyFactory('GUEST_BOOKING');
/** TODO - Remove the Reservation timeline from this query. It needs to be it's own endpoint.
 * It has caused too many issues since the query key is dependent on the URL.
 * We should also examine the idea of using the URL as the method to generate the query key.
 * In the case of a reservation, it is very straight forward in that I have a reservation ID that needs to
 * be used to generate the query key. The reservation ID can handle every use case for this query key as we already know
 * the query key is a GUEST_BOOKING, so we do not  need to include the guestId.
 */
export const useGuestBookingQuery = ({
  bookingId = 0,
  guestId = 0,
  includeTimeline = false,
  isEnabled = true,
  onSuccess = () => null,
  alluraOffer,
  ownerOffer,
  alluraGiftCertificate,
  ownerGiftCertificate,
}: Args) => {
  // const endpoint = generateGuestBookingEndpoint(bookingId, guestId, includeTimeline, ownerOffer, alluraOffer);
  const endpoint = generateGuestBookingEndpoint(bookingId, guestId, includeTimeline, ownerOffer, alluraOffer, alluraGiftCertificate, ownerGiftCertificate);
  const queryKey = guestBookingQueryKey.detail(endpoint);

  return useAppQuery<FullBooking>({ endpoint, queryKey, select, enabled: isEnabled, onSuccess });
};
