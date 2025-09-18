import { MessageThreadItem, UserRoleIDEnum } from '../../api/user/types';
import { useMemo, useState } from 'react';

import { flattenApiPages } from '../../business/helpers/apiHelpers/apiHelpers';
import { useUserMessageThreadInfiniteQuery } from '../apiHooks/api/user/infiniteQueries/useUserMessageThreadInfiniteQuery';
import { ConfigurableAppInfiniteQueryArgs } from '../apiHooks/useAppInfiniteQuery/types';

interface Args {
  userId: number;
  userTypeId: UserRoleIDEnum;
  contactUserId: number;
  contactUserTypeId: UserRoleIDEnum;
}

export const useMessageThread = ({
  userTypeId,
  userId,
  contactUserId,
  contactUserTypeId,
  ...rest
}: Args & ConfigurableAppInfiniteQueryArgs) => {
  const threadQuery = useUserMessageThreadInfiniteQuery({
    id: userId,
    userTypeId: userTypeId,
    contactUserId,
    contactUserTypeId,
    ...rest,
  });

  const threadData: MessageThreadItem[] = useMemo(() => {
    return threadQuery.data ? flattenApiPages(threadQuery.data, 'THREAD') : [];
  }, [threadQuery.data]);

  const lastThreadData = threadData && threadData.length > 0 ? threadData[0] : undefined;

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await threadQuery.refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  return {
    threadQuery,
    threadData,
    lastThreadData,
    refreshThread: refresh,
    refreshingThread: refreshing,
  };
};
