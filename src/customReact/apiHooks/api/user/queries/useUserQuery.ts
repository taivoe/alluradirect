import { APIResponse } from '../../../../../api/types';
import { userEndpoint } from '../../../../../api/user/endpoints';
import { User } from '../../../../../api/user/types';
import { ConfigurableAppQueryArgs, useAppQuery } from '../../../useAppQuery/useAppQuery';

export const userQueryKey = 'USER';

interface Args {
  /** Force Luccee to reload the user from the db
   * If a django endpoint modifies the user object then Luccee will not get the changes unless this is set to true
   */
  isReloadUser?: boolean;
}

/** This query will return the user object is the user is logged in.
 * It essentially will act as an auth_state query in addition to fetching the user object.
 */
export const useUserQuery = ({ isReloadUser = false, ...useQueryOptions }: Args & ConfigurableAppQueryArgs = {}) => {
  /** When using select, you need to pass in the Type of the select value.
   * Using the API response type will not work.
   *
   * The return value is actually a user object or an empty object. However it
   * appears that the return signature for useAppQuery is incorrect since we cannot override the
   * return type from the select function.
   *
   * The actual response is USER:User | {}  */

  const endpoint = isReloadUser ? `${userEndpoint}?is_reload_user=${isReloadUser}` : userEndpoint;

  return useAppQuery<APIResponse<{ USER: User | false }>>({
    endpoint,
    queryKey: userQueryKey,
    // Typing is still wrong here, I need to be able to type the actual response from the server
    // and then manipulate it. I cannot use USER: User | {} without throwing a TS error.
    select: (data: APIResponse<{ USER: User }>) => {
      const isLoggedIn = Object.keys(data.DATA.USER).length > 0;
      return {
        ...data,
        DATA: {
          USER: isLoggedIn ? data.DATA.USER : false,
        },
      };
    },
    ...useQueryOptions,
  });
};
