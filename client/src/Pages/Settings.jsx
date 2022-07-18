import { Box } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from "react-redux";
import TextField from '../components/FormsUI/TextField'
import { useFormik } from 'formik'
import { getUserInfo } from '../redux/features/userAccess/selectors';
import Button from '../components/FormsUI/Button';
import { resetingPasswordInProfile } from '../redux/features/userAccess/validations';
import axios from 'axios';

const Settings = () => {
  const { firstName, lastName, password } = useSelector(getUserInfo);
  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: ""
    },
    validationSchema: resetingPasswordInProfile,
    onSubmit: (values) => console.log(values)
  })
  return (
    <Box>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography>
          {`Welcome ${firstName.toUpperCase()} ${lastName.toUpperCase()}!`}
        </Typography>
        <TextField formik={formik} name="oldPass" label="Input you old password" />
        <TextField formik={formik} name="newPass" label="Input you new password" />
        <Button type="submit" >Save Changes</Button>
      </Box>
    </Box>
  )
}

export default Settings