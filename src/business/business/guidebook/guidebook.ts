import { Amenity, PropertyAmenityId } from '../../../api/types';

import { EditorFieldEnum } from './types';
import { PropertyGuidebook } from '../../../api/guest/types';
import { PropertyInstructionsEnum } from '../../../api/property/types';

export const editorURLParamsEnum = {
  [EditorFieldEnum.aboutBuilding]: PropertyInstructionsEnum.aboutTheBuilding,
  [EditorFieldEnum.checkIn]: PropertyInstructionsEnum.checkIn,
  [EditorFieldEnum.checkOut]: PropertyInstructionsEnum.checkOut,
  [EditorFieldEnum.directionsToSkiLift]: PropertyInstructionsEnum.toFromLifts,
  [EditorFieldEnum.emergencyContactProcedure]: PropertyInstructionsEnum.emergencyContacts,
  [EditorFieldEnum.frontDesk]: PropertyInstructionsEnum.frontDesk,
  [EditorFieldEnum.garbage]: PropertyInstructionsEnum.garbageAndRecycling,
  [EditorFieldEnum.gettingAround]: PropertyInstructionsEnum.gettingAround,
  [EditorFieldEnum.heating]: PropertyInstructionsEnum.heating,
  [EditorFieldEnum.houseKeeping]: PropertyInstructionsEnum.housekeeping,
  [EditorFieldEnum.lateCheckIn]: PropertyInstructionsEnum.lateCheckIn,
  [EditorFieldEnum.linens]: PropertyInstructionsEnum.linensAndTowels,
  [EditorFieldEnum.locationSummary]: PropertyInstructionsEnum.location,
  [EditorFieldEnum.other]: PropertyInstructionsEnum.other,
  [EditorFieldEnum.parkingInstructions]: PropertyInstructionsEnum.parking,
  [EditorFieldEnum.welcomeMessage]: PropertyInstructionsEnum.welcome,
  [EditorFieldEnum.restaurants]: PropertyInstructionsEnum.restaurants,
  [EditorFieldEnum.services]: PropertyInstructionsEnum.services,
  [EditorFieldEnum.skiInOut]: PropertyInstructionsEnum.skiInSkiOut,
  [EditorFieldEnum.whatToBring]: PropertyInstructionsEnum.whatToBring,
  [EditorFieldEnum.gettingToUnit]: PropertyInstructionsEnum.gettingToUnit,
};

export function getGuidebookAccessCode(guidebook: PropertyGuidebook): string {
  const {
    PROPERTY_GUIDEBOOK: {
      SECTIONS: {
        ARRIVAL: {
          ACCESS_DETAILS: {
            DATA: { DETAILS },
          },
        },
      },
    },
  } = guidebook;

  const doorCodeName = 'Door Code';
  const doorCode = DETAILS.find(accessSection => {
    return accessSection.NAME === doorCodeName;
  });

  if (!doorCode) {
    const accessCodeDeliveryName = 'Access Code Delivery';
    const accessCodeDelivery = DETAILS.find(accessSection => {
      return accessSection.NAME === accessCodeDeliveryName;
    });

    if (!accessCodeDelivery || accessCodeDelivery.VALUE === 'Other') {
      return 'Please review the access information in the guidebook';
    } else {
      return accessCodeDelivery.VALUE;
    }
  }

  return doorCode ? `${doorCode.VALUE}` : '';
}

export function getGuidebookWifiDetails(guidebook: PropertyGuidebook): string {
  const {
    PROPERTY_GUIDEBOOK: {
      PROPERTY: {
        CODES: { INTERNET_PASSWORD, INTERNET_NETWORK_NAME },
      },
      SECTIONS: {
        PROPERTY_AMENITIES: { ESSENTIALS },
      },
    },
  } = guidebook;

  if (INTERNET_PASSWORD.length > 0) {
    const nameString = INTERNET_NETWORK_NAME ? `Name: ${INTERNET_NETWORK_NAME}` : '';
    const passwordString = `Password: ${INTERNET_PASSWORD}`;
    const finalString = nameString ? `${nameString}\n${passwordString}` : passwordString;
    return finalString;
  }

  const wifiAmenity = ESSENTIALS.DATA.find(amenity => amenity.ID === PropertyAmenityId.WIFI);
  if (wifiAmenity) {
    return 'Wifi Available. Details located in the unit';
  }

  return 'This property may not have wifi available. Please contact host';
}

export function hasGuidebookAmenity(guidebook: PropertyGuidebook, amenityId: PropertyAmenityId): boolean {
  const {
    PROPERTY_GUIDEBOOK: {
      SECTIONS: {
        BUILDING_FACILITIES: { BUILDING_AMENITIES },
        PROPERTY_AMENITIES: { ESSENTIALS, KITCHEN, PRIVATE, SAFETY },
      },
    },
  } = guidebook;

  const result = [
    ...BUILDING_AMENITIES.DATA,
    ...ESSENTIALS.DATA,
    ...KITCHEN.DATA,
    ...PRIVATE.DATA,
    ...SAFETY.DATA,
  ].find(amenity => amenity.ID === amenityId);

  return Boolean(result);
}

export function hasGuidebookWifiAmenity(guidebook: PropertyGuidebook): boolean {
  return hasGuidebookAmenity(guidebook, PropertyAmenityId.WIFI);
}

export function getGuidebookDirectionsToProperty(guidebook: PropertyGuidebook): string {
  const {
    PROPERTY_GUIDEBOOK: {
      SECTIONS: {
        ARRIVAL: {
          DIRECTIONS_TO_PROPERTY: {
            DATA: { HTML },
          },
        },
      },
    },
  } = guidebook;

  // Owner location instructions always appear as the first element
  if (HTML.length > 0) {
    return HTML[0];
  }

  return '';
}

export function guidebookHtmlAsString(html: string | string[]): string {
  if (typeof html === 'string') {
    return html;
  }

  return html.join('<br/>');
}

export function isAmenitySkiOrBike(amenity: Amenity): boolean {
  return (
    amenity.ID === PropertyAmenityId.BUILDING_BIKE_STORAGE ||
    amenity.ID === PropertyAmenityId.BUILDING_SKI_STORAGE ||
    amenity.ID === PropertyAmenityId.PRIVATE_BIKE_STORAGE ||
    amenity.ID === PropertyAmenityId.PRIVATE_SKI_STORAGE
  );
}
