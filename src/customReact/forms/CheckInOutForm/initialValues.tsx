import { OptionalSubformsEnum, RequiredSubformsEnum } from '../../../api/subformNames';

import { Property } from '../../../api/property/types';

export const generateCheckInOutValues = (
  propertyObject: Property,
  subformName: RequiredSubformsEnum.CheckInOutForm | OptionalSubformsEnum.CheckInOutFormOptional,
) => ({
  [subformName]: {
    RULES: propertyObject.RULES,
    INSTRUCTIONS: {
      LATE_CHECK_IN: propertyObject.INSTRUCTIONS.LATE_CHECK_IN,
      CHECK_IN: propertyObject.INSTRUCTIONS.CHECK_IN,
      CHECK_OUT: propertyObject.INSTRUCTIONS.CHECK_OUT,
      GARBAGE_RECYCLING: propertyObject.INSTRUCTIONS.GARBAGE_RECYCLING,
    },
    CODES: {
      DEVELOPMENT_DOOR_CODE: propertyObject.CODES.DEVELOPMENT_DOOR_CODE,
      GARBAGE_RECYCLING_CODE: propertyObject.CODES.GARBAGE_RECYCLING_CODE,
    },
  },
});
