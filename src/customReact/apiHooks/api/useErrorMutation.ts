import { errorsEndPoint } from '../../../api/endpoints';
import { useAppMutation } from '../useAppMutation/useAppMutation';

interface Values {
  client_ip: number;
  user_id: number;
  user_type_id: number;
  stack_trace: string;
  message: string;
}

export const useErrorMutation = () => {
  return useAppMutation<Values>({
    method: 'POST',
    url: errorsEndPoint,
    hasToastsEnabled: false,
  });
};
