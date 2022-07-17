import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../constants';
import { selectSnackbar, setSnackbar } from '../features/snackbar/SnackbarSlice';
import { getMessage } from '../features/userAccess/selectors';
import { sendLink } from '../features/userAccess/userAccessSlice';

const SendKey = () => {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  console.log(message);

  const initialValues = { email: "" };



  
  useEffect(() => {
    if (message) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: message,
          snackbarType: "error",
        })
      );
    }
  }, [message])
  
  const handleSubmit = (values) => {
    dispatch(sendLink(values));
  }




  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <>
      <Box onSubmit={formik.handleSubmit} component="form">
        <TextField value={formik.values.email} onChange={formik.handleChange} name="email" label="Email" />
        <Button type="submit">Send Verification Key</Button>
      </Box>
    </>
  )
}

export default SendKey

