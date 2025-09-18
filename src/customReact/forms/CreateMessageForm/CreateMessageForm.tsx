import * as yup from 'yup';

import { Formik } from 'formik';
import React from 'react';
import { messageSchema } from '../../validationSchemas/baseSchemas';
import { messages } from '../../validationSchemas';

const initialValues = { message: '' };
const validationSchema = yup.object().shape({
  message: messageSchema.required(messages.requiredValue),
});

interface Props {
  onSubmit: (values: typeof initialValues, helpers: any) => void;
  children: React.ReactNode;
}

export const CreateMessageForm = ({ children, onSubmit }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {children}
    </Formik>
  );
};
