import React, { useEffect } from "react";
import { editUserLoginSchema, emailLinkValidationSchema } from "../redux/features/userAccess/validations";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { loadUser, sendLink } from "../redux/features/userAccess/userAccessSlice";
import Form from "./Form";
import Button from "../components/FormsUI/Button";
import { useFormik } from 'formik'
import { Box } from "@material-ui/core";
import TextField from "../components/FormsUI/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from "../redux/features/userAccess/selectors";
import { setSnackbar } from "../redux/features/snackbar/SnackbarSlice";
import Cookies from "js-cookie";



const initialValues = {
  email: "",
  password: "",
};
export const loginFields = ["email", "password"];

const Login = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const message = useSelector(getMessage);
  


  useEffect(() => {
    const { text, isError, type } = message;
    if (Object.values(message).length && type === "send") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: text || "Check your email",
          snackbarType: isError ? "error" : "success",
        })
      );
    }
  }, [message])

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailLinkValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(sendLink(values));
      resetForm({ values: '' });
    }
  })

  const links = (
    <Grid container>
      <Grid item xs>
        <div style={{ cursor: "pointer", color: "#1976d2", fontSize: "0.875rem" }} onClick={() => setOpen(true)}>Forgot Password?</div>
      </Grid>
      <Grid item>
        <Link style={{ textDecoration: "none" }} href="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
  );

  const loginAttributes = {
    type: "login",
    initialValues,
    fields: loginFields,
    validationSchema: editUserLoginSchema,
    headTitle: "Login to Your Account",
    btnTitle: "Login",
    getUser: loadUser,
    links,
  };

  const dialogAttributes = {
    title: "Input your email",
    content: <>
      <Box onSubmit={formik.handleSubmit} component="form">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField sx={{m: "10px 0"}} formik={formik} name="email" label="Email" />
          <Button sx={{m: "10px 0"}} type="submit">Send Verification Link</Button>
        </Box>
      </Box>
    </>,
    onClose: () => setOpen(false)
  }

  return <>
    <Form {...loginAttributes} dialogAttributes={dialogAttributes} isOpen={isOpen} setOpen={setOpen} />
  </>
};

export default Login;
