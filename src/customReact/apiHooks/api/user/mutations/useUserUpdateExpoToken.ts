import { userExpoTokenEndpoint } from '../../../../../api/user/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

interface SendValues {
  id: number;
  token: string;
  is_enabled: boolean;
}

/** Update existing user <-> token link, enable or disable */
export const useUserUpdateExpoToken = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<SendValues>({
    method: 'PUT',
    url: userExpoTokenEndpoint,
    ...args,
  });
};
