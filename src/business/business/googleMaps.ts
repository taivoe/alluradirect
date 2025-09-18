import { developmentMapsKey, liveMapsKey } from '../config/maps';

import { Address } from '../../api/types';

// Google maps

interface GetMapsKeyArgs {
  isLive: boolean;
}

export const getMapsKey = ({ isLive }: GetMapsKeyArgs): string => {
  return isLive ? liveMapsKey : developmentMapsKey;
};

const BASE_MAPS_URL = 'https://maps.google.com/';
const MAPS_EMBED_URL_V1 = 'https://www.google.com/maps/embed/v1/';

export function generateMapsAddressURL(address: Address): string {
  const query = generateQueryFromAddress(address);

  return `${BASE_MAPS_URL}?q=${query}&libraries=places`;
}

interface Args {
  address: Address;
  isLive: boolean;
}
export function generateMapsEmbedAddressURL({ address, isLive }: Args): string {
  const type = 'place';
  const key = getMapsKey({ isLive });
  const query = generateQueryFromAddress(address);

  return `${MAPS_EMBED_URL_V1}${type}?key=${key}&q=${query}`;
}

/**
 * google recommends formatting queries in the format suggested by the local region.
 * Since alluraDirect currently operates out of Canada we should use the Canadian postal code format
 * The following code follows the postal code format + the address result obtained from sample google maps queries
 *
 * https://www.canadapost-postescanada.ca/cpc/en/support/kb/addressing/accuracy/addressing-mail-accurately
 * https://developers.google.com/maps/faq#geocoder_queryformat
 */
export function generateQueryFromAddress({
  STREET_NUMBER,
  STREET_NAME,
  CITY,
  REGION,
  POSTAL,
}: Pick<Address, 'STREET_NUMBER' | 'STREET_NAME' | 'CITY' | 'REGION' | 'POSTAL'>): string {
  const formattedAddress = `${STREET_NUMBER} ${STREET_NAME}, ${CITY}, ${REGION} ${POSTAL}`;
  const query = encodeURIComponent(formattedAddress);

  return query;
}
