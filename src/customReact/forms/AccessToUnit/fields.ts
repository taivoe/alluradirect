import { buildingEntry, garageParking, garbageRecycling, wifiName, wifiPassword } from '../sharedLabels';

import { RequiredSubformsEnum } from '../../../api/subformNames';

const subformName = RequiredSubformsEnum.AccessToUnitForm;
const subformPrefix = `${subformName}.ACCESS_TO_UNIT`;

export const accessToUnitFields = {
  /** Main access to unit settings */
  type: {
    label: 'Property Access Type',
    field: `${subformPrefix}.TYPE.ID`,
  },
  method: {
    label: 'Access Delivery',
    field: `${subformPrefix}.METHOD.ID`,
  },
  code: {
    label: 'Access Code Type',
    field: `${subformPrefix}.CODE.ID`,
  },
  standardCode: {
    label: 'Standard Code',
    field: `${subformPrefix}.STANDARD_CODE`,
  },

  /** Additional access codes */
  bike: {
    label: 'Bike Locker',
    field: `${subformPrefix}.CODES.BIKE_LOCKER_CODE`,
  },
  /** building/development are used interchangeably here */
  building: {
    label: buildingEntry,
    field: `${subformPrefix}.CODES.DEVELOPMENT_DOOR_CODE`,
  },
  gym: {
    label: 'Gym Access',
    field: `${subformPrefix}.CODES.DEVELOPMENT_GYM_CODE`,
  },
  hottub: {
    label: 'Hot Tub Access',
    field: `${subformPrefix}.CODES.DEVELOPMENT_HOT_TUB_CODE`,
  },
  pool: {
    label: 'Pool',
    field: `${subformPrefix}.CODES.DEVELOPMENT_POOL_CODE`,
  },
  sauna: {
    label: 'Sauna Room',
    field: `${subformPrefix}.CODES.DEVELOPMENT_SAUNA_CODE`,
  },
  steamroom: {
    label: 'Steam Room',
    field: `${subformPrefix}.CODES.DEVELOPMENT_STEAM_ROOM_CODE`,
  },
  recRoom: {
    label: 'Games/Rec Room',
    field: `${subformPrefix}.CODES.GAMES_REC_ROOM_CODE`,
  },
  garage: {
    label: garageParking,
    field: `${subformPrefix}.CODES.GARAGE_DOOR_CODE`,
  },
  garbage: {
    label: garbageRecycling,
    field: `${subformPrefix}.CODES.GARBAGE_RECYCLING_CODE`,
  },
  ski: {
    label: 'Ski Locker',
    field: `${subformPrefix}.CODES.SKI_LOCKER_CODE`,
  },

  /** Internet codes */
  internetName: {
    label: wifiName,
    field: `${subformPrefix}.CODES.INTERNET_NETWORK_NAME`,
  },
  internetPassword: {
    label: wifiPassword,
    field: `${subformPrefix}.CODES.INTERNET_PASSWORD`,
  },
};
