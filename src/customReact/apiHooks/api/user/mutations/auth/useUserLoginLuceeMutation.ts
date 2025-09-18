import { APIResponse } from '../../../../../../api/types';
import { userLoginEndpoint } from '../../../../../../api/user/endpoints';
import { User } from '../../../../../../api/user/types';
import { FetchMethods } from '../../../../types';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../../useAppMutation/useAppMutation';

interface Values {
  email: string;
  password: string;
}

interface Response {
  USER: User;
  JSESSIONID: string;
}

export const useUserLoginMutation = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<Values, APIResponse<Response>>({
    method: FetchMethods.POST,
    url: userLoginEndpoint,
    ...args,
  });
};
