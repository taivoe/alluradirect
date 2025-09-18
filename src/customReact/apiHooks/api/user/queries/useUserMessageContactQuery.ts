import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';
import { User } from '../../../../../api/user/types';

import { APIResponse } from '../../../../../api/types';
import { generateUserMessageContactEndpoint, UserMessageContactArgs } from '../../../../../api/user/endpoints';

export const useUserMessageContactQuery = ({
  contactUserId,
  contactUserTypeId,
  propertyId,
  enabled = true,
  ...rest
}: UserMessageContactArgs & ConfigurableAppQueryArgs<any>) => {
  return useAppQuery<
    APIResponse<{ CONTACT: User; LAST_RESERVATION_DATE: string; NEXT_RESERVATION_DATE: string; STATUS: string }>
  >({
    endpoint: generateUserMessageContactEndpoint({ propertyId, contactUserId, contactUserTypeId }),
    enabled,
    ...rest,
  });
};
