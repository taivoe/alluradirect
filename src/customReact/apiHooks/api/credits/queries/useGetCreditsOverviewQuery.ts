import { generateCreditsOverviewEndpoint } from '../../../../../api/credits/endpoints';
import { CreditsOverview } from '../../../../../api/credits/types';
import { APIResponse } from '../../../../../api/types';
import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  userId: number;
}

export const useGetCreditsOverviewQuery = ({ userId, ...rest }: Args & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<CreditsOverview>>({
    endpoint: generateCreditsOverviewEndpoint(userId),
    ...rest,
  });
};
