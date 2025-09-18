import { InfiniteQueryPageDirections } from '../types';
import { UserRoleIDEnum } from './types';
/** This is the standard user endpoint for Lucee now. It will also return
 * the auth state of the current client's session in that it will return the user object
 * or an empty object if the user is not logged in.
 */
export const userPutEndpoint = '/RESTAUTH/user/';
export const userEndpoint = '/RESTAUTH/user/checklogin/';
export const userCredentialsEndpoint = '/RESTAUTH/user/credentials/';
export const userLoginEndpoint = '/RESTAUTH/user/login/';
export const userPasswordSyncEndpoint = '/RESTAUTH/user/accountsync/';
export const userProfilePhotoEndpoint = '/RESTAUTH/user/profilephoto/';
export const userMessageEndpoint = '/RESTAUTH/user/message/';

export const twilioSendCodeEndpoint = `/RESTAUTH/user/verification/`;
export const twilioSendCodeEndpointCheck = `/RESTAUTH/user/verification/check/`;

/** POST: accepts an email */
export const userPasswordResetEndpoint = '/RESTAUTH/user/passwordreset/';

export const generateUserProfilePhotoEndpoint = (userId: number, userTypeId: UserRoleIDEnum): string => {
  return `/RESTAUTH/user/profilephoto/?id=${userId}&user_type_id=${userTypeId}`;
};

/** Get number of unread messages */
export const generateUserMessageUnreadEndpoint = (id: number, userTypeId: UserRoleIDEnum): string =>
  `/RESTAUTH/user/message/unreadcount/?id=${id}&user_type_id=${userTypeId}`;

/** Mark all messages in the contact thread as read for the current user */
export const userMessageMarkAsReadEndpoint = `/RESTAUTH/user/message/thread/markasread/`;

/** Get detailed information about a specific user
 * Send a propertyId when contactUserTypeId is not guest
 */

export type UserMessageContactArgs = {
  contactUserTypeId: UserRoleIDEnum;
  contactUserId: number;
  propertyId?: number;
};

export const generateUserMessageContactEndpoint = ({
  contactUserTypeId,
  contactUserId,
  propertyId,
}: UserMessageContactArgs): string => {
  const pid = propertyId ? `&property_id=${propertyId}` : '';
  return `/RESTAUTH/user/message/contact/?contact_user_id=${contactUserId}&contact_user_type_id=${contactUserTypeId}${pid}`;
};

/** Gets UserMessageSubject information from a reservation. One of bookingId or messageId is required */
export const generateUserMessageSubjectEndpoint = ({
  id,
  userTypeId,
  /** For reservation messages, guidebook messages etc */
  bookingId = undefined,
  /** Used for getting the last subject as an owner */
  messageId = undefined,
}: {
  id: number;
  userTypeId: UserRoleIDEnum;
  bookingId?: number;
  messageId?: number;
}): string => {
  const bid = bookingId !== undefined ? `&booking_id=${bookingId}` : '';
  const mid = messageId !== undefined ? `&message_id=${messageId}` : '';

  return `/RESTAUTH/user/message/subject/?id=${id}&user_type_id=${userTypeId}${bid}${mid}`;
};

export const generateUserMessageSubjectsEndpoint = ({
  id,
  userTypeId,
  page,
  page_direction,
  amountPerPage,
  subjectType,
  /** Filter on a specific user (thread) */
  filterUserId = undefined,
  filterUserTypeId = undefined,
  /** unused, may be used when search is added */
  searchFilter = undefined,
}: {
  id: number;
  userTypeId: UserRoleIDEnum;
  page: number;
  page_direction: InfiniteQueryPageDirections;
  amountPerPage: number;
  subjectType: 'past_bookings' | 'future_bookings' | 'inquiries';
  searchFilter?: string;
  filterUserId?: number;
  filterUserTypeId?: UserRoleIDEnum;
}): string => {
  const filterId = filterUserId !== undefined ? `&filter_user_id=${filterUserId}` : '';
  const filterTypeId = filterUserTypeId !== undefined ? `&filter_user_type_id=${filterUserTypeId}` : '';
  const search = searchFilter !== undefined ? `&search_filter=${searchFilter}` : '';

  return `/RESTAUTH/user/message/subjects/?id=${id}&user_type_id=${userTypeId}&page=${page}&page_direction=${page_direction}&amount_per_page=${amountPerPage}&subject_type=${subjectType}${filterId}${filterTypeId}${search}`;
};

export const generateUserMessageOverviewEndpoint = ({
  id,
  userTypeId,
  page,
  amountPerPage,
  propertyId = undefined,
}: {
  id: number;
  userTypeId: UserRoleIDEnum;
  page: number;
  amountPerPage: number;
  propertyId?: number;
}): string => {
  const optionalPropertyFilter = propertyId ? `&property_id=${propertyId}` : '';

  return `/RESTAUTH/user/message/overview/?id=${id}&user_type_id=${userTypeId}&page=${page}&amount_per_page=${amountPerPage}${optionalPropertyFilter}`;
};

export const generateUserMessageThreadEndpoint = ({
  id,
  userTypeId,
  page,
  amountPerPage,
  contactUserId,
  contactUserTypeId,
}: {
  id: number;
  userTypeId: UserRoleIDEnum;
  page: number;
  amountPerPage: number;
  contactUserId: number;
  contactUserTypeId: UserRoleIDEnum;
}): string => {
  return `/RESTAUTH/user/message/thread/?id=${id}&user_type_id=${userTypeId}&page=${page}&amount_per_page=${amountPerPage}&contact_user_id=${contactUserId}&contact_user_type_id=${contactUserTypeId}`;
};

export const userExpoTokenEndpoint = '/RESTAUTH/user/expopushtoken/';

export const generateUserCheckEmailTaken = (email: string): string => {
  return `/RESTAUTH/user/email/taken/?email=${email}`;
};
export const generateUserCheckEmailExists = (email: string): string => {
  return `/RESTAUTH/user/email/exists/?email=${email}`;
};
