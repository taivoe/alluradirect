import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';
import { FinancesArgs, generateOwnerFinancesSummaryEndpoint } from '../../../../../api/owner/endpoints';

import { APIResponse } from '../../../../../api/types';
import { OwnerFinancesSummary } from '../../../../../api/owner/types';

export const useOwnerFinancesSummaryQuery = ({
  ownerId,
  year,
  fromMonth,
  toMonth,
  sortOrder,
  propertyId = undefined,
  ...rest
}: FinancesArgs & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<OwnerFinancesSummary>>({
    endpoint: generateOwnerFinancesSummaryEndpoint({ ownerId, year, toMonth, fromMonth, sortOrder, propertyId }),
    ...rest,
  });
};
