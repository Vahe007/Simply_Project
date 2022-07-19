import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from "react-redux";
import TextFieldWrapper from '../components/FormsUI/TextField'
import {TextField} from '@material-ui/core';
import { useFormik } from 'formik'
import { getUserInfo } from '../redux/features/userAccess/selectors';
import Button from '../components/FormsUI/Button';
import { resetingPasswordInProfile } from '../redux/features/userAccess/validations';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { setSnackbar } from '../redux/features/snackbar/SnackbarSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const { firstName, lastName, email, role, id } = useSelector(getUserInfo);

  const info = [firstName, lastName, email, role, id];

  const onSubmit = (values) => {
    axios.put(`${BASE_URL}users/${id}`, values).then((res) => {
      const {data, error} = res.data;
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: data ? 'Password Changed' : error.message,
          snackbarType: data ? 'success' : 'error'
        })
      );
    })
  }
  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: ""
    },
    validationSchema: resetingPasswordInProfile,
    onSubmit
  })

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 20}}>


      <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }} component="form" onSubmit={formik.handleSubmit}>
        <Typography style={{textAlign: "center", fontSize: '25px'}}>
          Change Password
        </Typography>
        <TextFieldWrapper sx={{ m: '10px 0' }} formik={formik} name="oldPass" label="Input you old password" />
        <TextFieldWrapper sx={{ m: '10px 0' }} formik={formik} name="newPass" label="Input you new password" />
        <Button type="submit">Save Changes</Button>
      </Box>
    </Box>
  )
}

export default Settings