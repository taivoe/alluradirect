export const alluraDirectNorthAmericanPhoneNumber = '1-866-425-5872';

export const alluraDirectEmail = 'info@alluradirect.com';
export const directVacationsEmail = 'info@directvacations.com';

export const alluraDirect = 'alluraDirect';
export const directVacations = 'DirectVacations';
/** The Mobile Pin is used in The Mobile Walkthrough to confirm that a user has downloaded and entered the following pin.
 * The pin is displayed on the help page of the Mobile App
 */
export const mobilePin = '47839';

export const calculateBrandName = (isDV: boolean): string => (isDV ? directVacations : alluraDirect);
export const calculateBrandEmail = (isDV: boolean): string => (isDV ? directVacationsEmail : alluraDirectEmail);
