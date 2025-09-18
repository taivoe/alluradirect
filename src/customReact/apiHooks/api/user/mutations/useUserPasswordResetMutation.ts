import { userPasswordResetEndpoint } from '../../../../../api/user/endpoints';
import { FetchMethods } from '../../../types';
import { useAppMutation } from '../../../useAppMutation/useAppMutation';

interface Values {
  email: string;
}

export const useUserPasswordResetMutation = () => {
  return useAppMutation<Values>({
    url: userPasswordResetEndpoint,
    method: FetchMethods.POST,
  });
};
