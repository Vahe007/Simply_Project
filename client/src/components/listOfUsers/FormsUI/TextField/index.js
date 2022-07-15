import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { selectUsers } from "../../../../features/users/usersSlice";

const TextFieldWrapper = (props) => {
  const { name, ...otherProps } = props;
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  console.log(configTextField.error);
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
