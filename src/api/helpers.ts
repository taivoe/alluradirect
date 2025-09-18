import { APIResponse } from './types';

export function generateAPIResponse<T>(data: T): APIResponse<T> {
  return {
    DATA: data,
    ERRORS: { CLIENT_MESSAGE: '', DEVELOPER_MESSAGE: '' },
    MESSAGES: { CLIENT_MESSAGE: '', DEVELOPER_MESSAGE: '' },
    SUCCESS: true,
  };
}
