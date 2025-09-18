import { bookingQuoteEndpoint } from '../../../../../api/booking/endpoints';
import { CreateBookingBody, EditBookingBody, FullBooking } from '../../../../../api/booking/types';
import { APIKeyResponse } from '../../../../../api/types';
import { generateParamsString } from '../../../../../business/helpers/apiHelpers/apiHelpers';
import { queryKeyFactory } from '../../../queryKeyFactory';
import { useAppQuery } from '../../../useAppQuery/useAppQuery';

export type BookingQuoteResponse = APIKeyResponse<FullBooking, 'BOOKING'>;

export const generateBookingQuoteEndpoint = (
  quoteParams: CreateBookingBody | Pick<CreateBookingBody, 'ARRIVAL' | 'NIGHTS' | 'PROPERTY_ID'>,
) => {
  const endpoint = bookingQuoteEndpoint;
  const paramsString = generateParamsString(quoteParams);

  return `${endpoint}?${paramsString}`;
};

type CreateRateQuote = Pick<CreateBookingBody, 'ARRIVAL' | 'NIGHTS' | 'PROPERTY_ID'>;

type EditRateQuote = Pick<EditBookingBody, 'ARRIVAL' | 'NIGHTS' | 'PROPERTY_ID' | 'ID'>;

type QuoteParams = CreateBookingBody | EditBookingBody | CreateRateQuote | EditRateQuote;

type QuoteParamKeys = keyof QuoteParams;

// This query will typically fail if the min number of nights are not met. This results
// in 4 requests being made. The original and 3 retries. I have changed the retry value to
// only attempt once as we have a fall back to manually create the booking data

export const generateBookingQuoteQueryKeyDetail = (quoteParams: QuoteParams) => {
  const keys = Object.keys(quoteParams) as QuoteParamKeys[];
  // In order to produce a stable string for the queryKey detail, we need to sort the params that are being passed into the
  // queryKey. the sort function will produce a stable key
  const sortedKeys = keys.sort().reduce((accumulator, key) => {
    const value = quoteParams[key];
    return { ...accumulator, [key]: value };
  }, {});
  return bookingQuoteQueryKey.detail(JSON.stringify(sortedKeys));
};

export const bookingQuoteQueryKey = queryKeyFactory('booking-quote');

interface Args {
  quoteParams: QuoteParams;
  isEnabled: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
}

export const useBookingQuoteQuery = ({
  quoteParams,
  isEnabled,
  onSuccess = () => null,
  onError = () => null,
  onSettled = () => null,
}: Args) => {
  const url = generateBookingQuoteEndpoint(quoteParams);
  const queryKey = generateBookingQuoteQueryKeyDetail(quoteParams);

  return useAppQuery<BookingQuoteResponse>({
    endpoint: url,
    queryKey,
    enabled: isEnabled,
    staleTime: Infinity,
    onSuccess,
    onError,
    onSettled,
    hasToastsEnabled: true,
    retry: 1,
    useErrorBoundary: true,
  });
};
