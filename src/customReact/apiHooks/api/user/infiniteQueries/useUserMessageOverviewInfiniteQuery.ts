import { UserMessageOverview, UserRoleIDEnum } from '../../../../../api/user/types';

import { APIKeyResponse } from '../../../../../api/types';
import { generateUserMessageOverviewEndpoint } from '../../../../../api/user/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  id: number;
  userTypeId: UserRoleIDEnum;

  /** Optional: filter by a specific property id */
  propertyId?: number;

  enabled?: boolean;
  refetchInterval?: number;
}

export const userMessageOverviewQueryKeys = queryKeyFactory('USER_MESSAGE_OVERVIEW');
const amountPerPage = 15;
const initialPageParam = 1;

export const useUserMessageOverviewInfiniteQuery = ({
  id,
  userTypeId,
  propertyId = undefined,
  refetchInterval = undefined,
  enabled = true,
}: Args) => {
  function urlFunction(pageNumber: number) {
    return generateUserMessageOverviewEndpoint({
      id,
      amountPerPage,
      page: pageNumber,
      userTypeId,
      propertyId,
    });
  }

  const queryKey = userMessageOverviewQueryKeys.detail(`${id}${userTypeId}${propertyId}`);

  return useAppInfiniteQuery<APIKeyResponse<UserMessageOverview[], 'MESSAGES'>>({
    queryKey,
    amountPerPage,
    initialPageParam,
    nextPageKey: 'MESSAGES',
    urlFn: urlFunction,
    refetchInterval,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.MESSAGES.length === amountPerPage ? pages.length + 1 : undefined;
    },
  });
};
