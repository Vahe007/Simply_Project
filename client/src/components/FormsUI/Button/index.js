import React from 'react';
import {Button} from '@mui/material'
import {useFormikContext} from 'formik'
import { CircularProgress } from '@mui/material';


const ButtonWrapper = (props) => {
    const {children, isLoading, variant="contained", ...otherProps} = props;

    // const { submitForm } = useFormikContext();

    // const onSubmit = () => {
    //     submitForm();
    // }

    const configButton = {
        // onClick: onSubmit,
        variant,
        ...otherProps
    }
    if (isLoading) {
        return <CircularProgress sx={{mt: "15px"}}/> 
    }
    return (
        <Button
            {...configButton}
        >
            {children}
        </Button>
    )
}

export default ButtonWrapper;