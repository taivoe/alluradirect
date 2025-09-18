export const generateCreditsOverviewEndpoint = (userId: number) => {
  return `/dj/v1/credits/overview/?user_id=${userId}`;
};
