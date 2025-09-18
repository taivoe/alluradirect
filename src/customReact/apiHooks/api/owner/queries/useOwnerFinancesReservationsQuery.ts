import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';
import { FinancesArgs, generateOwnerFinancesReservationsEndpoint } from '../../../../../api/owner/endpoints';

import { APIResponse } from '../../../../../api/types';
import { OwnerFinancesReservations } from '../../../../../api/owner/types';

export const useOwnerFinancesReservationsQuery = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId,
  ...rest
}: FinancesArgs & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<OwnerFinancesReservations>>({
    endpoint: generateOwnerFinancesReservationsEndpoint({ ownerId, year, fromMonth, toMonth, sortOrder, propertyId }),
    ...rest,
  });
};
