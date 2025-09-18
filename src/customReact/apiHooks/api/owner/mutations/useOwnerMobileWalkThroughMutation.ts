import { ownerMobileWalkthroughEndpoint } from '../../../../../api/owner/endpoints';
import { MobileWalkThroughNameEnum } from '../../../../../api/owner/types';
import { useAppMutation } from '../../../useAppMutation/useAppMutation';

export const useOwnerMobileWalkthroughMutation = () => {
  return useAppMutation<{ id: number; step_name: MobileWalkThroughNameEnum }>({
    url: ownerMobileWalkthroughEndpoint,
    method: 'PUT',
  });
};
