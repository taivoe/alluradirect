import { User } from '../../../api/user/types';
import { capitalize } from '../../helpers/stringHelpers';

interface UserInfo {
  IS_COMPANY?: boolean;
  COMPANY_NAME?: string;
  LAST_NAME: string;
  FIRST_NAME: string;
}

export function generateUserName(user: UserInfo): string {
  if (user.IS_COMPANY && user.COMPANY_NAME) {
    return user.COMPANY_NAME;
  } else {
    // User somehow duplicated their first or last name
    if (user.FIRST_NAME.includes(user.LAST_NAME)) {
      return capitalize(user.FIRST_NAME);
    } else if (user.LAST_NAME.includes(user.FIRST_NAME)) {
      return capitalize(user.LAST_NAME);
    }

    return `${capitalize(user.FIRST_NAME)} ${capitalize(user.LAST_NAME)}`;
  }
}

/** Guest accounts are automatically created with the owner create booking tool if the email does not exist.
 *  These guests are required to fill additional information before their account is considered usable
 */
export function isUserMissingProfileInfo(user: User): boolean {
  const {
    ADDRESS: { STREET_NAME, STREET_NUMBER, CITY, REGION, COUNTRY, POSTAL },
    LAST_NAME,
    FIRST_NAME,
    PHONE,
    IS_COMPANY,
    COMPANY_NAME,
  } = user;

  if (!PHONE) {
    return true;
  }

  if (IS_COMPANY && !COMPANY_NAME) {
    return true;
  }

  if (!IS_COMPANY && (!LAST_NAME || !FIRST_NAME)) {
    return true;
  }

  if (!STREET_NAME || !STREET_NUMBER || !CITY || !REGION || !COUNTRY || !POSTAL) {
    return true;
  }

  return false;
}

export function hasGuestRole(user: User): boolean {
  if (!user.GUEST_PROFILE) return false;
  return Object.keys(user.GUEST_PROFILE).length > 0;
}

export function hasOwnerRole(user: User): boolean {
  if (!user.OWNER_PROFILE) return false;
  return Object.keys(user.OWNER_PROFILE).length > 0;
}

export function hasCoHostRole(user: User): boolean {
  if (!user.COHOST_PROFILE) return false;
  return Object.keys(user.COHOST_PROFILE).length > 0;
}

export function hasPropertyManagerRole(user: User): boolean {
  if (!user.PROPERTY_MANAGER_PROFILE) return false;
  return Object.keys(user.PROPERTY_MANAGER_PROFILE).length > 0;
}
