import { useGuestUnavailableDates } from '../../../guest/queries/useGuestUnavailableDates';
import { useOwnerUnavailableDates } from '../../../owner/queries/useOwnerUnavailableDatesQuery';

interface Props {
  /** The bookingId is not required when editing a booking
   *  since we want to allow the dates that the booking is on to be available */
  bookingId?: number;
  isGuestRole: boolean;
  isOwnerRole: boolean;
  propertyId?: number;
  guestId?: number;

  isEnabled?: boolean;
  onSuccess?: () => void;
}
export const useUnavailableDates = ({
  isOwnerRole,
  isGuestRole,
  bookingId = 0,
  propertyId = 0,
  guestId = 0,
  isEnabled = true,
  onSuccess = () => null,
}: Props) => {
  const ownerUnavailableDates = useOwnerUnavailableDates({
    isEnabled: isOwnerRole && isEnabled,
    bookingId,
    propertyId,
    onSuccess,
  });
  const guestUnavailableDates = useGuestUnavailableDates({
    isEnabled: isGuestRole && isEnabled,
    bookingId,
    guestId,
    onSuccess,
  });

  return isOwnerRole ? ownerUnavailableDates : guestUnavailableDates;
};
