import { RequiredSubformsEnum } from '../../../api/subformNames';
import { garageParking } from '../sharedLabels';

const subformName = RequiredSubformsEnum.ParkingForm;
const subformPrefix = `${subformName}.PARKING`;

export const parkingFields = {
  garageCode: {
    label: garageParking,
    field: `${subformPrefix}.CODES.GARAGE_DOOR_CODE`,
  },
};
