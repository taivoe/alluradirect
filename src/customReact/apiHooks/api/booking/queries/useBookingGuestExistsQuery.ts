import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

import { APIResponse } from '../../../../../api/types';
import { BookingGuestExists } from '../../../../../api/booking/types';
import { generateBookingGuestExists } from '../../../../../api/booking/endpoints';

interface Args {
  guestEmail: string;
}

export const useBookingGuestExistsQuery = ({ guestEmail, enabled, ...rest }: Args & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<BookingGuestExists>>({
    endpoint: generateBookingGuestExists(guestEmail),
    enabled,
    ...rest,
  });
};
