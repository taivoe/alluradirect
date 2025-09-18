import { NotificationEndpointFilterCategory, NotificationEndpointFilterStatus } from '../../../../../api/types';

import { generateGuestNotificationsEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  guestId: number;
  category: NotificationEndpointFilterCategory;
  status: NotificationEndpointFilterStatus;

  refetchInterval?: number;
  enabled?: boolean;
}

export const useGuestNotificationsQueryKeys = queryKeyFactory('GUEST_NOTIFICATIONS');
const AMOUNT_PER_PAGE = 25;
const INITIAL_PAGE = 1;

export const useGuestNotificationsInfiniteQuery = ({
  guestId,
  category,
  status,
  enabled = true,
  refetchInterval,
}: Args) => {
  function urlFunction(pageNumber: number) {
    return generateGuestNotificationsEndpoint({
      page: pageNumber,
      amountPerPage: AMOUNT_PER_PAGE,
      category,
      guestId,
      status,
    });
  }

  return useAppInfiniteQuery({
    queryKey: useGuestNotificationsQueryKeys.list(`${guestId}${category}${status}`),
    urlFn: urlFunction,
    amountPerPage: AMOUNT_PER_PAGE,
    initialPageParam: INITIAL_PAGE,
    nextPageKey: 'NOTIFICATIONS',
    enabled,
    refetchInterval,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.NOTIFICATIONS.length === AMOUNT_PER_PAGE ? pages.length + 1 : undefined;
    },
  });
};
