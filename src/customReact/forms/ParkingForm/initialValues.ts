import { Property } from '../../../api/property/types';
import { RequiredSubformsEnum } from '../../../api/subformNames';

export const generateParkingValues = ({
  PARKING,
  INSTRUCTIONS: { PARKING: parkingInstructions },
  CODES,
}: Property) => ({
  [RequiredSubformsEnum.ParkingForm]: {
    PARKING: {
      ...PARKING,
      INSTRUCTIONS: parkingInstructions,
      CODES: {
        GARAGE_DOOR_CODE: CODES.GARAGE_DOOR_CODE,
      },
    },
  },
});
