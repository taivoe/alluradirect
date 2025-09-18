import { FullBooking } from '../../../../../api/booking/types';
import { generateBookingReservationEndpoint } from '../../../../../api/property/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

interface Args {
  bookingId: number;
  isEnabled?: boolean;
  onSuccess?: (booking: FullBooking) => void;
  onError?: () => void;

  includeTimeline?: boolean;
}

const select = (data: any) => data.DATA.BOOKING;

export const propertyBookingQueryKey = queryKeyFactory('PROPERTY_BOOKING');

export const usePropertyBookingQuery = ({
  isEnabled = true,
  bookingId = 0,
  includeTimeline = false,
  onSuccess = () => null,
  onError = () => null,
}: Args) => {
  const endpoint = generateBookingReservationEndpoint(bookingId, includeTimeline);
  const queryKey = propertyBookingQueryKey.detail(endpoint);

  return useAppQuery<FullBooking>({
    endpoint,
    queryKey,
    select,
    enabled: isEnabled,
    onSuccess,
    onError,
  });
};
