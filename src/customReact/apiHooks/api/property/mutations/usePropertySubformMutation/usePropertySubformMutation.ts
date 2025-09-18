import { useQueryClient } from '@tanstack/react-query';

import { ConfigurableAppMutationArgs, useAppMutation } from '../../../../useAppMutation/useAppMutation';
import { generatePropertyEndPoint, subformEndpoint } from '../../../../../../api/property/endpoints';
import { generateUpdatedSendValues } from './modifySendData';

interface Args {
  onSuccess?: (data: any) => void;
  propertyId: number;
}

type ConfigurableArgs = Omit<ConfigurableAppMutationArgs, 'onSuccess' | 'modifySendData'>;

// Pass in an onSuccess function to handle updates outside of the hook
export const usePropertySubformMutation = ({ onSuccess, propertyId, ...rest }: Args & ConfigurableArgs) => {
  const queryClient = useQueryClient();
  const propertyQueryString = generatePropertyEndPoint(propertyId);

  return useAppMutation<any, any>({
    url: subformEndpoint,
    method: 'PUT',
    isSubform: true,
    // capture pid in the enclosing scope so that its always sent
    modifySendDataFn: generateUpdatedSendValues(propertyId),
    onSuccess: async responseData => {
      await queryClient.refetchQueries({ queryKey: [propertyQueryString] });
      onSuccess && onSuccess(responseData);
    },
    ...rest,
  });
};
