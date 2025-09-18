const liveStripeKey = 'pk_uQSZwcGigNoQIy236gJGWniMQxM6R';
const developmentStripeKey = 'pk_o7mAMTN418iNKpWeG6tx7wfQryOOm';

interface Args {
  isLive: boolean;
}

export const getStripeToken = ({ isLive }: Args): string => {
  return isLive ? liveStripeKey : developmentStripeKey;
};
