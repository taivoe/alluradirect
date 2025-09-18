import { FetchMethodTypes, FetchMethods } from '../types';

import { useMutation } from '@tanstack/react-query';
import { useQueryContext } from '../../context/queryContext/queryContext';

interface Args<TVariables = any, TData = any> {
  /** Pass in string unless you need to modify the url based on TVariables data
   * Pass in a function and an array in TVariables urlArgs field to modify the url on send
   * ex) function fun(a, b, c) => string
   *     values.urlArgs = [1, 2, 3]
   * */
  url: string | ((...args: string[]) => string);
  method: FetchMethods | FetchMethodTypes;
  isCustomSendData?: boolean;
  isSubform?: boolean;
  onSuccess?: (data: TData, variables: TVariables) => Promise<unknown> | void;
  onError?: (error: unknown, variables: TVariables, context: void | undefined) => Promise<unknown> | void;
  onSettled?: (data: any, error: unknown, variables: TVariables, context: void | undefined) => Promise<unknown> | void;
  onMutate?: (value: any) => void;
  hasToastsEnabled?: boolean;
  mutationKey?: string;
  hasSuccessToastEnabled?: boolean;
  hasErrorToastEnabled?: boolean;
  /** modify the data before its sent, useful for encapsulating logic in a custom mutation hook */
  modifySendDataFn?: (data: TVariables) => any;
}

export type ConfigurableAppMutationArgs = Omit<Args, 'url' | 'method' | 'isCustomSendData' | 'isSubform'>;

export const useAppMutation = <TVariables = any, TData = any>({
  url,
  method,
  isCustomSendData = false,
  isSubform = false,
  onSuccess = () => undefined,
  onError = () => undefined,
  onSettled = () => undefined,
  onMutate = () => undefined,
  hasToastsEnabled = true,
  mutationKey = undefined,
  hasSuccessToastEnabled = true,
  hasErrorToastEnabled = true,
  modifySendDataFn = undefined,
}: Args<TVariables, TData>) => {
  const { isOffline, onSuccessToast, onErrorToast, queryFn } = useQueryContext();

  return useMutation({
    mutationFn: (values: TVariables) => {
      const sendData = modifySendDataFn ? modifySendDataFn(values) : values;
      const sendUrl = typeof url === 'string' ? url : url(...(values as any)?.urlArgs);

      return queryFn<TData>(sendUrl, {
        values: sendData,
        method,
        isOffline,
        isSubform,
        isCustomSendData,
      });
    },
    ...(mutationKey && { mutationKey: [mutationKey] }),
    onSuccess: (response: TData, variables: TVariables) => {
      if (hasToastsEnabled && hasSuccessToastEnabled) {
        onSuccessToast(response);
      }
      return onSuccess(response, variables);
    },
    onError: (response: Error, variables: TVariables, context: void | undefined) => {
      if (hasToastsEnabled && hasErrorToastEnabled) {
        onErrorToast(response);
      }
      return onError(response, variables, context);
    },
    onSettled: (data: TData | undefined, error: Error | null, variables: TVariables, context: void | undefined) => {
      return onSettled(data, error, variables, context);
    },
    onMutate: (variables: TVariables) => {
      onMutate(variables);
    },
  });
};
