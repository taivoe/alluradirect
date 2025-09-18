import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

import { FetchMethods } from '../../../types';
import { guestDismissNotificationsEndpoint } from '../../../../../api/guest/endpoints';

interface Values {
  /** Guest Id */
  id: number;
  notification_ids: number[] | 'all';
}

export const useGuestDismissNotificationsMutation = (args: ConfigurableAppMutationArgs) => {
  return useAppMutation<Values>({
    method: FetchMethods.PUT,
    url: guestDismissNotificationsEndpoint,
    ...args,
  });
};
