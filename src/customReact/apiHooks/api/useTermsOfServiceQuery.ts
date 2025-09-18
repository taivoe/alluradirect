import { generateTermsOfServiceAgreementEndpoint } from '../../../api/endpoints';
import { APIResponse } from '../../../api/types';
import { UserRoleIDEnum } from '../../../api/user/types';
import { ConfigurableAppQueryArgs, useAppQuery } from '../useAppQuery/useAppQuery';

interface Args {
  userTypeId: UserRoleIDEnum;
}

/** Returns html Terms of service agreement for guests or hosts */
export const useTermsOfServiceQuery = ({ userTypeId, ...rest }: Args & ConfigurableAppQueryArgs) => {
  return useAppQuery<APIResponse<{ TOSSA: string }>>({
    endpoint: generateTermsOfServiceAgreementEndpoint(userTypeId),
    ...rest,
  });
};
