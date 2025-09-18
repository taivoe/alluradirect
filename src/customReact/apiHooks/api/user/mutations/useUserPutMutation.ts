import { useQueryClient } from '@tanstack/react-query';
import { APIResponse } from '../../../../../api/types';
import { userPutEndpoint } from '../../../../../api/user/endpoints';
import { User } from '../../../../../api/user/types';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';
import { userQueryKey } from '../queries/useUserQuery';

/** FIRST_NAME, LAST_NAME are empty strings when IS_COMPANY is true
 * COMPANY is empty string when IS_COMPANY is false
 */
interface SendData
  extends Pick<
    User,
    'ID' | 'EMAIL' | 'PHONE' | 'FIRST_NAME' | 'LAST_NAME' | 'COMPANY_NAME' | 'IS_COMPANY' | 'DATE_OF_BIRTH'
  > {
  // address fields
  CITY: string;
  COUNTRY: string;
  POSTAL: string;
  REGION: string;
  STREET_NUMBER: string;
  STREET_NAME: string;
  /** empty string for no unit number */
  UNIT: string;
}

export const useUserPutMutation = (args: ConfigurableAppMutationArgs = {}) => {
  const queryClient = useQueryClient();
  return useAppMutation<SendData, APIResponse<{ USER: User }>>({
    method: 'PUT',
    url: userPutEndpoint,
    ...args,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
    },
  });
};
