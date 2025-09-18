import { UserRoleIDEnum } from '../../api/user/types';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserMessageMarkAsReadMutation } from '../apiHooks/api/user/mutations/useUserMessageMarkAsReadMutation';
import { userMessageOverviewQueryKeys } from '../apiHooks/api/user/infiniteQueries/useUserMessageOverviewInfiniteQuery';

interface Args {
  userId: number;
  userTypeId: UserRoleIDEnum;
  contactUserId: number;
  contactUserTypeId: UserRoleIDEnum;
}

/** Automatically marks all messages between the current user and a contact user as read */
export const useMessageMarkAsRead = ({ contactUserId, contactUserTypeId, userId, userTypeId }: Args) => {
  const qClient = useQueryClient();
  const markThreadAsReadMutation = useUserMessageMarkAsReadMutation({
    hasToastsEnabled: false,
  });

  useEffect(() => {
    markThreadAsReadMutation.mutate(
      {
        id: userId,
        user_type_id: userTypeId,
        contact_user_id: contactUserId,
        contact_user_type_id: contactUserTypeId,
      },
      {
        onSuccess: () => {
          qClient.invalidateQueries({ queryKey: userMessageOverviewQueryKeys.all });
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
