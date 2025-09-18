import { UserMessageContactArgs } from '../../api/user/endpoints';
import { MessageUserContact } from '../../api/user/types';

import { useUserMessageContactQuery } from '../apiHooks/api/user/queries/useUserMessageContactQuery';


export const useMessageContact = ({ propertyId, contactUserId, contactUserTypeId }: UserMessageContactArgs) => {
  const userContactQuery = useUserMessageContactQuery({ propertyId, contactUserId, contactUserTypeId});
  const userContact: MessageUserContact | undefined = userContactQuery.data
    ? (userContactQuery.data.DATA as MessageUserContact)
    : undefined;

  return {
    userContactQuery,
    userContact,
  };
};
