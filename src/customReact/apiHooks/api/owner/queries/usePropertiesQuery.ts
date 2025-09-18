import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

import { APIResponse } from '../../../../../api/types';
import { OwnerProperty } from '../../../../../api/owner/types';
import { generateOwnerPropertiesEndPoint } from '../../../../../api/owner/endpoints';

interface Args {
  ownerId: number;
}

export const usePropertiesQuery = ({ ownerId, ...rest }: Args & ConfigurableAppQueryArgs<any>) => {
  const endpoint = generateOwnerPropertiesEndPoint(ownerId);

  return useAppQuery<APIResponse<{ PROPERTIES: OwnerProperty[]; OWNER_ID: number }>>({
    endpoint,
    queryKey: endpoint,
    ...rest,
  });
};
