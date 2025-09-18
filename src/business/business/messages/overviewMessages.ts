import { UserMessageOverview } from '../../../api/user/types';
import { capitalize } from '../../helpers/stringHelpers';
import { getRelativeTime } from '../../helpers/dateHelpers/dateHelpers';

export function generateContactName(overviewMessage: UserMessageOverview): string {
  const { CONTACT } = overviewMessage;
  return CONTACT.NAME.length === 0 ? CONTACT.EMAIL : capitalize(CONTACT.NAME);
}

export function generateLastMessageSentTime(overviewMessage: UserMessageOverview): string {
  const { MESSAGE } = overviewMessage;
  return getRelativeTime(MESSAGE.DATE_SENT, MESSAGE.TIME_SENT);
}

export function generateNumberOfUnread(overviewMessage: UserMessageOverview): string {
  if (overviewMessage.MESSAGE.NUM_UNREAD > 0) {
    return `(${overviewMessage.MESSAGE.NUM_UNREAD})`;
  } else {
    return '';
  }
}

export function hasNextReservation(overviewMessage: UserMessageOverview): boolean {
  return overviewMessage.CONTACT.DETAILS.HAS_NEXT_RESERVATION;
}

export function generateMessageProperty(overviewMessage: UserMessageOverview): string {
  return overviewMessage.PROPERTY.NAME;
}
