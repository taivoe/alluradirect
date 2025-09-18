import * as BookingEndpoints from '../booking/endpoints';
import * as CreditEndpoints from '../credits/endpoints';
import * as GuestEndpoints from '../guest/endpoints';
import * as OwnerEndpoints from '../owner/endpoints';
import * as PropertyEndpoints from '../property/endpoints';
import * as UserEndpoints from '../user/endpoints';
import * as Endpoints from '../endpoints';

describe('all endpoints end with a trailing slash /', () => {
  const testableEndpoints = [
    BookingEndpoints,
    CreditEndpoints,
    GuestEndpoints,
    OwnerEndpoints,
    PropertyEndpoints,
    UserEndpoints,
    Endpoints,
  ];

  testableEndpoints.forEach((endpointSet: any) => {
    Object.keys(endpointSet as any).forEach((key: string) => {
      const value = (endpointSet as any)[key];
      it(`Accepts ${value}`, () => {
        if (typeof value === 'string') {
          if (value.length === 0) return;

          let lastOccuranceIndex = 0;
          for (let i = 0; i < value.length; i++) {
            if (value[i] === '/') lastOccuranceIndex = i;
          }

          const isLastOccuranceIndexAtEnd = lastOccuranceIndex === value.length - 1;

          let isLastOccurranceBeforeQueryParams = false;
          if (!isLastOccuranceIndexAtEnd) {
            const charAfterLastOccurance = value[lastOccuranceIndex + 1];
            if (charAfterLastOccurance === '?') {
              isLastOccurranceBeforeQueryParams = true;
            }
          }

          expect(isLastOccuranceIndexAtEnd || isLastOccurranceBeforeQueryParams).toBe(true);
        }
      });
    });
  });
});
