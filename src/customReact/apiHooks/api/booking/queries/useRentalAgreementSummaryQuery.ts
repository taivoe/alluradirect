import { generateGuestRentalAgreementSummaryEndpoint } from '../../../../../api/guest/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

const select = (data: any) => data?.DATA?.RENTAL_AGREEMENT;

export const rentalAgreementSummaryQueryKey = queryKeyFactory('rentalAgreement');

export const useRentalAgreementSummaryQuery = ({
  enabled = true,
  bookingId,
  guestId,
}: {
  enabled?: boolean;
  bookingId: number;
  guestId: number;
}) => {
  const endpoint = generateGuestRentalAgreementSummaryEndpoint(bookingId, guestId);
  const queryKey = rentalAgreementSummaryQueryKey.detail(endpoint);
  return useAppQuery<string>({ endpoint, queryKey: queryKey, select, enabled });
};
