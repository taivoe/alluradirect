import { UserRoleIDEnum } from '../../api/user/types';
import { useState } from 'react';

export interface MessageSearchParams {
  contactId: number;
  contactTypeId: UserRoleIDEnum;

  initialBookingId?: number;
  initialMessageId?: number;
}

/** When visiting a thread from the message overview screen none of initialBookingId or initialMessageId are selected.
 *    In this scenario the booking, inquiry or message id will be set by the most recent message in the message thread
 *  When visiting a thread from a reservation or guidebook screen the initialBookingId will be set
 *    In this scenario, bookingId will be set
 *  In both scenarios, once one of bookingId or messageId are set then the subject will be fetched and set
 */
export const useInitializeThread = ({
  initialBookingId,
  initialMessageId,
}: Omit<MessageSearchParams, 'contactId' | 'contactTypeId'>) => {
  const [bookingId, setBookingId] = useState(initialBookingId);
  const [messageId, setMessageId] = useState(initialMessageId);

  const hasInitialSubjectSelection = Boolean(initialBookingId) || Boolean(initialMessageId);
  const hasCurrentSubjectSelection = Boolean(bookingId) || Boolean(messageId);

  return {
    bookingId,
    setBookingId,
    messageId,
    setMessageId,
    hasInitialSubjectSelection,
    hasCurrentSubjectSelection,
  };
};
