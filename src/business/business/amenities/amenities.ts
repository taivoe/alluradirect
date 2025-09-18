import { Amenity, NameIdItem, PropertyAmenityId } from '../../../api/types';

import { Property } from '../../../api/property/types';
import { PropertyAmenityCategories } from './amenitiesTypes';
import { handleStripHTML } from '../../helpers/stringHelpers';

interface Args {
  property: Property;
  formAmenity: NameIdItem;
  section: PropertyAmenityCategories;
}

/** Check if a formInputs amenity is enabled (exists) in the property object */
export function propertyHasAmenity({ property, formAmenity, section }: Args): boolean {
  const amenity = getPropertyAmenity({ property, formAmenity, section });

  return amenity !== undefined;
}

export function getPropertyAmenity({ property, formAmenity, section }: Args): Amenity | undefined {
  const amenitySection: Amenity[] = property.AMENITIES[section].LIST;
  const amenity = amenitySection.find(({ ID }) => ID === formAmenity.ID);

  return amenity;
}

export function amenityHasInstructions(amenity: Amenity): boolean {
  return handleStripHTML(amenity.INSTRUCTIONS).length > 0;
}

export function amenityHasDescription(amenity: Amenity): boolean {
  return amenity.DESCRIPTION.length > 0;
}

export function isWifiAmenity(amenityId: number): boolean {
  return amenityId === PropertyAmenityId.WIFI;
}

export function amenityHasAccessCode(amenityId: number): boolean {
  const accessCodeAmenities = [
    // Hot tub and pool are synced
    PropertyAmenityId.BUILDING_HOT_TUB,
    PropertyAmenityId.BUILDING_POOL,
    // Sauna and Steam Room are synced
    PropertyAmenityId.BUILDING_SAUNA,
    PropertyAmenityId.BUILDING_STEAM_ROOM,

    PropertyAmenityId.BUILDING_BIKE_STORAGE,
    PropertyAmenityId.BUILDING_SKI_STORAGE,
    PropertyAmenityId.BUILDING_FITNESS_FACILITIES,
    PropertyAmenityId.BUILDING_GAMES_REC_ROOM,

    PropertyAmenityId.WIFI,
  ];

  return Boolean(amenityId) && !isWifiAmenity(amenityId) && accessCodeAmenities.includes(amenityId);
}

interface GenerateAmenityArgs {
  ID: number;
  NAME: string;
  INSTRUCTIONS: string;
  DESCRIPTION: string;
  PROPERTY_AMENITY_ID?: number;

  ACCESS_CODE?: string;
  INTERNET_NETWORK_NAME?: string;
  INTERNET_PASSWORD?: string;
}

export function generateAmenity({
  ID,
  NAME,
  INSTRUCTIONS,
  DESCRIPTION,
  // 0 indicates that the property amenity is not enabled
  PROPERTY_AMENITY_ID = 0,
  ACCESS_CODE = '',
  INTERNET_NETWORK_NAME = '',
  INTERNET_PASSWORD = '',
}: GenerateAmenityArgs): Amenity {
  return {
    ID,
    NAME,
    INSTRUCTIONS,
    DESCRIPTION,
    PROPERTY_AMENITY_ID,
    ACCESS_CODE,
    INTERNET_NETWORK_NAME,
    INTERNET_PASSWORD,
  };
}
