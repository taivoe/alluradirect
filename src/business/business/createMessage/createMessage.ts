import { UserMessageSubject, UserRoleIDEnum } from '../../../api/user/types';

import dayjs from 'dayjs';
import { dayjsFormatShortOrdinal } from '../../helpers/dateHelpers/dateHelpers';

export const CreateMessage = {
  generateMessageSubjectTitle(userContact: UserMessageSubject, userType: UserRoleIDEnum): string {
    switch (userType) {
      case UserRoleIDEnum.guest: {
        return `${userContact.PROPERTY.NAME} - ${userContact.BOOKING.REFERENCE}`;
      }
      case UserRoleIDEnum.owner: {
        if (userContact.CONTACT.NAME) {
          return `${userContact.CONTACT.NAME}`;
        } else {
          return `${userContact.CONTACT.EMAIL}`;
        }
      }
      default: {
        return '';
      }
    }
  },
  generateMessageSubjectSubtitle(userContact: UserMessageSubject, userType: UserRoleIDEnum): string {
    const arrivalDepartureSubtitle = `${dayjsFormatShortOrdinal(
      dayjs(userContact.BOOKING.ARRIVAL_DATE),
    )} - ${dayjsFormatShortOrdinal(dayjs(userContact.BOOKING.DEPARTURE_DATE))}`;

    switch (userType) {
      case UserRoleIDEnum.guest: {
        return arrivalDepartureSubtitle;
      }
      case UserRoleIDEnum.owner: {
        return arrivalDepartureSubtitle;
      }
      default: {
        return '';
      }
    }
  },
  generateMessageSubjectThumbnail(userContact: UserMessageSubject, userType: UserRoleIDEnum | 0): string {
    switch (userType) {
      case UserRoleIDEnum.guest: {
        return userContact.PROPERTY.THUMBNAIL;
      }
      case UserRoleIDEnum.owner: {
        return userContact.CONTACT.THUMBNAIL;
      }
      default: {
        return '';
      }
    }
  },
};
