import React from 'react';
import {Button} from '@mui/material'
import {useFormikContext} from 'formik'

const ButtonWrapper = (props) => {
    const {children, ...otherProps} = props;

    const { submitForm } = useFormikContext();

    const onSubmit = () => {
        submitForm();
    }

    const configButton = {
        onClick: onSubmit,
        variant: "outlined",
        color: "primary",
        fullWidth: true
    }

    return (
        <Button
            {...configButton}
            {...otherProps}
        >
            {children}
        </Button>
    )
}

export default ButtonWrapper;