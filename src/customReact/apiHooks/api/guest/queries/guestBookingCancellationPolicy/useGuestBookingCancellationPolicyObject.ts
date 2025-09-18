import { generateGuestCancellationPolicyEndpoint } from '../../../../../../api/guest/endpoints';
import { CancellationPolicy } from '../../../../../../api/types';
import { useAppQuery } from '../../../../useAppQuery/useAppQuery';

const select = (data: any) => data.DATA.CANCELLATION_POLICY;
/** This will return the entire Cancellation Policy Object. To use the HTML 
 version, use useGuestCancellationPolicyHTML
 */
export const useGuestBookingCancellationPolicyObject = (bookingId: number, guestId: number) => {
  const endpoint = generateGuestCancellationPolicyEndpoint(bookingId, guestId);

  return useAppQuery<CancellationPolicy>({
    endpoint,
    select,
  });
};
