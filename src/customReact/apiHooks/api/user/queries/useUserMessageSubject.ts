import { UserMessageSubject, UserRoleIDEnum } from '../../../../../api/user/types';

import { APIResponse } from '../../../../../api/types';
import { generateUserMessageSubjectEndpoint } from '../../../../../api/user/endpoints';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  userId: number;
  userTypeId: UserRoleIDEnum;
  bookingId?: number;
  messageId?: number;

  enabled?: boolean;
  onSuccess?: (data?: any) => void;
}

export const useUserMessageSubject = ({
  userId,
  userTypeId,
  bookingId,
  messageId,
  enabled = true,
  onSuccess,
}: Args) => {
  const endpoint = generateUserMessageSubjectEndpoint({
    id: userId,
    userTypeId,
    bookingId,
    messageId,
  });

  return useAppQuery<APIResponse<{ SUBJECT: UserMessageSubject }>>({
    endpoint,
    enabled,
    onSuccess,
  });
};
