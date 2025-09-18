import { UserMessageSubject, UserRoleIDEnum } from '../../../../api/user/types';

import { CreateMessage } from '../createMessage';
import { USER_MESSAGE_SUBJECT } from '../../../../api/user/constants';

const propertyName = 'test property';
const bookingReference = '2095-b-123';
const contactName = 'Bob Marley';
const contactThumbnail = 'This is a contact thumbnail';
const propertyThumbnail = 'This is a property thumbnail';

function generateUserContact(): UserMessageSubject {
  const subject = { ...USER_MESSAGE_SUBJECT };
  subject.PROPERTY.NAME = propertyName;
  subject.PROPERTY.THUMBNAIL = propertyThumbnail;
  subject.BOOKING.REFERENCE = bookingReference;
  subject.BOOKING.ARRIVAL_DATE = '2021-01-01';
  subject.BOOKING.DEPARTURE_DATE = '2021-01-02';
  subject.CONTACT.NAME = contactName;
  subject.CONTACT.THUMBNAIL = contactThumbnail;

  return subject;
}

describe(CreateMessage.generateMessageSubjectTitle.name, () => {
  it('Returns the property name and the booking reference if userType is guest', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectTitle(userContact, UserRoleIDEnum.guest);

    expect(res).toContain(propertyName);
    expect(res).toContain(bookingReference);
  });

  it('Returns the contact name if userType is owner and the contact name is defined', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectTitle(userContact, UserRoleIDEnum.owner);

    expect(res).toContain(contactName);
  });

  it('Returns an empty string if the userType is neither owner nor guest', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectTitle(userContact, UserRoleIDEnum.allura);
    const res2 = CreateMessage.generateMessageSubjectTitle(userContact, UserRoleIDEnum.propertyContact);

    expect(res).toEqual('');
    expect(res2).toEqual('');
  });
});

describe(CreateMessage.generateMessageSubjectSubtitle.name, () => {
  it('Returns a formatted start and end date when userType is owner or guest', () => {
    const userContact = generateUserContact();
    const guestRes = CreateMessage.generateMessageSubjectSubtitle(userContact, UserRoleIDEnum.guest);
    const ownerRes = CreateMessage.generateMessageSubjectSubtitle(userContact, UserRoleIDEnum.owner);

    expect(guestRes).toContain('1st');
    expect(ownerRes).toContain('2nd');
  });

  it('Returns an empty string if the userType is neither owner nor guest', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectSubtitle(userContact, UserRoleIDEnum.allura);
    const res2 = CreateMessage.generateMessageSubjectSubtitle(userContact, UserRoleIDEnum.propertyContact);

    expect(res).toEqual('');
    expect(res2).toEqual('');
  });
});

describe(CreateMessage.generateMessageSubjectThumbnail.name, () => {
  it('Returns the property thumbnail if userType is guest', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectThumbnail(userContact, UserRoleIDEnum.guest);

    expect(res).toEqual(propertyThumbnail);
  });

  it('Returns the property thumbnail if userType is guest', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectThumbnail(userContact, UserRoleIDEnum.owner);

    expect(res).toEqual(contactThumbnail);
  });

  it('Returns an empty string if userType is neither guest nor owner', () => {
    const userContact = generateUserContact();
    const res = CreateMessage.generateMessageSubjectThumbnail(userContact, UserRoleIDEnum.allura);

    expect(res).toEqual('');
  });
});
