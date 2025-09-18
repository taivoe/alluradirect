import {
  COHOST_PROFILE,
  GUEST_OWNER_LOGIN,
  GUEST_PROFILE,
  MESSAGE_CONTACT,
  MESSAGE_PROPERTY,
  MESSAGE_THREAD,
  MESSAGE_UNREAD_COUNT,
  OWNER_PROFILE,
  PROPERTY_MANAGER_PROFILE,
  USER,
  USER_LOGIN,
  USER_MESSAGE_OVERVIEW,
  USER_MESSAGE_SUBJECT,
} from './constants';

// Full api responses
export type UserLogin = typeof USER_LOGIN;
export type GuestOwnerLogin = typeof GUEST_OWNER_LOGIN;

export type UserMessageOverview = typeof USER_MESSAGE_OVERVIEW;
export type UserMessageSubject = typeof USER_MESSAGE_SUBJECT;
export type MessageThreadItem = typeof MESSAGE_THREAD;
export type MessageUnreadCount = typeof MESSAGE_UNREAD_COUNT;
export interface MessageUserContact {
  CONTACT: User;
}

export type UserMessageContact = typeof MESSAGE_CONTACT;
export type UserMessageProperty = typeof MESSAGE_PROPERTY;

// Other Api Types

/** The allura user is now the root user for all DB operations.
 * Previously, there were separate owner, property manager and guest db tables, but in April of 2022 the decision
 * was made to only have one user type which can have multiple roles.
 */
export type User = typeof USER & {
  OWNER_PROFILE?: typeof OWNER_PROFILE;
  GUEST_PROFILE?: typeof GUEST_PROFILE;
  COHOST_PROFILE?: typeof COHOST_PROFILE;
  PROPERTY_MANAGER_PROFILE?: typeof PROPERTY_MANAGER_PROFILE;
};

export enum UserRoleIDEnum {
  allura = 1,
  owner = 2,
  guest = 3,

  propertyContact = 5,
}

export enum UserTypeEnum {
  GUEST = 'GUEST',
  OWNER = 'OWNER',
  USER = 'USER',
}

export enum UserMessageType {
  generalInquiry = 1,
  dateChange = 2,
  cancellation = 3,
  booking = 4,
  property = 5,
  alluraInquiry = 6,
}

/** Base data expected when creating a user message */
interface BaseUserMessage {
  /** id of user sending the message */
  id: number;
  /** type of user sending the message */
  user_type_id: UserRoleIDEnum;
  /** id of the user receiving the message. send 0 if receiver_user_type_id is allura[1] */
  receiver_user_id: number;
  /** type of user receiving the message */
  receiver_user_type_id: UserRoleIDEnum;
  /** the actual message contents */
  message: string;
}

/** Use when a user needs to contact allura about help/support/other issue */
interface AlluraInquiryUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.alluraInquiry;
}

/** Use this when a user is communicating to alluradirect */
interface GeneralInquiryUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.generalInquiry;
  inquiry_id: number;
}

/** User makes a message about a property.
 *  This is like a general inquiry except it is about a specific property  */
interface PropertyUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.property;
  property_id: number;
  inquiry_id: number;
}

/** User makes a message about a specific booking */
interface BookingUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.booking;
  booking_id: number;
}

/** User requests to change booking dates */
interface DateChangeUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.dateChange;
  booking_id: number;
  start: string;
  end: string;
}

/** User requests to cancel a booking */
interface CancellationUserMessage extends BaseUserMessage {
  message_type_id: UserMessageType.cancellation;
  booking_id: number;
}

// /** Data expected when creating a user message */
export type UserMessage =
  | GeneralInquiryUserMessage
  | DateChangeUserMessage
  | CancellationUserMessage
  | BookingUserMessage
  | PropertyUserMessage
  | AlluraInquiryUserMessage;
