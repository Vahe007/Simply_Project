import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";


const TextFieldWrapper = (props) => {
    const { name, error, touched, message, ...otherProps } = props;
    
    // const [meta, field] = useField();

    // if (meta && meta.touched && meta.error) {
    //     configTextField.error = true;
    //     configTextField.helperText = meta.error;
    // }


    const configTextField = {
        name,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (touched && error) {
        configTextField.error = true;
        configTextField.helperText = error;
    }
    if (message) {
        configTextField.error = true;
        configTextField.helperText = message;
    }

    return (
        <TextField 
        {...configTextField} />
    )
}

export default TextFieldWrapper;