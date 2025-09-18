import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';
import { TransactionsArgs, generateOwnerFinancesTransactionsEndpoint } from '../../../../../api/owner/endpoints';

import { APIResponse } from '../../../../../api/types';
import { OwnerFinancesTransactions } from '../../../../../api/owner/types';

export const useOwnerFinancesTransactionsQuery = ({
  ownerId,
  year,
  toMonth,
  fromMonth,
  propertyId,
  sortOrder,
  filter,
  ...rest
}: TransactionsArgs & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<OwnerFinancesTransactions>>({
    endpoint: generateOwnerFinancesTransactionsEndpoint({
      ownerId,
      year,
      toMonth,
      fromMonth,
      propertyId,
      sortOrder,
      filter,
    }),
    ...rest,
  });
};
