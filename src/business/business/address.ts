import { capitalize } from '../helpers/stringHelpers';

interface Args {
  STREET_NUMBER: number | string;
  STREET_NAME: string;
  POSTAL: string;
  CITY: string;
  COUNTRY: string;
}

export function generateReadableAddress(address: Args): string {
  return `${address.STREET_NUMBER} ${capitalize(address.STREET_NAME)}, ${address.POSTAL?.toUpperCase()}, ${capitalize(
    address.CITY,
  )}, ${address.COUNTRY}`;
}
