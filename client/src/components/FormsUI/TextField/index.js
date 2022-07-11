import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const TextFieldWrapper = (props) => {
  const { name, formik, ...otherProps } = props;
  const configTextField = {
    name,
    value: formik.values[name],
    onBlur: formik.handleBlur,
    touched: formik.errors[name],
    fullWidth: true,
    variant: "outlined",
    ...otherProps,
  };

  if (formik.touched[name] && formik.errors[name]) {
    configTextField.error = true;
    configTextField.helperText = formik.errors[name];
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
