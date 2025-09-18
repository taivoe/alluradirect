import { APIResponse } from '../../../../../api/types';
import { generateUserCheckEmailExists } from '../../../../../api/user/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

interface Values {
  urlArgs: string[];
}
export const useUserCheckEmailExistsMutation = (props: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<Values, APIResponse<{ IS_EMAIL_TAKEN: boolean }>>({
    url: generateUserCheckEmailExists,
    method: 'GET',
    ...props,
  });
};
