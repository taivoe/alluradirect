import { FetchMethodTypes, FetchMethods } from '../../apiHooks/types';

import React from 'react';

export interface QueryFnOptions {
  isOffline: boolean;

  method?: FetchMethods | FetchMethodTypes;
  values?: any;

  /** Special encoding required for subforms */
  isSubform?: boolean;
  /** Ignore any potential data-transformations, data is already formatted */
  isCustomSendData?: boolean;
}

interface QueryContextValues {
  isOffline: boolean;
  queryFn: <TData = unknown>(url: string, options: QueryFnOptions) => Promise<TData>;
  onSuccessToast: (data: any) => void;
  onErrorToast: (data: any) => void;
}

export const QueryContext = React.createContext<QueryContextValues | null>(null);

export const useQueryContext = () => {
  const context = React.useContext(QueryContext);

  if (!context) {
    throw new Error('useQueryContext must be used within a QueryContext provider');
  }

  return context;
};

interface Props {
  children: React.ReactNode;
}

/** This Provider should be wrapped at a high-level around an app that uses it.
 * Allows access to useAppMutation and useAppQuery
 * Allows us to avoid re-writing hooks using two different version of useAppQuery and useAppMutation
 * Provides runtime configuration changes which determine offline functionality, how toasts are display and the query function that is used
 * */
export const QueryContextProvider = ({
  children,
  isOffline,
  onErrorToast,
  onSuccessToast,
  queryFn,
}: Props & QueryContextValues) => {
  // Since these are functions they will cause re-renders on each app re-render
  // https://dmitripavlutin.com/dont-overuse-react-usecallback/

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoErrorToast = React.useCallback(onErrorToast, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoSuccessToast = React.useCallback(onSuccessToast, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoQueryFn = React.useCallback(queryFn, []);

  const value = React.useMemo(
    () => ({ isOffline, onErrorToast: memoErrorToast, onSuccessToast: memoSuccessToast, queryFn: memoQueryFn }),
    [isOffline, memoQueryFn, memoErrorToast, memoSuccessToast],
  );

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};
