import { CreditStatusEnum, CreditReasonGivenEnum } from './types';

export const CREDITS_OVERVIEW = {
  total_credits: '0.00',
  pending_credits: '0.00',
  remaining_credits: '0.00',
  credit_expiry_date: 'yyyy-mm-dd',
  refer_guest_link: 'https://staging.alluradirect.com/refer/guest/0/',
  refer_owner_link: 'https://staging.alluradirect.com/refer/owner/0/',
  offer_amounts: {
    user_referred_owner: '0.00',
    user_referred_guest: '0.00',
    guest_referred_by_user: '0.00',
    owner_referred_by_user: '0.00',
  },
  credit_history: [
    {
      id: 0,
      amount_total: '0.00',
      amount_remaining: '0.00',
      sender: {
        id: 0,
        first_name: '',
        last_name: '',
        company_name: '',
        is_company: false,
        email: '',
      },
      status: {
        status: '',
        id: 0 as CreditStatusEnum,
      },
      reason_given: {
        reason: '',
        id: 0 as CreditReasonGivenEnum,
      },
      detail: '',
      expiry_date: 'yyyy-mm-dd',
      created_at: 'yyyy-mm-dd',
    },
  ],
};
