import { MessageThreadItem } from '../../api/user/types';
import { useEffect } from 'react';

interface Args {
  lastThreadData: MessageThreadItem | undefined;
  hasCurrentSubjectSelection: boolean;
  setBookingId: (id: number) => void;
  setMessageId: (id: number) => void;
}

/** When a user enters a thread from an overview screen none of bookingId or messageId are set
 *  To set one of these and download the subject we check the last message in the thread
 */
export const useUpdateSubjectSelection = ({
  lastThreadData,
  hasCurrentSubjectSelection,
  setBookingId,
  setMessageId,
}: Args) => {
  useEffect(() => {
    if (lastThreadData && !hasCurrentSubjectSelection) {
      if (Object.keys(lastThreadData.BOOKING).length > 0) {
        setBookingId(lastThreadData.BOOKING.ID);
      } else {
        setMessageId(lastThreadData.MESSAGE.ID);
      }
    }
  }, [hasCurrentSubjectSelection, lastThreadData, setBookingId, setMessageId]);
};
