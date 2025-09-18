import { UserMessageProperty, UserMessageSubject, UserRoleIDEnum } from '../../api/user/types';
import { useEffect, useState } from 'react';

import { CreateMessageSubject } from './types';
import { generateCreateMessageSubject } from './helpers';
import { useUserMessageSubject } from '../apiHooks/api/user/queries/useUserMessageSubject';

interface Args {
  userId: number;
  userTypeId: UserRoleIDEnum;
  hasCurrentSubjectSelection: boolean;

  bookingId?: number;
  messageId?: number;
}

/** Fetch and set the selected subject and property based on the param passed in
 *  selectedSubject and selectedProperty will be auto-selected when sending a message for convenience
 */
export const useMessageSubject = ({ userId, userTypeId, hasCurrentSubjectSelection, bookingId, messageId }: Args) => {
  const subjectQuery = useUserMessageSubject({
    bookingId,
    messageId,
    userId,
    userTypeId,
    enabled: hasCurrentSubjectSelection,
  });
  const subject: UserMessageSubject | undefined = subjectQuery.data?.DATA?.SUBJECT;
  const createMessageSubject = generateCreateMessageSubject(subject);

  const [selectedSubject, setSelectedSubject] = useState<CreateMessageSubject | undefined>(createMessageSubject);
  const [selectedProperty, setSelectedProperty] = useState<UserMessageProperty | undefined>(subject?.PROPERTY);

  useEffect(() => {
    if (subject && !selectedSubject) {
      const createMessageSubject = generateCreateMessageSubject(subject);
      setSelectedSubject(createMessageSubject);
    }
    if (subject && !selectedProperty) {
      setSelectedProperty(subject.PROPERTY);
    }
  }, [selectedProperty, selectedSubject, subject]);

  return {
    subjectQuery,
    selectedSubject,
    setSelectedSubject,
    selectedProperty,
    setSelectedProperty,
  };
};
