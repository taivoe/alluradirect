import { MAX_REQUESTS_TRACKED, RequestTracking, requestTracking } from './requestTracking';

it('is a singleton', () => {
  const tracking1 = new RequestTracking(MAX_REQUESTS_TRACKED);
  expect(tracking1).toEqual(requestTracking);
});

describe('the push method works', () => {
  it('can add a request', () => {
    requestTracking.requests = [];

    const testUrl = 'test';
    requestTracking.push({ url: 'test', method: 'get' });

    expect(requestTracking.requests.length).toEqual(1);
    expect(requestTracking.requests[0].url).toEqual(testUrl);
  });

  it(`holds only ${MAX_REQUESTS_TRACKED} requests at a time`, () => {
    requestTracking.requests = [];

    const request1 = { url: 'test1', method: 'get' };
    const request2 = { url: 'test2', method: 'get' };
    const request3 = { url: 'test3', method: 'get' };
    const request4 = { url: 'test4', method: 'get' };
    const request5 = { url: 'test5', method: 'get' };
    const request6 = { url: 'test6', method: 'get' };

    requestTracking.push(request1);
    requestTracking.push(request2);
    requestTracking.push(request3);
    requestTracking.push(request4);
    requestTracking.push(request5);

    expect(requestTracking.requests.length).toEqual(5);
    expect(requestTracking.requests[0].url).toEqual('test1');
    expect(requestTracking.requests[requestTracking.requests.length - 1].url).toEqual('test5');

    requestTracking.push(request6);

    expect(requestTracking.requests.length).toEqual(5);
    expect(requestTracking.requests[0].url).toEqual('test2');
  });
});

describe('the update method works', () => {
  it('can update a request', () => {
    requestTracking.requests = [];

    const requestUrl = 'test';
    const request = { url: requestUrl, method: 'get' };

    requestTracking.push(request);

    expect(requestTracking.requests[0].responseCode).toEqual(undefined);

    const errorResponseCode = 500;
    requestTracking.update(requestUrl, { responseCode: errorResponseCode });

    expect(requestTracking.requests[0].responseCode).toEqual(errorResponseCode);
  });
});
