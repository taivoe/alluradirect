import { UserMessage, UserMessageType, UserRoleIDEnum } from '../../../../../../api/user/types';

export const generateEditReservationMessage = ({
  guestId,
  propertyOwnerId,
  message,
  booking_id,
  start,
  end,
}: {
  guestId: number;
  propertyOwnerId: number;
  message: string;
  booking_id: number;
  start: string;
  end: string;
}): UserMessage => ({
  id: guestId,
  user_type_id: UserRoleIDEnum.guest,
  receiver_user_id: propertyOwnerId,
  receiver_user_type_id: UserRoleIDEnum.owner,
  message,
  message_type_id: UserMessageType.dateChange,
  booking_id,
  start,
  end,
});

export const generateCancelReservationMessage = ({
  guestId,
  propertyOwnerId,
  message,
  booking_id,
}: {
  guestId: number;
  propertyOwnerId: number;
  message: string;
  booking_id: number;
}): UserMessage => ({
  id: guestId,
  user_type_id: UserRoleIDEnum.guest,
  receiver_user_id: propertyOwnerId,
  receiver_user_type_id: UserRoleIDEnum.owner,
  message,
  message_type_id: UserMessageType.cancellation,
  booking_id,
});
