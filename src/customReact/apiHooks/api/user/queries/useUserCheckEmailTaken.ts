import { APIResponse } from '../../../../../api/types';
import { generateUserCheckEmailTaken } from '../../../../../api/user/endpoints';
import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  email: string;
}

export const useUserCheckEmailTaken = ({ email, ...rest }: Args & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<{ IS_EMAIL_TAKEN: boolean }>>({
    endpoint: generateUserCheckEmailTaken(email),
    ...rest,
  });
};
