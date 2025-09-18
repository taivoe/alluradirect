import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useQueryContext } from '../../context/queryContext/queryContext';
import { useEffect } from 'react';

interface Args<T> {
  endpoint: string;

  queryKey?: string | string[];
  enabled?: boolean;
  select?: (data: any) => T;

  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
  onSettled?: (data: T | undefined, err: any) => void;

  retry?: boolean | number | ((failureCount: number, error: Error) => boolean) | undefined;
  staleTime?: number | undefined;
  cacheTime?: number | undefined;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number | false;

  useErrorBoundary?: boolean;
  hasToastsEnabled?: boolean;
}
/** Include this type as an argument with your custom query hook to gain access to the defined useQuery methods listed as args in useAppQuery
 * These methods include onSuccess, onError, onSettled, retry, staleTime, cacheTime, etc.
 */
export type ConfigurableAppQueryArgs<T = any> = Omit<Args<T>, 'endpoint' | 'queryKey'>;

/* Use this instead of useQuery while inside the mobile application 
   Automatically configures fetch-related functionality
*/
export function useAppQuery<TData = any>({
  endpoint,
  enabled = true,
  select = undefined,
  onSuccess = (_data: TData) => undefined,
  onError = _err => undefined,
  onSettled = (_data: TData | undefined, _error: any) => undefined,
  staleTime = undefined,
  cacheTime = undefined,
  retry = 3,
  refetchOnWindowFocus = undefined,
  queryKey = undefined,
  refetchInterval = false,
  hasToastsEnabled = true,
  useErrorBoundary = false,
}: Args<TData>) {
  const { isOffline, onSuccessToast, onErrorToast, queryFn } = useQueryContext();

  const query = useQuery({
    queryFn: () => {
      return queryFn<TData>(endpoint, {
        isOffline,
      });
    },
    enabled: enabled,
    select,
    queryKey: [queryKey],
    staleTime,
    gcTime: cacheTime,
    retry,
    refetchOnWindowFocus,
    refetchInterval,
    throwOnError: useErrorBoundary,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.data && !query.isLoading) {
      onSuccess(query.data);
      if (hasToastsEnabled) {
        onSuccessToast(query.data);
      }
    }
  }, [query.data, query.isLoading, onSuccess, hasToastsEnabled, onSuccessToast]);

  useEffect(() => {
    if (query.error) {
      onError(query.error);
      if (hasToastsEnabled) {
        onErrorToast(query.error);
      }
    }
  }, [query.error, onError, hasToastsEnabled, onErrorToast]);

  useEffect(() => {
    if (!query.isLoading) {
      onSettled(query.data, query.error);
      if (hasToastsEnabled && query.error) {
        onErrorToast(query.data);
      }
    }
  }, [query.isLoading, query.data, query.error, onSettled, hasToastsEnabled, onErrorToast]);

  return query;
}
