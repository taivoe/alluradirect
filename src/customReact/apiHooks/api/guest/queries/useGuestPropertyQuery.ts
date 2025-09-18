/**  A guest has the ability to fetch a property. */

import { Property } from '../../../../../api/property/types';
import { generateGuestBookingPropertyEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

const select = (data: any) => data.DATA.PROPERTY;

export const guestPropertyQueryKey = queryKeyFactory('GUEST_PROPERTY');

export const useGuestPropertyQuery = ({
  bookingId,
  guestId,
  isEnabled = true,
}: {
  bookingId: number;
  guestId: number;
  isEnabled: boolean;
}) => {
  const endpoint = generateGuestBookingPropertyEndpoint(bookingId, guestId);
  const queryKey = guestPropertyQueryKey.detail(endpoint);
  return useAppQuery<Property>({ endpoint, queryKey, select, enabled: isEnabled });
};
