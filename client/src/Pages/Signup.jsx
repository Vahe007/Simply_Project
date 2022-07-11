import React, { useState } from "react";
import { editUserSignupSchema } from "../features/userAccess/validations";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Form from './Form';
import { createUser } from "../features/userAccess/userAccessSlice";


const links = (
  <Grid container>
    <Grid item>
      <Link href='/login' variant="body2">
        {"Already have an account?"}
      </Link>
    </Grid>
  </Grid>
);

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
}
export const signupFields = ["firstName", "lastName", "email", "password", "phoneNumber"];

const attributes = {
  type: 'signup',
  initialValues,
  fields: signupFields,
  validationSchema: editUserSignupSchema,
  headTitle: 'Create Your Account',
  btnTitle: 'Sign Up',
  getUser: createUser,
  links
}

const Signup = () => {
  return (
    <Form {...attributes}/>
  )
}
export default Signup