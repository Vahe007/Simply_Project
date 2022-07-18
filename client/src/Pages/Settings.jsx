import { Box } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from "react-redux";
import TextFieldWrapper from '../components/FormsUI/TextField'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import {getUserInfo} from '../redux/features/userAccess/selectors';
import ButtonWrapper from '../components/FormsUI/Button';
import {Button} from '@material-ui/core';

const Settings = () => {
    const {firstName, lastName} = useSelector(getUserInfo);
    const formik = useFormik({
        initialValues: {

        }
    })
  return (
    <Box>
        <Typography>
            {`Welcome ${firstName.toUpperCase()} ${lastName.toUpperCase()}!`}
        </Typography>
        {/* <TextField value={userInfo.firstName} name='firstName' disabled />
        <TextField value={userInfo.lastName} name='lastName' disabled />
        <TextField value={userInfo.email} name='email' disabled />
        <TextField value={userInfo.phoneNumber} name='phoneNumber' disabled /> */}
    </Box>
  )
}

export default Settings