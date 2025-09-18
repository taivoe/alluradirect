import { MessageThreadItem, UserRoleIDEnum } from '../../../../../api/user/types';

import { APIKeyResponse } from '../../../../../api/types';
import { generateUserMessageThreadEndpoint } from '../../../../../api/user/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';
import { ConfigurableAppInfiniteQueryArgs } from '../../../useAppInfiniteQuery/types';

interface Args {
  id: number;
  userTypeId: UserRoleIDEnum;
  contactUserId: number;
  contactUserTypeId: UserRoleIDEnum;
}

export const userMessageThreadQueryKeys = queryKeyFactory('USER_MESSAGE_THREAD');
const amountPerPage = 15;
const initialPageParam = 1;

export const useUserMessageThreadInfiniteQuery = ({
  id,
  userTypeId,
  contactUserId,
  contactUserTypeId,
  ...rest
}: Args & ConfigurableAppInfiniteQueryArgs) => {
  function urlFunction(pageNumber: number) {
    return generateUserMessageThreadEndpoint({
      id,
      amountPerPage,
      page: pageNumber,
      userTypeId,
      contactUserId,
      contactUserTypeId,
    });
  }

  return useAppInfiniteQuery<APIKeyResponse<MessageThreadItem[], 'THREAD'>>({
    queryKey: userMessageThreadQueryKeys.detail(`${contactUserId}${contactUserTypeId}${id}${userTypeId}`),
    amountPerPage,
    initialPageParam,
    nextPageKey: 'THREAD',
    urlFn: urlFunction,
    ...rest,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.THREAD.length === amountPerPage ? pages.length + 1 : undefined;
    },
  });
};
