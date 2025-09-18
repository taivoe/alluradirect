import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

import { FetchMethods } from '../../../types';
import { userMessageMarkAsReadEndpoint } from '../../../../../api/user/endpoints';
import { UserRoleIDEnum } from '../../../../../api/user/types';

interface MessageMarkAsReadSendData {
  id: number;
  user_type_id: UserRoleIDEnum;
  contact_user_id: number;
  contact_user_type_id: UserRoleIDEnum;
}

export const useUserMessageMarkAsReadMutation = (args: ConfigurableAppMutationArgs) => {
  return useAppMutation<MessageMarkAsReadSendData>({
    url: userMessageMarkAsReadEndpoint,
    method: FetchMethods.PUT,
    ...args,
  });
};
