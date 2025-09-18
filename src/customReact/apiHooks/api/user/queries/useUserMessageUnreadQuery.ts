import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';
import { MessageUnreadCount, UserRoleIDEnum } from '../../../../../api/user/types';

import { APIResponse } from '../../../../../api/types';
import { generateUserMessageUnreadEndpoint } from '../../../../../api/user/endpoints';

interface Args {
  id: number;
  userTypeId: UserRoleIDEnum;
}

export const useUserMessageUnreadQuery = ({
  id,
  userTypeId,
  enabled = true,
  ...rest
}: Args & ConfigurableAppQueryArgs<any>) => {
  return useAppQuery<APIResponse<MessageUnreadCount>>({
    endpoint: generateUserMessageUnreadEndpoint(id, userTypeId),
    enabled,
    ...rest,
  });
};
