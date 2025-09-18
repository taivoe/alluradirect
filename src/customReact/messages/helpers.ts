import { CreateMessageSubject, SubjectIdentifier } from './types';

import { UserMessageSubject } from '../../api/user/types';

export function generateCreateMessageSubject(
  subject: UserMessageSubject | undefined,
): CreateMessageSubject | undefined {
  if (!subject) return undefined;

  return Object.keys(subject.BOOKING).length === 0
    ? {
        TYPE: SubjectIdentifier.INQUIRY,
        ID: subject.MESSAGE.ID,
        ARRIVAL_DATE: subject.MESSAGE.ARRIVAL_DATE,
        DEPARTURE_DATE: subject.MESSAGE.DEPARTURE_DATE,
      }
    : {
        TYPE: SubjectIdentifier.BOOKING,
        ID: subject.BOOKING.ID,
        ARRIVAL_DATE: subject.BOOKING.ARRIVAL_DATE,
        DEPARTURE_DATE: subject.BOOKING.DEPARTURE_DATE,
        REFERENCE: subject.BOOKING.REFERENCE,
      };
}
