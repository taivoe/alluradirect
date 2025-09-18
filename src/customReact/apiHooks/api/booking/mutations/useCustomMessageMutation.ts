import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

import { bookingcustomMessageEndpoint } from '../../../../../api/booking/endpoints';

interface Values {
  bookingId: number;
  message?: string;
  entry_code?: string;
}

export const useCustomMessageMutation = (args: ConfigurableAppMutationArgs) => {
  return useAppMutation<Values>({
    url: bookingcustomMessageEndpoint,
    method: 'PUT',
    ...args,
  });
};
