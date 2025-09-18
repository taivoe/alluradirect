import { ConfigurableAppInfiniteQueryArgs } from '../../../useAppInfiniteQuery/types';
import { InfiniteQueryPageDirections } from '../../../../../api/types';
import { generateReviewsEndPoint } from '../../../../../api/property/endpoints';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppInfiniteQuery } from '../../../useAppInfiniteQuery/useAppInfiniteQuery';

interface Args {
  propertyId: number;
  pageDirection?: InfiniteQueryPageDirections;
  amountPerPage?: number;
  initialPageParam?: number;
}

export const propertyReviewsInfiniteQueryKey = queryKeyFactory('PROPERTY_REVIEWS_INFINTE_QUERY');

export const usePropertyReviewsInfiniteQuery = ({
  propertyId,
  pageDirection = 'past',
  amountPerPage = 10,
  initialPageParam = 1,
  ...rest
}: Args & ConfigurableAppInfiniteQueryArgs) => {
  function urlFunction(page: number) {
    return generateReviewsEndPoint({
      propertyId,
      page,
      pageDirection,
      amountPerPage,
    });
  }

  const queryKey = propertyReviewsInfiniteQueryKey.detail(
    `${propertyId}${pageDirection}${amountPerPage}${initialPageParam}`,
  );

  return useAppInfiniteQuery({
    queryKey,
    urlFn: urlFunction,
    nextPageKey: 'REVIEWS',
    amountPerPage,
    initialPageParam,
    ...rest,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.DATA.REVIEWS.length === amountPerPage ? pages.length + 1 : undefined;
    },
  });
};
