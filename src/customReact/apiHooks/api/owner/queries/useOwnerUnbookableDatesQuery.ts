import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

import { APIResponse } from '../../../../../api/types';
import { OwnerUnbookableDates } from '../../../../../api/owner/types';
import { generateOwnerUnbookableDates } from '../../../../../api/owner/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';

interface Args {
  ownerId: number;
  propertyId?: number;
  numMonths: number;
}
export const ownerUnbookableDatesQueryKey = queryKeyFactory('owner-external-events-query');

export const useOwnerUnbookableDatesQuery = ({
  ownerId,
  propertyId = undefined,
  numMonths,
  ...rest
}: Args & ConfigurableAppQueryArgs) => {
  const queryKey = ownerUnbookableDatesQueryKey.detail(`${ownerId}${propertyId}${numMonths}`);

  return useAppQuery<APIResponse<OwnerUnbookableDates>>({
    endpoint: generateOwnerUnbookableDates({
      ownerId,
      propertyId,
      numMonths,
    }),
    queryKey,
    ...rest,
  });
};
