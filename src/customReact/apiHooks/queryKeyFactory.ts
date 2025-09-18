// Source: https://tkdodo.eu/blog/effective-react-query-keys

export interface QueryKeys {
  all: [string];
  lists: () => [string, 'list'];
  list: (filters: string) => [string, 'list', { [key: string]: string }];
  details: () => [string, 'detail'];
  detail: (id: string) => [string, 'detail', string];
}

export function queryKeyFactory(keyName: string): QueryKeys {
  const queryKeys: QueryKeys = {
    all: [keyName],
    lists: () => [...queryKeys.all, 'list'],
    list: (filters: string) => [...queryKeys.lists(), { filters }],
    details: () => [...queryKeys.all, 'detail'],
    detail: (id: string) => [...queryKeys.details(), id],
  };

  return queryKeys;
}
