import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

import { APIResponse } from '../../../../../api/types';
import { OwnerExternalEvents } from '../../../../../api/owner/types';
import { generateOwnerExternalBookingsEndpoint } from '../../../../../api/owner/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';

interface Args {
  ownerId: number;
  propertyId?: number;
  numMonths: number;
}

export const ownerExternalEventsQueryKey = queryKeyFactory('owner-external-events-query');

export const useOwnerExternalEventsQuery = ({
  ownerId,
  propertyId = undefined,
  numMonths,
  ...rest
}: Args & ConfigurableAppQueryArgs) => {
  const queryKey = ownerExternalEventsQueryKey.detail(`${ownerId}-${propertyId}-${numMonths}`);

  return useAppQuery<APIResponse<OwnerExternalEvents>>({
    endpoint: generateOwnerExternalBookingsEndpoint({
      ownerId,
      propertyId,
      numMonths,
    }),
    queryKey,
    ...rest,
  });
};
