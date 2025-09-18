import { OptionalRequestInfo, RequestInfo } from './types';

import { simplifyData } from './helpers';

/** This class is a singleton, only one instance can exist in the entire application */
export class RequestTracking {
  maxLen: number;
  requests: RequestInfo[];
  static _instance: RequestTracking;

  constructor(maxLen: number) {
    this.maxLen = maxLen;
    this.requests = [];

    if (RequestTracking._instance) {
      return RequestTracking._instance;
    }
    RequestTracking._instance = this;
  }

  push(request: RequestInfo): void {
    this.requests.push(request);
    if (this.requests.length > this.maxLen) {
      this.requests.shift();
    }
  }

  update(url: string, request: OptionalRequestInfo): void {
    request.dataReceived = simplifyData(request.dataReceived);
    const match = this.requests.find(req => req.url === url);
    if (match === undefined) return;

    Object.keys(request).forEach(key => {
      match[key as keyof RequestInfo] = request[key as keyof RequestInfo];
    });
  }

  getFormattedRequests(): string {
    if (this.requests.length === 0) {
      return '';
    }

    // reverse the requests to display the last request first
    const reversedRequests = this.requests.reverse();

    const formattedRequests = reversedRequests.map(request => {
      return `url: ${request.url},<br/>method: ${request.method},<br/>responseCode: ${
        request?.responseCode
      },<br/><br/>dataReceived: ${JSON.stringify(request?.dataReceived)}<br/>`;
    });

    return formattedRequests.join('<br/><br/>');
  }
}

export const MAX_REQUESTS_TRACKED = 5;
export const requestTracking = new RequestTracking(MAX_REQUESTS_TRACKED);
