export function simplifyData(data: any) {
  if (!data) return undefined;

  const { SUCCESS, DATA, MESSAGE } = data;

  const simplifiedData = DATA ? 'Received Data' : 'No Data';

  return {
    SUCCESS,
    DATA: simplifiedData,
    MESSAGE,
  };
}
