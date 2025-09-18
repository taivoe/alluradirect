import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

import { FetchMethods } from '../../../types';
import { ownerDismissNotificationsEndpoint } from '../../../../../api/owner/endpoints';

interface Values {
  /** Owner Id */
  id: number;
  notification_ids: number[] | 'all';
}

export const useOwnerDismissNotificationsMutation = (args: ConfigurableAppMutationArgs) => {
  return useAppMutation<Values>({
    method: FetchMethods.PUT,
    url: ownerDismissNotificationsEndpoint,
    ...args,
  });
};
