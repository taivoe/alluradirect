import { Args, UnavailableDatesResponse } from '../../user/queries/useUnavailableDatesQuery/types';

import { APIResponse } from '../../../../../api/types';
import { generateUnavailabilityEndpoint } from '../../../../../api/property/endpoints';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

export const useOwnerUnavailableDates = ({
  isEnabled = true,
  bookingId = 0,
  propertyId = 0,
  onSuccess = () => null,
}: Args) => {
  const queryKey = generateUnavailabilityEndpoint({ bookingId, propertyId });

  return useAppQuery<APIResponse<UnavailableDatesResponse>>({
    endpoint: queryKey,
    enabled: isEnabled,
    onSuccess,
  });
};
