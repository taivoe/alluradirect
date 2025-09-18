import { SubformName, RequiredSubformsEnum } from '../../../../../../api/subformNames';
import { isValidDate, dateFormatServer } from '../../../../../../business/helpers/dateHelpers/dateHelpers';

export const generateUpdatedSendValues = (pid: any) => (values: any) => {
  // values sent in format: { [subformName]: { ...data} }
  const subformName = Object.keys(values)[0] as SubformName;

  let valueToSubmit = { ...values };

  if (subformName === RequiredSubformsEnum.NonResidentStatusForm) {
    const {
      [subformName]: {
        NON_RESIDENT: { IS_NON_RESIDENT, ITN_INFO },
      },
    } = values;

    if (!IS_NON_RESIDENT) {
      valueToSubmit = { [subformName]: { NON_RESIDENT: { IS_NON_RESIDENT, ITN_INFO: [] } } };
    } else {
      const serverITNInfo = ITN_INFO.map((info: any) => {
        const { ID, YEAR, MONTH, DAY, PERCENTAGE_OWNERSHIP, FIRST_NAME, LAST_NAME, ITN } = info;

        let serverDate = '';

        if (YEAR !== '' && MONTH !== '' && DAY !== '') {
          const date = new Date(YEAR, MONTH - 1, DAY);

          serverDate = isValidDate(date) ? dateFormatServer(date) : '';
        }

        return {
          FIRST_NAME,
          LAST_NAME,
          PERCENTAGE_OWNERSHIP,
          ITN,
          ID,
          DOB: serverDate,
          YEAR,
          MONTH,
          DAY,
        };
      });
      const serverVals = {
        NON_RESIDENT: {
          IS_NON_RESIDENT,
          ITN_INFO: serverITNInfo,
        },
      };

      valueToSubmit = { [subformName]: serverVals };
    }
  }

  // Server has legacy surcharges format, map to old format before submission
  if (subformName === RequiredSubformsEnum.SurchargesForm) {
    const { IS_SUITABILITY_PETS_ENABLED, SURCHARGES } = values[subformName];
    const submitSurcharges = Object.keys(SURCHARGES).map(key => ({
      ...SURCHARGES[key],
    }));

    valueToSubmit = {
      [subformName]: {
        IS_SUITABILITY_PETS_ENABLED,
        SURCHARGES: submitSurcharges,
      },
    };
  }

  // Server has legacy suitabilities format, map to old format before submission
  if (subformName === RequiredSubformsEnum.SuitabilitiesForm) {
    const { RULES, SUITABILITIES } = values[subformName];
    const submitSuitabilities = Object.keys(SUITABILITIES).map(key => SUITABILITIES[key]);

    valueToSubmit = {
      [subformName]: {
        RULES,
        SUITABILITIES: submitSuitabilities,
      },
    };
  }

  valueToSubmit.property_id = pid;

  return valueToSubmit;
};
