export interface RequestInfo {
  url: string;
  method: string;
  responseCode?: number;
  dataType?: string;
  dataReceived?: any;
}

export type OptionalRequestInfo = Partial<RequestInfo>;
