import { buildingEntry, garbageRecycling } from '../sharedLabels';

import { RequiredSubformsEnum, OptionalSubformsEnum } from '../../../api/subformNames';

export const generateCheckInOutFields = (
  subformName: RequiredSubformsEnum.CheckInOutForm | OptionalSubformsEnum.CheckInOutFormOptional,
) => ({
  buildingCode: {
    label: buildingEntry,
    field: `${subformName}.CODES.DEVELOPMENT_DOOR_CODE`,
  },
  garbageCode: {
    label: garbageRecycling,
    field: `${subformName}.CODES.GARBAGE_RECYCLING_CODE`,
  },

  checkIn: {
    label: 'Check-In Time',
    field: `${subformName}.RULES.CHECK_IN`,
  },
  checkOut: {
    label: 'Check-Out Time',
    field: `${subformName}.RULES.CHECK_OUT`,
  },

  /** RTE fields */
  checkInProcedure: {
    label: 'Check-In Procedure',
    field: `${subformName}.INSTRUCTIONS.CHECK_IN`,
  },
  lateCheckInProcedure: {
    label: 'Late / After Hours Arrival',
    field: `${subformName}.INSTRUCTIONS.LATE_CHECK_IN`,
  },
  checkOutProcedure: {
    label: 'Check-Out Procedure',
    field: `${subformName}.INSTRUCTIONS.CHECK_OUT`,
  },
  garbageRecyclingInstructions: {
    label: 'Garbage / Recycling Disposal Instructions',
    field: `${subformName}.INSTRUCTIONS.GARBAGE_RECYCLING`,
  },
});
