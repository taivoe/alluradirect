import { generateBookingCancellationDetailEndpoint } from '../../../../../api/booking/endpoints';
import { CancellationDetails } from '../../../../../api/booking/types';
import { APIKeyResponse } from '../../../../../api/types';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

export const useBookingCancellationQuery = ({ bookingId }: { bookingId: number | string }) => {
  const queryKey = queryKeyFactory(`cancellationDetail`);
  const endpoint = generateBookingCancellationDetailEndpoint(String(bookingId));
  return useAppQuery<APIKeyResponse<CancellationDetails, 'CANCELLATION_DETAILS'>>({
    queryKey: queryKey.detail(String(bookingId)),
    endpoint,
  });
};
