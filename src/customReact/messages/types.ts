export enum SubjectIdentifier {
  BOOKING = 'BOOKING',
  INQUIRY = 'INQUIRY',
}

interface CreateMessageSubjectBooking {
  TYPE: SubjectIdentifier.BOOKING;
  ID: number;
  ARRIVAL_DATE: string;
  DEPARTURE_DATE: string;
  REFERENCE: string;
}

interface CreateMessageSubjectInquiry {
  TYPE: SubjectIdentifier.INQUIRY;
  ID: number;
  ARRIVAL_DATE: string | undefined;
  DEPARTURE_DATE: string | undefined;
}

export type CreateMessageSubject = CreateMessageSubjectBooking | CreateMessageSubjectInquiry;
