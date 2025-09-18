import { GuestPaymentInformation } from '../../../../../api/guest/types';
import { generateGuestBookingPaymentDueEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

const select = (data: any) => data.DATA;

export const guestPaymentDueQueryKey = queryKeyFactory('BOOKING_PAYMENT');

export const useGuestPaymentDueQuery = ({
  bookingId,
  guestId,
  isEnabled = true,
}: {
  bookingId: number;
  guestId: number;
  isEnabled: boolean;
}) => {
  const url = generateGuestBookingPaymentDueEndpoint(bookingId, guestId);
  const queryKey = guestPaymentDueQueryKey.detail(url);

  return useAppQuery<GuestPaymentInformation>({
    endpoint: url,
    queryKey,
    select,
    enabled: isEnabled,
  });
};
