import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { AppInfiniteQueryArgs } from './types';
import { flattenApiPages } from '../../../business/helpers/apiHelpers/apiHelpers';
import { useQueryContext } from '../../context/queryContext/queryContext';

export const useAppInfiniteQuery = <TReturnValues = any>(
  args: AppInfiniteQueryArgs & UseInfiniteQueryOptions<any, any, any, any, any>,
) => {
  const { isOffline, queryFn } = useQueryContext();

  const selectFn = (): any => {
    if ('defaultSelect' in args && 'nextPageKey' in args) {
      return (data: any) => {
        return flattenApiPages(data, args.nextPageKey);
      };
    } else {
      return undefined;
    }
  };

  return useInfiniteQuery({
    queryKey: args.queryKey,
    enabled: args.enabled ?? true,
    initialPageParam: args.initialPageParam,
    queryFn: ({ pageParam = args.initialPageParam }) => {
      const url = args.urlFn(pageParam);

      return queryFn<TReturnValues>(url, {
        isOffline,
      });
    },
    getNextPageParam: (lastPage: any, pages: any[]) => {
      if ('nextPageFn' in args) {
        return args.nextPageFn(lastPage, pages);
      } else if ('nextPageKey' in args) {
        if (!lastPage) return args.initialPageParam;

        const arrayData = lastPage?.DATA[args.nextPageKey];
        if (!arrayData || arrayData?.length < args.amountPerPage) return undefined;

        return args.initialPageParam + pages.length;
      } else {
        return undefined;
      }
    },
    select: selectFn(),
    refetchOnWindowFocus: args.refetchOnWindowFocus ?? true,
    staleTime: args.staleTime ?? undefined,
    gcTime: args.staleTime ?? undefined,
    throwOnError: args.useErrorBoundary ?? undefined,
    refetchInterval: args.refetchInterval,
    refetchIntervalInBackground: args.refetchIntervalInBackground,
    initialData: args.initialData,
    placeholderData: args.placeholderData,
  });
};
