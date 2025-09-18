import { LocationURLParamsEnum } from './types';
import { UserRoleIDEnum } from './user/types';

// @ts-ignore
export const defaultLocationURLParams = Object.keys(LocationURLParamsEnum).map(param => LocationURLParamsEnum[param]);

export const generateOwnerLocationEndPoint = (requirements: LocationURLParamsEnum[] = defaultLocationURLParams) =>
  `/RESTAUTH/location/?categories=${requirements}`;

export const generateGuestLocationEndPoint = (
  userId: number,
  requirements: LocationURLParamsEnum[] = defaultLocationURLParams,
) => `/RESTAUTH/guest/location/?categories=${requirements}&ID=${userId}`;

export const errorsEndPoint = `/RESTAUTH/error/`;

// TODO: type this better
export const generateCancellationPolicyEndpoint = ({
  policy_id,
  is_credit_only_refund,
  is_refund_rebooked_dates,
  is_special_circumstance,
  special_circumstance_id,
  special_circumstance_description,
  admin_penalty,
  admin_penalty_unit,
}: {
  policy_id: any;
  is_credit_only_refund: any;
  is_refund_rebooked_dates: any;
  is_special_circumstance: any;
  special_circumstance_id: any;
  special_circumstance_description: string;
  admin_penalty: any;
  admin_penalty_unit: any;
}) => {
  const searchParams = new URLSearchParams({
    policy_id,
    is_credit_only_refund,
    is_refund_rebooked_dates,
    is_special_circumstance,
    special_circumstance_id,
    special_circumstance_description,
    admin_penalty,
    admin_penalty_unit,
  });

  return `/RESTAUTH/cancellationpolicy/generate/?${searchParams.toString()}`;
};

export const generateTermsOfServiceAgreementEndpoint = (userTypeId: UserRoleIDEnum) =>
  `/RESTAUTH/tossa/?user_type_id=${userTypeId}`;
