import { APIResponse } from '../../../../../api/types';
import { generateUserCheckEmailTaken } from '../../../../../api/user/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

interface Values {
  urlArgs: string[];
}

export const useUserCheckEmailTakenMutation = (props: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<Values, APIResponse<{ is_email_taken: boolean }>>({
    url: generateUserCheckEmailTaken,
    method: 'GET',
    ...props,
  });
};
