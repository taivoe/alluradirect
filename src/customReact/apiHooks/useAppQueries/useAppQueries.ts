import { UseQueryOptions, useQueries } from '@tanstack/react-query';

import { useQueryContext } from '../../context/queryContext/queryContext';

// TODO: better typing for this file
interface QueryObject {
  queryKey: string | string[];
  endpoint: string;

  enabled?: boolean;
  select?: (data: any) => any;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  onSettled?: (data: any | undefined, err: any) => void;
  retry?: boolean | number | ((failureCount: number, error: Error) => boolean) | undefined;
  staleTime?: number | undefined;
  cacheTime?: number | undefined;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number | false;

  hasToastsEnabled?: boolean;
}

interface Args {
  queries: QueryObject[];
}

export const useAppQueries = ({ queries }: Args) => {
  const { isOffline, onSuccessToast, onErrorToast, queryFn } = useQueryContext();

  const mappedQueries: UseQueryOptions<unknown, Error, unknown, readonly unknown[]>[] = queries.map(query => {
    return {
      ...query,
      queryFn: () => {
        return queryFn<any>(query.endpoint, {
          isOffline,
        });
      },
      onSuccess: (data: any) => {
        query.onSuccess && query.onSuccess(data);
        if (query.hasToastsEnabled) {
          onSuccessToast(data);
        }
      },
      onError: (err: any) => {
        query.onError && query.onError(err);
      },
      onSettled: (data: any, error: any) => {
        query.onSettled && query.onSettled(data, error);
        if (query.hasToastsEnabled) {
          onErrorToast(data);
        }
      },
      queryKey: query.queryKey as readonly unknown[],
    } as UseQueryOptions<unknown, Error, unknown, readonly unknown[]>;
  });

  return useQueries({ queries: mappedQueries });
};
