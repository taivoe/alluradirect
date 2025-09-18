import * as yup from 'yup';

import { DamageDepositModeId } from '../../api/types';
import dayjs from 'dayjs';
import { boolean, email, messageSchema, requiredString, addressValidation } from './baseSchemas';
import { messages } from './messages';

// TODO - move this back to a shared formik component when we get the workspace set up with Formik
// Ideally this would just live next to the Formik item that uses it

export const createReservationSchema = yup.object({
  IS_NEW_GUEST: yup.boolean(),
  GUEST_FIRST_NAME: yup.string().when('IS_NEW_GUEST', {
    is: true,
    then: yup.string().min(1, messages.shortString).max(30, messages.longString).required(messages.requiredValue),
    otherwise: yup.string().min(1, messages.shortString).max(30, messages.longString),
  }),
  ARRIVAL: yup.date().required('You must Submit an Arrival Date'),
  GUEST_EMAIL: email.required('Email is required'),
  PROPERTY_ID: yup.number().required('You must select a property'),
  NIGHTS: yup.number().min(1).required().label('Nights'),
  PARTY_SIZE_ADULTS: yup
    .number()
    .typeError('You must submit a party size')
    .required('You must submit a party size')
    .positive('Must be grearter than 0'),
  PARTY_SIZE_KIDS: yup.number().typeError('You must submit a party size'),
  BOOKING_NET: yup.number().required('You must submit a Subtotal').typeError('You must submit a valid number'),
  PRICE_PER_NIGHT: yup
    .number()
    .typeError('You must submit a valid number')
    .required('You must submit a price per night'),
  DAMAGE_DEPOSIT_MODE_ID: yup.number().required('You must select'),
  DAMAGE_DEPOSIT_AMOUNT: yup.number().when('DAMAGE_DEPOSIT_MODE_ID', {
    is: (val: DamageDepositModeId) => {
      return val === DamageDepositModeId.COLLECT_DAMAGE_UPON_DEPARTURE;
    },
    then: yup.number(),
    otherwise: yup
      .number()
      .typeError('You must submit a number')
      .moreThan(0, 'Must be greater than 0')
      .required('You must submit a Damage Deposit Amount'),
  }),
  DEPOSIT_PERCENTAGE: yup.number().required('You must Submit a deposit percentage amount'),
  BALANCE_DUE_DATE: yup.date().test('max', 'Balance Due Date Cannot Come Before Deposit Due Date ', function (value) {
    const { DEPOSIT_DUE_DATE } = this.parent;
    const depositDueDate = dayjs(DEPOSIT_DUE_DATE);
    const balanceDueDate = dayjs(value);
    const diff = balanceDueDate.diff(depositDueDate, 'day');

    return diff >= 0;
  }),
});

const maxMessageLength = 8000;
// TODO - Place this next to shared hook once developed
export const bookingNotesSchema = yup.object().shape({
  notes_owner: yup.string().max(maxMessageLength, 'You must submit a note'),
});

const maxEntryCodeLength = 20;

export const customMessageSchema = yup.object().shape({
  id: yup.number().required(messages.requiredValue),
  message: messageSchema,
  entry_code: yup.string().max(maxEntryCodeLength, messages.longString),
});

export const mainPasswordValidation = yup
  .string()
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .min(8, 'Must be at least 8 characters long')
  .max(143, 'Maximum 143 characters long')
  .required(messages.requiredValue);

const passwordMatchValidation = yup
  .string()
  .oneOf([yup.ref('PASSWORD')], 'Both passwords need to be the same')
  .required('Required Field');

const confirmPasswordValidation = yup.string().when('PASSWORD', {
  is: (val: any) => val && val.length > 0,
  then: passwordMatchValidation,
});

export const passwordValidation = yup.object({
  PASSWORD: mainPasswordValidation,
  PASSWORD_CONFIRM: confirmPasswordValidation,
});

export const userProfileValidation = yup.object().shape({
  IS_COMPANY: boolean,
  COMPANY_NAME: yup.string().when('IS_COMPANY', {
    is: true,
    then: yup.string().max(75).required(messages.requiredValue),
  }),
  FIRST_NAME: yup.string().when('IS_COMPANY', {
    is: false,
    then: yup.string().max(50).required(messages.requiredValue),
  }),
  LAST_NAME: yup.string().when('IS_COMPANY', {
    is: false,
    then: yup.string().max(50, messages.longString).required(messages.requiredValue),
  }),
  EMAIL: email.required(messages.requiredValue),
  PHONE: requiredString,
  ADDRESS: yup.object().shape(addressValidation),
});

export const loginValidation = yup.object().shape({
  email: email.required(messages.requiredValue).label('Email'),
  password: yup.string().required(messages.requiredValue).min(4).label('Password'),
});

export const forgotPasswordValidation = yup.object().shape({
  email: email.required().label('Email'),
});
