import { APIKeyResponse, InfiniteQueryPageDirections } from '../../../../../api/types';
import { UserMessageSubject, UserRoleIDEnum } from '../../../../../api/user/types';

import { generateUserMessageSubjectsEndpoint } from '../../../../../api/user/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  // user id
  id: number;
  userTypeId: UserRoleIDEnum;
  subjectType: 'past_bookings' | 'future_bookings' | 'inquiries';

  filterUserId?: number;
  filterUserTypeId?: UserRoleIDEnum;
  searchFilter?: string;
  pageDirection?: InfiniteQueryPageDirections;

  enabled?: boolean;
}

const SUBJECTS = 'SUBJECTS';
export const userMessageSubjectsQueryKeys = queryKeyFactory(`USER_MESSAGE_${SUBJECTS}`);
const amountPerPage = 15;
const initialPageParam = 1;

export const useUserMessageSubjectsInfiniteQuery = ({
  id,
  userTypeId,
  subjectType,
  searchFilter = undefined,
  filterUserId = undefined,
  filterUserTypeId = undefined,
  pageDirection = 'future',
  enabled = true,
}: Args) => {
  function urlFunction(pageNumber: number) {
    return generateUserMessageSubjectsEndpoint({
      id,
      userTypeId,
      subjectType,
      searchFilter,
      filterUserId,
      filterUserTypeId,
      page: pageNumber,
      page_direction: pageDirection,
      amountPerPage,
    });
  }

  const queryKey = userMessageSubjectsQueryKeys.detail(
    `${id}${userTypeId}${subjectType}${searchFilter}${filterUserId}${filterUserTypeId}${pageDirection}`,
  );

  return useAppInfiniteQuery<APIKeyResponse<UserMessageSubject[], 'SUBJECTS'>>({
    queryKey,
    amountPerPage,
    initialPageParam,
    urlFn: urlFunction,
    nextPageKey: SUBJECTS,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.SUBJECTS.length === amountPerPage ? pages.length + 1 : undefined;
    },
  });
};
