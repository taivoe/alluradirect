import { CreateMessageSubject, SubjectIdentifier } from '../../../customReact/messages/types';

import { UserMessageSubject } from '../../../api/user/types';
import { capitalize } from '../../helpers/stringHelpers';
import { dateFormatLong } from '../../helpers/dateHelpers/dateHelpers';
import dayjs from 'dayjs';

export interface Subject {
  title: string;
  subtitle: string;
  subtitle2: string;
}

/** For display in message threads */
export function generateSelectedSubjectDisplay({
  subject,
  isOwnerRole,
}: {
  subject: CreateMessageSubject | undefined;
  isOwnerRole: boolean;
}): string {
  let subjectTitle = isOwnerRole ? 'Select an Inquiry or Booking' : 'Select an Upcoming or Past Reservation';

  if (!subject) return subjectTitle;

  if (subject.TYPE === SubjectIdentifier.BOOKING) {
    const start = dateFormatLong(dayjs(subject.ARRIVAL_DATE));
    const end = dateFormatLong(dayjs(subject.DEPARTURE_DATE));
    subjectTitle = `Booking (${start} - ${end})`;
  } else if (subject.TYPE === SubjectIdentifier.INQUIRY) {
    if (subject?.ARRIVAL_DATE && subject?.DEPARTURE_DATE) {
      const start = dateFormatLong(dayjs(subject.ARRIVAL_DATE));
      const end = dateFormatLong(dayjs(subject.DEPARTURE_DATE));
      subjectTitle = `Inquiry (${start} - ${end})`;
    } else {
      subjectTitle = 'Inquiry (No Dates Selected)';
    }
  }

  return subjectTitle;
}

/** For display in message subject select dialog */
export function generateReservationSubject({
  subject,
  isOwnerMode,
}: {
  subject: UserMessageSubject;
  isOwnerMode: boolean;
}): Subject {
  if (isOwnerMode) {
    return generateOwnerReservationSubject(subject);
  } else {
    return generateGuestReservationSubject(subject);
  }
}

/** For display in message subject select dialog */
function generateOwnerReservationSubject(subject: UserMessageSubject): Subject {
  const title = capitalize(subject.CONTACT.NAME);
  const subtitle = generateReservationSubtitle(subject);
  const subtitle2 = `${subject.PROPERTY.NAME} (#${subject.BOOKING.REFERENCE})`;

  return {
    title,
    subtitle,
    subtitle2,
  };
}

/** For display in message subject select dialog */
function generateGuestReservationSubject(subject: UserMessageSubject): Subject {
  const title = subject.PROPERTY.NAME;
  const subtitle = generateReservationSubtitle(subject);
  const subtitle2 = capitalize(subject.CONTACT.NAME);

  return {
    title,
    subtitle,
    subtitle2,
  };
}

/** For display in message subject select dialog */
function generateReservationSubtitle(subject: UserMessageSubject): string {
  const start = dateFormatLong(dayjs(subject.BOOKING.ARRIVAL_DATE));
  const end = dateFormatLong(dayjs(subject.BOOKING.DEPARTURE_DATE));
  const subtitle = `${start} - ${end}`;

  return subtitle;
}

/** For display in message subject select dialog 
 * Bookings are also being fed through this function; added date check on BOOKING object, and removed (sendDate) when none found for cleaner UI
*/
export function generateOwnerInquirySubject(subject: UserMessageSubject): Subject {
  const sentDate = subject.MESSAGE.CREATED_DATE ? '(' + dateFormatLong(dayjs(subject.MESSAGE.CREATED_DATE)) + ')' : '';
  const title = `${capitalize(subject.CONTACT.NAME)} ${sentDate}`;
  let subtitle = 'No Dates Selected';
  if (subject.MESSAGE.ARRIVAL_DATE && subject.MESSAGE.DEPARTURE_DATE) {
    const start = dateFormatLong(dayjs(subject.MESSAGE.ARRIVAL_DATE));
    const end = dateFormatLong(dayjs(subject.MESSAGE.DEPARTURE_DATE));
    subtitle = `${start} - ${end}`;
  } else if (subject.BOOKING.ARRIVAL_DATE && subject.BOOKING.DEPARTURE_DATE) {
    const start = dateFormatLong(dayjs(subject.BOOKING.ARRIVAL_DATE));
    const end = dateFormatLong(dayjs(subject.BOOKING.DEPARTURE_DATE));
    subtitle = `${start} - ${end}`;
  } 
  const subtitle2 = subject.PROPERTY.NAME;

  return {
    title,
    subtitle,
    subtitle2,
  };
}
