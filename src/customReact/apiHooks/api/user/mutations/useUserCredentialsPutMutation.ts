import { APIResponse } from '../../../../../api/types';
import { userCredentialsEndpoint } from '../../../../../api/user/endpoints';
import { User } from '../../../../../api/user/types';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

interface SendValue {
  id: number;
  email: string;
  password: string;
}

export const useUserCredentialsPutMutation = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<SendValue, APIResponse<User>>({
    method: 'PUT',
    url: userCredentialsEndpoint,
    ...args,
  });
};
