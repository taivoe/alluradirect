import { FullBooking } from '../../../../../api/booking/types';
import { useGuestBookingQuery } from './useGuestBookingQuery';
import { usePropertyBookingQuery } from '../../property/queries/usePropertyBookingQuery';

interface Args {
  isOwnerRole: boolean;
  isGuestRole: boolean;
  bookingId: number;
  guestId?: number;
  isEnabled?: boolean;
  onSuccess?: (booking: FullBooking) => void;
  includeTimeline?: boolean;
  ownerOffer?: { code: string; id: string; };
  alluraOffer?: { code: string; id: string; };
  alluraGiftCertificate?: { code: string; id: string; };
  ownerGiftCertificate?: { code: string; id: string; };
}

export const useBookingQuery = ({
  bookingId,
  isOwnerRole,
  isGuestRole,
  guestId = 0,
  isEnabled = true,
  onSuccess = () => null,
  includeTimeline = false,
  ownerOffer,
  alluraOffer,
  alluraGiftCertificate,
  ownerGiftCertificate,
}: Args) => {
  const ownerBookingQuery = usePropertyBookingQuery({ isEnabled: isOwnerRole && isEnabled, bookingId, onSuccess });

  const guestBookingQuery = useGuestBookingQuery({
    bookingId,
    guestId,
    includeTimeline,
    isEnabled: isGuestRole && isEnabled,
    onSuccess,
    alluraOffer,
    ownerOffer,
    alluraGiftCertificate,
    ownerGiftCertificate,
  });

  return isOwnerRole ? ownerBookingQuery : guestBookingQuery;
};
