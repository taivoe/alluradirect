import { NotificationEndpointFilterCategory, NotificationEndpointFilterStatus } from '../../../../../api/types';

import { generateOwnerNotificationsEndPoint } from '../../../../../api/owner/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  ownerId: number;
  category: NotificationEndpointFilterCategory;
  status: NotificationEndpointFilterStatus;
  propertyId?: number;

  refetchInterval?: number;
  enabled?: boolean;
}

export const useOwnerNotificationsQueryKeys = queryKeyFactory('OWNER_NOTIFICATIONS');
const AMOUNT_PER_PAGE = 25;
const INITIAL_PAGE = 1;

export const useOwnerNotificationsInfiniteQuery = ({
  ownerId,
  category,
  status,
  enabled = true,
  refetchInterval,
  propertyId = undefined,
}: Args) => {
  function urlFunction(pageNumber: number) {
    return generateOwnerNotificationsEndPoint({
      page: pageNumber,
      amountPerPage: AMOUNT_PER_PAGE,
      category,
      ownerId,
      status,
      propertyId,
    });
  }

  const queryKey = useOwnerNotificationsQueryKeys.list(`${ownerId}${category}${status}${propertyId}`);

  return useAppInfiniteQuery({
    queryKey,
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
