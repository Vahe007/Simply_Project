import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectWrapper = (props) => {
  const { name, options, ...otherProps } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const onSelectchange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: onSelectchange,
  };

  if (meta && meta.touched && meta.error) {
    console.log("hi");
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {options.map((item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
