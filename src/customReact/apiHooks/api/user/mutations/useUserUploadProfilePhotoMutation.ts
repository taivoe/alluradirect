import { ConfigurableAppMutationArgs, useAppMutation } from '../../../useAppMutation/useAppMutation';

import { FetchMethods } from '../../../types';
import { UserRoleIDEnum } from '../../../../../api/user/types';
import { userProfilePhotoEndpoint } from '../../../../../api/user/endpoints';

export interface UploadProfilePhotoSendValues {
  /** base64 version of the image being uploaded */
  file: string;
  id: number;
  user_type_id: UserRoleIDEnum;

  /** x axis point for crop; note if cropped then x,y,width,height,rotation are all required */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export const useUserUploadProfilePhotoMutation = (props: ConfigurableAppMutationArgs) => {
  return useAppMutation<UploadProfilePhotoSendValues>({
    method: FetchMethods.POST,
    url: userProfilePhotoEndpoint,
    ...props,
  });
};
