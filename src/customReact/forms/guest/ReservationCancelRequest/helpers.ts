import * as yup from 'yup';

const initialValues = {
  message: '',
  isChecked: false,
};

const validationSchema = yup.object({
  message: yup
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(1000, 'Maximum 1000 characters long')
    .required('Please provide a reason for this request'),
  isChecked: yup
    .boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

export const reservationCancelRequestFormValues = {
  initialValues,
  validationSchema,
};
