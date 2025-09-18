import { BookingStatusId, SparseBooking } from '../../../../../api/booking/types';
import { generateGuestBookingsEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

const select = (item: any) => item.DATA.BOOKINGS;

interface Args {
  direction?: 'future' | 'past' | 'all';
  statusId?: BookingStatusId;
  enabled?: boolean;
  guestId: number;
}
/** For use in the useGuestBookingsQuery hook (not the infinite query) */
export const guestBookingsQueryKeys = queryKeyFactory('GUEST_BOOKINGS');

export const useGuestBookingsQuery = ({
  direction = 'future',
  statusId = undefined,
  enabled = true,
  guestId,
}: Args) => {
  const endpoint = generateGuestBookingsEndpoint({ guestId, direction, statusIdFilter: statusId });
  const queryKey = guestBookingsQueryKeys.detail(endpoint);
  return useAppQuery<SparseBooking[]>({ endpoint, queryKey, select, enabled });
};
