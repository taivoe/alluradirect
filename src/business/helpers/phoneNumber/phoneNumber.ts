import {
  CountryCode,
  isValidPhoneNumber as generateIsValidPhoneNumber,
  isPossiblePhoneNumber,
  parsePhoneNumber,
  getCountries,
  isSupportedCountry,
  getCountryCallingCode,
  CountryCallingCode,
} from 'libphonenumber-js';
import { countryCodeToCountryName } from './countryCodeToCountryName';

export const preferredCountries: CountryCode[] = ['CA', 'US', 'AU'];

/** https://www.twilio.com/docs/glossary/what-e164
 
 * E.164 is the international telephone numbering plan that ensures each device on the PSTN has globally unique number.
    This number allows phone calls and text messages can be correctly 
    routed to individual phones in different countries. E.164 numbers are formatted [+] [country code] [subscriber number including area code] and can have a maximum of fifteen digits. */

/** for display purposes. As of 2022-01-31, all future phone inputs will require the E164 format : [+] [country code] [subscriber number including area code].
 ** This function will format the E164 format to National or International depending on if the phone number is from North America.
 ** Use this function when displaying phone values on the client.
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const numberWithPlus = handleAddPlusToPhoneNumber(phoneNumber);
  const isValidPhoneNumber = generateIsValidPhoneNumber(numberWithPlus);
  if (isValidPhoneNumber) {
    const parsedPhoneNumber = parsePhoneNumber(numberWithPlus);
    const countryCode = parsedPhoneNumber.country;
    const isNorthAmerican = countryCode === 'CA' || countryCode === 'US';
    if (isNorthAmerican) {
      return parsedPhoneNumber.formatNational();
    } else {
      return parsedPhoneNumber.formatInternational();
    }
  } else {
    return phoneNumber;
  }
}

interface E164Format {
  subscriberNumber: number | string;
  countryCallingCode: number | string;
}

/** Phone number to be sent for submission to server */
export function formatE164PhoneNumber({ subscriberNumber, countryCallingCode }: E164Format): string {
  return `+${countryCallingCode}${subscriberNumber}`;
}
export function parsePhone(phoneNumber: string): {
  countryCode: string;
  country: string;
  subscriberNumber: string;
} {
  const defaultCountryCode = '1';
  const defaultCountry = 'CA';

  if (!phoneNumber) return { countryCode: defaultCountryCode, country: defaultCountry, subscriberNumber: '' };

  const trimmedPhone = removeLeadingZerosFromPhoneNumber(phoneNumber.trim());
  const phoneWithoutPlus = removePlusFromPhoneNumber(trimmedPhone);
  const phoneWithPlus = handleAddPlusToPhoneNumber(trimmedPhone);

  if (!isPossiblePhoneNumber(phoneWithPlus))
    return { countryCode: defaultCountryCode, country: defaultCountry, subscriberNumber: phoneWithoutPlus };

  const parsedPhoneNumber = parsePhoneNumber(phoneWithPlus);

  if (!parsedPhoneNumber) {
    return { countryCode: defaultCountryCode, country: defaultCountry, subscriberNumber: phoneWithoutPlus };
  }

  const countryCallingCode = parsedPhoneNumber.countryCallingCode.toString();
  const country = parsedPhoneNumber.country;

  const countryAndCode = countryCallingCode && country;

  return {
    countryCode: countryAndCode ? countryCallingCode : defaultCountryCode,
    country: countryAndCode ? country : defaultCountry,
    subscriberNumber: parsedPhoneNumber.nationalNumber.toString(),
  } as {
    countryCode: string;
    country: string;
    subscriberNumber: string;
  };
}

/** */
function removePlusFromPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length === 0) return phoneNumber;

  const firstDigit = phoneNumber[0];
  if (firstDigit === '+') {
    return [...phoneNumber].filter(char => char !== '+').join('');
  }

  return phoneNumber;
}

/** We have legacy phone numbers that will not include the + symbol
 ** In order to cover a larger base of phone numbers, we will identify numbers that do not have the + and add it.   */
export const handleAddPlusToPhoneNumber = (phoneNumber: string) => {
  const firstDigit = phoneNumber[0];

  if (firstDigit !== '+') {
    return `+${phoneNumber}`;
  }

  return phoneNumber;
};

// https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers
function removeLeadingZerosFromPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length < 3) return phoneNumber;
  if (phoneNumber[0] === '0' && phoneNumber[0] === '0') {
    const [, , ...rest] = phoneNumber.split('');
    return rest.join('');
  }

  return phoneNumber;
}

export interface CountryAndCode {
  countryCode: CountryCode | string;
  callingCode: CountryCallingCode | string;
  countryName: string;
}

export function getAllCountryCallingCodes(): CountryAndCode[] {
  const countryCodes = getCountries();

  const supportedCountries: CountryAndCode[] = [];

  countryCodes.forEach(countryCode => {
    const countryName = countryCodeToCountryName[countryCode];
    const callingCode = getCountryCallingCode(countryCode);

    if (isSupportedCountry(countryCode) && countryName && callingCode) {
      supportedCountries.push({
        countryCode,
        callingCode,
        countryName,
      });
    }
  });

  return supportedCountries;
}
