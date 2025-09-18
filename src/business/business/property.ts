import {
  BookingGateWayModeIdEnum,
  JoinStatusIDEnum,
  Property,
  PropertySubscriptionTierIdEnum,
} from '../../api/property/types';

import { ResortIdEnum } from '../../api/ownerFormInputs/types';
import { hasContent } from '../helpers/stringHelpers';

// Which property statuses link to which section
/** A property can access the dashboard if the Listing is Active, or if they have gone from Active to inactive.
 * An inactive property status is not possible without completing onboarding.
 * A deactivation requested property can still access dashboard (Jira: REMDASH-3934)
 */
export const dashboardLinkStatuses = [
  JoinStatusIDEnum.ListingActive,
  JoinStatusIDEnum.ListingInactive,
  JoinStatusIDEnum.DeactivationRequested,
];

export const onboardingLinkStatuses = [
  JoinStatusIDEnum.NotStarted,
  JoinStatusIDEnum.InProgress,
  JoinStatusIDEnum.FormsCompleted,
  JoinStatusIDEnum.ActivationRequested,
  JoinStatusIDEnum.AskedForMoreInformation,
  JoinStatusIDEnum.SetUpInProgress,
];

// When a Property Is Gateway Open, it means that anyone can book the property at any time
// Whe a Property is Gateway Closed, it means that the owner needs to approve the reservation
export const calculateIsGatewayOpen = (propertyGatewayModeId: BookingGateWayModeIdEnum) =>
  propertyGatewayModeId === BookingGateWayModeIdEnum.open;

// A premium property costs a yearly fee and has no commission charges on each booking
export const calculateIsPremium = (subscriptionTierId: PropertySubscriptionTierIdEnum) =>
  subscriptionTierId === PropertySubscriptionTierIdEnum.PREMIUM;
export const calculateIsStandard = (subscriptionTierId: PropertySubscriptionTierIdEnum) =>
  subscriptionTierId === PropertySubscriptionTierIdEnum.STANDARD;

// Property is active and appears in search results
export const calculateIsActive = (joinStatusId: JoinStatusIDEnum) => joinStatusId === JoinStatusIDEnum.ListingActive;
export const calculateIsDisabled = (joinStatusId: JoinStatusIDEnum) =>
  joinStatusId === JoinStatusIDEnum.ListingDisabled;
export const calculateIsInactive = (joinStatusId: JoinStatusIDEnum) =>
  joinStatusId === JoinStatusIDEnum.ListingInactive;

// Property is awaiting manual activation by alluraDirect team
export const calculateIsRequestActivation = (joinStatusId: JoinStatusIDEnum) =>
  joinStatusId === JoinStatusIDEnum.ActivationRequested;

// Properties only have the option to upgrade to premium once they are active
export const calculateCanUpgradeToPremium = (joinStatusId: JoinStatusIDEnum) => {
  return joinStatusId === JoinStatusIDEnum.ListingActive;
};
// This setting determines if a property is migrating from old allura to new allura
export const calculateIsMigrating = (joinStatusId: JoinStatusIDEnum) => {
  return joinStatusId === JoinStatusIDEnum.SetUpInProgress;
};

export const calculateIsComplete = (completionPercentage: number) => {
  return completionPercentage === 100;
};

// The only time a property cannot deactivate is when a deactivation is already requested
export const calculateCanDeactivate = (joinStatusId: JoinStatusIDEnum): boolean => {
  return joinStatusId !== JoinStatusIDEnum.DeactivationRequested;
};

interface PropertyTitle {
  DEVELOPMENT: string;
  UNIT: string;
  STREET_NUMBER: string;
  STREET_NAME: string;
}
export const defaultPropertyTitle = '--';
export function generatePropertyTitle(info: PropertyTitle): string {
  const { DEVELOPMENT, UNIT, STREET_NUMBER, STREET_NAME } = info;

  const hasDevelopment = hasContent(DEVELOPMENT);
  const noLocationInfo = !hasContent(STREET_NUMBER) || !hasContent(STREET_NAME);

  if (!hasDevelopment) {
    return defaultPropertyTitle;
  }

  if (isChaletOrHouse(DEVELOPMENT)) {
    if (noLocationInfo) {
      return defaultPropertyTitle;
    }

    return generateStreetNumberNameTitle(STREET_NUMBER, STREET_NAME);
  }

  return generateDevelopmentUnitTitle(DEVELOPMENT, UNIT);
}

interface PropertySubtitleArgs {
  propertyId: number;
  numBedrooms: number;
  numBathrooms: number;
}
export function generatePropertySubtitle({ propertyId, numBedrooms, numBathrooms }: PropertySubtitleArgs): string {
  return `(#${propertyId}) - ${bedroomBathroomDisplay(numBedrooms, numBathrooms)}`;
}

export const chaletOrHouse = 'Chalet/House';
function isChaletOrHouse(development: string): boolean {
  return development?.toLowerCase() === chaletOrHouse.toLowerCase();
}

export function generateStreetNumberNameTitle(streetNumber: string, streetName: string): string {
  return `${streetNumber} ${streetName}`;
}

export function generateDevelopmentUnitTitle(development: string, unit: string): string {
  const hasUnit = hasContent(unit);
  const unitTitle = hasUnit ? ` ${calculatePropertyUnitNumberDisplay(unit)}` : '';

  return `${development}${unitTitle}`;
}

export function bedroomBathroomDisplay(bedrooms: number, bathrooms: number): string {
  const hasMultipleBedrooms = bedrooms > 1;
  const hasMultipleBathrooms = bathrooms > 1;

  return `${bedrooms} Bedroom${hasMultipleBedrooms ? 's' : ''} / ${bathrooms} Bathroom${hasMultipleBathrooms ? 's' : ''
    }`;
}

export function calculatePropertyUnitNumberDisplay(unitNumber: string) {
  if (unitNumber.length === 0) return '';

  const firstChar = unitNumber[0];

  if (firstChar === '#' || Number.isNaN(parseInt(unitNumber))) {
    return unitNumber;
  }

  return `#${unitNumber}`;
}

export function calculateCanSignIn(joinStatusId: JoinStatusIDEnum, hasCompletedOnboarding: boolean): boolean {
  if (dashboardLinkStatuses.includes(joinStatusId) || onboardingLinkStatuses.includes(joinStatusId)) {
    return true;
  }

  // allow owner to access dashboard, get reports and info before property is deactivated
  if (joinStatusId === JoinStatusIDEnum.DeactivationRequested && hasCompletedOnboarding) {
    return true;
  }

  return false;
}
/** #1585 -Aspens #120 */
export const generatePropertyString = ({
  propertyId,
  propertyDevelopment,
  propertyUnit,
}: {
  propertyId: number;
  propertyDevelopment: string;
  propertyUnit: string;
}) => `#${propertyId} -${propertyDevelopment} #${propertyUnit}`;

export function isPropertyInWhistler({ resortId }: { resortId: ResortIdEnum }): boolean {
  return resortId === ResortIdEnum.Whistler;
}

export function isPropertyInBigWhite({ resortId }: { resortId: ResortIdEnum }): boolean {
  return resortId === ResortIdEnum.BigWhite;
}

export function hasPropertyContact(property: Property): boolean {
  const propertyContact = property.PROPERTY_CONTACT;

  if (!propertyContact) return false;
  if (Object.keys(propertyContact).length === 0) {
    return false;
  }
  if (propertyContact.ID <= 0) return false;
  if (!propertyContact.PHONE) return false;

  return true;
}
