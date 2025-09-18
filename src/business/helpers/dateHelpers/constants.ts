import dayjs from 'dayjs';

export const startOfYear = new Date(new Date().getFullYear(), 0, 1);
export const oneYearInFuture = dayjs().add(1, 'year').toDate();
