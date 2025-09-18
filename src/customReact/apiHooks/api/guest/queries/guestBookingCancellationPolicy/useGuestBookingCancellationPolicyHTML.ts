import { generateGuestCancellationPolicyEndpoint } from '../../../../../../api/guest/endpoints';
import { useAppQuery } from '../../../../useAppQuery/useAppQuery';

const select = (data: any) => data.DATA.CANCELLATION_POLICY;
/** This will return the entire Cancellation Policy HTML. To use the Object 
 version, use useGuestCancellationPolicyObject
 */
export const useGuestBookingCancellationPolicyHTML = (bookingId: number, guestId: number) => {
  const endpoint = generateGuestCancellationPolicyEndpoint(bookingId, guestId, true);

  return useAppQuery<string>({
    endpoint,
    select,
  });
};
