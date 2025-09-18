import { APIResponse } from '../../../../../api/types';
import { Args } from '../../user/queries/useUnavailableDatesQuery/types';
import { generateGuestUnavailableDatesEndpoint } from '../../../../../api/guest/endpoints';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

export interface UnavailableDatesResponse {
  CANNOT_ARRIVE: string[];
  CANNOT_DEPART: string[];
  UNAVAILABILITY_ARRIVAL: string[];
  UNAVAILABILITY_DEPARTURE: string[];
}

interface GuestArgs extends Omit<Args, 'propertyId'> {
  guestId: number;
}

export const useGuestUnavailableDates = ({
  isEnabled = true,
  bookingId = 0,
  guestId = 0,
  onSuccess = () => null,
}: GuestArgs) => {
  const queryKey = generateGuestUnavailableDatesEndpoint(bookingId, guestId);

  return useAppQuery<APIResponse<UnavailableDatesResponse>>({
    endpoint: queryKey,
    enabled: isEnabled,
    onSuccess,
  });
};
