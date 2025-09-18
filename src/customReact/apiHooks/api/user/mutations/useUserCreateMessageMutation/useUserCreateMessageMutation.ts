import { FetchMethods } from '../../../../types';
import { UserMessage } from '../../../../../../api/user/types';
import { useAppMutation } from '../../../../useAppMutation/useAppMutation';
import { userMessageEndpoint } from '../../../../../../api/user/endpoints';

export const useUserCreateMessageMutation = () => {
  return useAppMutation<UserMessage>({
    url: userMessageEndpoint,
    method: FetchMethods.POST,
  });
};
