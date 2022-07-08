import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";


const TextFieldWrapper = (props) => {
    const { name, ...otherProps } = props;

    const configTextField = {
        name,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };



    return (
        <TextField 
        {...configTextField} />
    )
}

export default TextFieldWrapper;
