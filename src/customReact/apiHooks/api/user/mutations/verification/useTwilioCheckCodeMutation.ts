import { twilioSendCodeEndpointCheck } from '../../../../../../api/user/endpoints';
import { UserRoleIDEnum } from '../../../../../../api/user/types';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../../useAppMutation/useAppMutation';
import { TwilioVerificationChannelEnum } from './types';

export interface TwilioCheckCodeMutationArgs {
  value: string;
  code: string;
  channel: TwilioVerificationChannelEnum;
  auto_login_user?: boolean;
}

export interface TwilioCheckCodeCreateAccountValues extends TwilioCheckCodeMutationArgs {
  /**  Only required if creating a new account */
  first_name: string;
  /**  Only required if creating a new account */
  last_name: string;
  /**  Only required if creating a new account */
  password: string;
  /**  guest account created by default, can specify to create a host account */
  user_type_id?: UserRoleIDEnum;
}

export type TwilioCheckCodeSendValues = TwilioCheckCodeMutationArgs | TwilioCheckCodeCreateAccountValues;

/** Can be used if user is authenticated or unauthenticated */
export const useTwilioCheckCodeMutation = (args: ConfigurableAppMutationArgs = {}) => {
  return useAppMutation<TwilioCheckCodeSendValues>({
    url: twilioSendCodeEndpointCheck,
    method: 'POST',
    ...args,
  });
};
