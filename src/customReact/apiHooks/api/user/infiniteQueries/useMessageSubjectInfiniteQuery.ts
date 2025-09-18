import { UserMessageSubject, UserRoleIDEnum } from '../../../../../api/user/types';

import { flattenApiPages } from '../../../../../business/helpers/apiHelpers/apiHelpers';
import { useUserMessageSubjectsInfiniteQuery } from './useUserMessageSubjectsInfiniteQuery';

interface Args {
  userId: number;
  userTypeId: UserRoleIDEnum;
  contactId: number | undefined;
  contactUserTypeId: UserRoleIDEnum | undefined;
}

/** When a user selects a subject they can  */
export const useMessageSubjectInfiniteQuery = ({ userId, userTypeId, contactId, contactUserTypeId }: Args) => {
  const upcomingBookingsQuery = useUserMessageSubjectsInfiniteQuery({
    id: userId,
    userTypeId,
    pageDirection: 'future',
    subjectType: 'future_bookings',
    filterUserId: contactId,
    filterUserTypeId: contactUserTypeId,
  });
  const pastBookingsQuery = useUserMessageSubjectsInfiniteQuery({
    id: userId,
    userTypeId,
    pageDirection: 'future',
    subjectType: 'past_bookings',
    filterUserId: contactId,
    filterUserTypeId: contactUserTypeId,
  });

  const upcomingBookings: UserMessageSubject[] = upcomingBookingsQuery.data
    ? flattenApiPages(upcomingBookingsQuery.data, 'SUBJECTS')
    : [];
  const pastBookings: UserMessageSubject[] = pastBookingsQuery.data
    ? flattenApiPages(pastBookingsQuery.data, 'SUBJECTS')
    : [];

  const isLoading = upcomingBookingsQuery.isLoading || pastBookingsQuery.isLoading;

  return {
    upcomingBookings,
    pastBookings,
    isLoading,
    upcomingBookingsQuery,
    pastBookingsQuery,
  };
};
