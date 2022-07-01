import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";


const TextFieldWrapper = (props) => {
    const { name, ...otherProps } = props;
    // const [ field, meta ] = useField(name);

    const configTextField = {
        // ...field,
        name,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    // if (meta && meta.touched && meta.error) {
    //     configTextField.error = true;
    //     configTextField.helperText = meta.error;
    // }

    return (
        <TextField 
        {...configTextField} />
    )
}

export default TextFieldWrapper;
