import { ownerLogoutEndpoint } from '../../../../../../api/owner/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../../useAppMutation/useAppMutation';

export const useUserLogoutLuceeMutation = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation({
    url: ownerLogoutEndpoint,
    method: 'POST',
    ...args,
  });
};
