import { BookingStatusId, SparseBooking } from '../../../../../api/booking/types';

import { APIKeyResponse } from '../../../../../api/types';
import { PageDirection } from '../../../useAppInfiniteQuery/types';
import { generateGuestBookingsEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  guestId: number;
  direction: PageDirection;
  amountPerPage?: number;
  statusIdFilter?: BookingStatusId;

  enabled?: boolean;
  refetchInterval?: number;
}

const initialPageParam = 1;
export const guestBookingsInfiniteQueryKeys = queryKeyFactory('GUEST_BOOKINGS_INFINITE_QUERY');

export const useGuestBookingsInfiniteQuery = ({
  guestId,
  amountPerPage = 20,
  enabled = true,
  refetchInterval,
  statusIdFilter = undefined,
  direction,
}: Args) => {
  function urlFunction(pageNumber: number) {
    return generateGuestBookingsEndpoint({
      guestId,
      direction,
      page: pageNumber,
      amount: amountPerPage,
      statusIdFilter,
    });
  }

  const queryKey = guestBookingsInfiniteQueryKeys.detail(`${guestId}${statusIdFilter}`);

  return useAppInfiniteQuery<APIKeyResponse<SparseBooking, 'BOOKINGS'>>({
    queryKey,
    urlFn: urlFunction,
    amountPerPage,
    initialPageParam,
    nextPageKey: 'BOOKINGS',
    enabled,
    refetchInterval,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.BOOKINGS.length === amountPerPage ? pages.length + 1 : undefined;
    },
  });
};
