import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

import { messages } from './messages';
import { handleStripHTMLAndSpaces } from '../../business/helpers/stringHelpers';

/** Re-usable validation schema pieces
 *  Ideally these should be tested thoroughly
 *  Used in multiple other validation schemas
 */

const {
  requiredValue,
  requiredNumber,
  longString,
  shortString,
  invalidTime,
  invalidPhone,
  maxString,
  unselectedOption,
  minNumber,
} = messages;

export const email = yup
  .string()
  .min(3, 'email must be more than 3 characters')
  .email('You must provide a valid email');
export const boolean = yup.boolean().required(requiredValue).nullable();

export const MAX_ACCESS_CODE_LENGTH = 50;
export const accessCode = yup.string().max(MAX_ACCESS_CODE_LENGTH, messages.longString);

export const streetName = yup
  .string()
  .min(1, shortString)
  .max(50, longString)
  .required(requiredValue)
  .typeError('You must provide a street name');

export const streetNumber = yup
  .string()
  .min(1, shortString)
  .max(50, longString)
  .required(requiredValue)
  .typeError('You must provide a street number');

export const city = yup.string().min(2, shortString).max(30, longString).required(requiredValue);

export const country = yup.string().min(2, shortString).max(50, longString).required(requiredValue);

export const unit = yup.string().max(20, longString);

export const htmlNotRequired = (maxLength = 5000) => {
  return yup.string().test(
    'max-length',
    messages.maxStringDefined(maxLength),
    // Subtract 20 to cover the face that there may be a difference between front end length and server length
    val => handleStripHTMLAndSpaces(val ?? '').length < maxLength - 20,
  );
};

export const htmlRequired = (maxLength = 5000) => {
  return htmlNotRequired(maxLength).test(
    'min-length',
    'Field Cannot be empty',
    val => handleStripHTMLAndSpaces(val ?? '').length > 0,
  );
};

export const name = yup.string().max(100, longString);

export const instruction = yup.string().max(5000, messages.maxString5000);
export const description = yup.string().max(5000, maxString);

export const phone = yup.string().test('is-jimmy', invalidPhone, value => {
  return value ? isValidPhoneNumber(value) : false;
});

const maxMessageLength = 8000;
export const messageSchema = yup
  .string()
  .min(1, messages.shortString)
  .max(maxMessageLength, messages.longString)
  .typeError(requiredValue);

export const currency = yup
  .number()
  .typeError(requiredNumber)
  .required(requiredNumber)
  .test('is-decimal', 'Only Include 2 Decimals', value => {
    const strValue = !value ? '' : value.toString();
    const match = strValue?.match(/^[0-9]+(\.[0-9]{1,2})?$/);
    if (match) {
      return match.length > 0;
    }
    return true;
  });

export const squareFeet = yup
  .number()
  .typeError('You must specify a number')
  .required(requiredNumber)
  .min(1, 'Square Footage must be greater than 1')
  .max(32765, 'Square footage must be less than 32766');

export const requiredString = yup.string().required(requiredValue);

export const id = yup.number().min(0, 'Error');

export const stringID = yup.string();

export const maxString2500 = yup.string().max(2500, maxString);
export const maxString5000 = yup.string().max(5000, maxString);

export const taxString = yup.string().max(100, longString).required(requiredValue);

export const time = yup
  .string()
  .matches(/\b((1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))/, invalidTime)
  .required(requiredValue);

export const twentyFourHourTime = yup
  .string()
  .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'You must provide a valid time in the 24 Hour Format 00:00');

export const positiveNumber = yup
  .number()
  .positive()
  .integer('Only numbers are valid') // To do: This is not working correctly at the moment
  .required(requiredNumber);

export const number = yup
  .number()
  .min(1, 'Must be value greater than 0')
  .integer('Only numbers are valid') // To do: This is not working correctly at the moment
  .required(requiredNumber);

export const minAge = yup
  .number()
  .min(18, 'Must be value greater than 18')
  .integer('Only numbers are valid') // To do: This is not working correctly at the moment
  .required(requiredNumber);

export const url = yup
  .string()
  .matches(/https?:\/\/.+\..+/, 'Link should start with http:// or https:// and have at least one character after');

export const addressValidation = {
  STREET_NAME: streetName,
  STREET_NUMBER: streetNumber,
  UNIT: unit,
  CITY: city,
  POSTAL: yup.string().required(requiredValue),
  REGION: yup.string().max(50, longString).required(requiredValue),
  COUNTRY: country,
};

export const buttonGroupValidation = {
  ID: yup.number().positive(unselectedOption),
  NAME: yup.string(),
};

export const buttonGroupValidationNotRequired = {
  ID: yup.number(),
  NAME: yup.string(),
};

export const idNameValidation = {
  ID: requiredString,
  NAME: requiredString,
};

export const numberRegExp = /^[0-9]*$/;

export const rateGroup = {
  BASE_RATE: yup.number().min(1, requiredValue).required(requiredValue),
  MIN_NIGHTS: yup.number().min(1, requiredValue).required(requiredValue),
};

export const suitability = yup.object().shape({
  IS_SUITABLE: yup.boolean().required(requiredValue),
  NAME: yup.string(),
  DESCRIPTION: yup.string().max(1000, longString),
  ID: yup.number().min(1, minNumber).required(requiredValue),
});

export const amenityDescription = yup.string().max(1000, messages.longString);
export const amenityInstructions = yup.string().max(8000, messages.longString);

export const amenitySchema = yup.object().shape({
  INSTRUCTIONS: amenityInstructions,
  DESCRIPTION: amenityDescription,
  ACCESS_CODE: accessCode,
  INTERNET_NETWORK_NAME: accessCode,
  INTERNET_PASSWORD: accessCode,
});

export const numericValidationRegex = new RegExp(/^(\d+)?([.]?\d{1,2})?$/);
