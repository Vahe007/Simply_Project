import React from "react";
import { editUserLoginSchema } from "../features/userAccess/validations";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { loadUser } from "../features/userAccess/userAccessSlice";
import Form from "./Form";
import { Button } from "@material-ui/core";

const links = (
  <Grid container>
    <Grid item xs>
      <Link href="send-key" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link href="/signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
);

const initialValues = {
  email: "",
  password: "",
};
export const loginFields = ["email", "password"];

const attributes = {
  type: "login",
  initialValues,
  fields: loginFields,
  validationSchema: editUserLoginSchema,
  headTitle: "Login to Your Account",
  btnTitle: "Login",
  getUser: loadUser,
  links,
};

const Login = () => {
  return <Form {...attributes} />;
};

export default Login;
