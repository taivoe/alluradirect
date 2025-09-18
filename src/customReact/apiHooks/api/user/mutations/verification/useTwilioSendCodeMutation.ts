import { twilioSendCodeEndpoint } from '../../../../../../api/user/endpoints';
import { ConfigurableAppMutationArgs, useAppMutation } from '../../../../useAppMutation/useAppMutation';
import { TwilioVerificationChannelEnum } from './types';

interface SendValues {
  value: string;
  channel: TwilioVerificationChannelEnum;
}

/** Can be used if user is authenticated or unauthenticated */
export const useTwilioSendCodeMutation = (args: ConfigurableAppMutationArgs = {}) =>
  useAppMutation<SendValues>({
    url: twilioSendCodeEndpoint,
    method: 'POST',
    ...args,
  });
