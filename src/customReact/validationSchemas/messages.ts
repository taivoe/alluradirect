export const messages = {
  requiredValue: 'This field is required',
  requiredNumber: 'You must provide a number',
  shortNumber: 'The number you provided is too short',
  longNumber: 'The number you provided is too long',
  longString: 'The value you provided is too long',
  shortString: 'The value you provided is too short',
  invalidTime: 'You must provide a valid time format',
  invalidPhone: 'You have provided an invalid phone number',
  invalidEmail: 'You have provided an invalid email',
  unselectedOption: 'You must select an option',
  maxString: 'You must only provide 250 characters',
  /** You must only provide 500 characters */
  maxStringDefined: (length: number) => `You must only provide ${length} characters`,
  maxString2500: 'You must only provide 2500 Characters',
  maxString5000: 'You must only provide 5000 Characters',
  minNumber: 'The number you provided is too small',
  maxNumber: 'The number you provided is too large',
};
