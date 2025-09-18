import { Formik } from "formik";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const AccessToUnitFormikForm = ({ children }: Props) => {
  const onSubmit = (values: any) => {
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ test: "hello world!" }}>
      {children}
    </Formik>
  );
};
