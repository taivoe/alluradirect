import { userExpoTokenEndpoint } from '../../../../../api/user/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

interface SendValues {
  id: number;
  token: string;
}

/** Create a new user <-> token link in db */
export const useUserCreateExpoToken = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<SendValues>({
    method: 'POST',
    url: userExpoTokenEndpoint,
    ...args,
  });
};
