import React from 'react';
import {Button} from '@mui/material'
import {useFormikContext} from 'formik'
import { CircularProgress } from '@mui/material';


const ButtonWrapper = (props) => {
    const {children, isLoading, variant="outlined", ...otherProps} = props;

    const configButton = {
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