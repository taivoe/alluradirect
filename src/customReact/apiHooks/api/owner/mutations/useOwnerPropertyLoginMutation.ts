import { ownerPropertyLoginEndpoint } from '../../../../../api/owner/endpoints';
import { APIResponse } from '../../../../../api/types';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

export const useOwnerPropertyLoginMutation = (reactQueryOptions: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<{ id: number; property_id: number }, APIResponse<{ PROPERTY_ID: number }>>({
    url: ownerPropertyLoginEndpoint,
    method: 'POST',
    ...reactQueryOptions,
  });
};
