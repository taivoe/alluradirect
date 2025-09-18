import { generateOwnerMobileWalkthroughEndpoint } from '../../../../../api/owner/endpoints';
import { OwnerMobileWalkthrough } from '../../../../../api/owner/types';
import { APIResponse } from '../../../../../api/types';
import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  id: number;
}

export const useOwnerMobileWalkthroughQuery = ({ id }: Args & ConfigurableAppQueryArgs) => {
  const endpoint = generateOwnerMobileWalkthroughEndpoint(id);

  return useAppQuery<APIResponse<OwnerMobileWalkthrough>>({
    endpoint,
  });
};
