interface BaseArgs {
  queryKey: string | any[];
  // Function that will generate the endpoint to fetch given the pageParam
  urlFn: (pageParam: number) => string;
  initialPageParam: number;
  amountPerPage: number;

  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number | false;
  staleTime?: number;
  cacheTime?: number;
  useErrorBoundary?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any, variables?: any, context?: void) => void;
  onSettled?: (data: any, error?: unknown) => void;
}

interface NextPageArgs extends BaseArgs {
  /** Returns initialPageParam if lastPage is undefined,
   *
   * Returns undefined if last page had less than total expected amountPerPage (ran out of data to query),
   *
   * Returns pages.length + 1 otherwise (or equivalent next page value)
   * */
  nextPageFn: (lastPage: any, pages: any[]) => number | undefined;
}

interface DefaultNextPageArgs extends BaseArgs {
  nextPageKey: string;
  defaultSelect?: boolean;
}

export type AppInfiniteQueryArgs = NextPageArgs | DefaultNextPageArgs;

export type ConfigurableAppInfiniteQueryArgs = Omit<
  AppInfiniteQueryArgs,
  'nextPageFn' | 'nextPageKey' | 'defaultSelect' | 'queryKey' | 'urlFn' | 'initialPageParam' | 'amountPerPage'
>;

export type PageDirection = 'past' | 'future' | 'all';
