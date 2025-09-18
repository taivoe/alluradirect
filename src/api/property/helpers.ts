import { TransactionsOrReservationsServerSearchTool } from './types';

export const generatePropertyTransactionsParameters = (
  propertyId: number,
  { startDate, endDate, status, sort, source }: TransactionsOrReservationsServerSearchTool,
) => {
  return `?start=${startDate}&end=${endDate}&status=${status}&filter_by=${sort}&source=${source}&id=${propertyId}`;
};
