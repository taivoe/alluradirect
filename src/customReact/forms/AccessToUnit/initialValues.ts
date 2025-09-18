import { Property } from '../../../api/property/types';
import { RequiredSubformsEnum } from '../../../api/subformNames';

export const generateAccessToUnitValues = (property: Property) => ({
  [RequiredSubformsEnum.AccessToUnitForm]: {
    ACCESS_TO_UNIT: {
      ...property.ACCESS_TO_UNIT,
      CODES: property.CODES,
      CHECK_IN_PROCEDURE: property.INSTRUCTIONS.CHECK_IN,
    },
  },
});

export type AccessToUnitFormikValues = ReturnType<typeof generateAccessToUnitValues>;
