import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import TextField from "../components/FormsUI/TextField";
import { useSelector, useDispatch } from "react-redux";
import { InputProps } from "../helpers/common";
import Button from "../components/FormsUI/Button";
import { getMessage } from "../redux/features/userAccess/selectors";
import MainDialog from "../components/listOfUsers/dialogs/helpers/MainDialog";

const theme = createTheme();


const addVisibilityIcon = (field, isVisible, changeVisibility) => {
  if (field === "password") {
    return {
      type: isVisible ? "text" : "password",
      InputProps: InputProps(isVisible, changeVisibility)
    }
  }
  return null
}
const inputAllProps = (field, formik, isVisible, changeVisibility, message) => {
  return {
    name: field,
    label: `${field.charAt(0).toUpperCase()}${field.slice(1)}`,
    margin: 'normal',
    onChange: formik.handleChange,
    message,
    ...addVisibilityIcon(field, isVisible, changeVisibility),
  }
}


function Form({ initialValues, fields, validationSchema, headTitle, btnTitle, links, getUser, dialogAttributes, isOpen }) {
  const [isVisible, setVisibility] = useState(false);
  const message = useSelector(getMessage);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(getUser(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const changeVisibility = () => {
    setVisibility((prevState) => {
      return !prevState;
    });
  };


  return (
    <ThemeProvider theme={theme}>
      {isOpen && <MainDialog {...dialogAttributes} />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://historymuseum.am/wp-content/uploads/2018/01/3-Srah-11-Dvin-634x635.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              {headTitle}
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              {fields.map((field, index) => {
                return (
                  <TextField fullWidth={true} key={index} formik={formik} {...inputAllProps(field, formik, isVisible, changeVisibility, message)} />
                );
              })}
              <Typography sx={{ color: 'red', textAlign: 'center' }}>
                {message.text}
              </Typography>
              <Button fullWidth={true} type="submit" sx={{ mt: "15px" }}>
                {btnTitle}
              </Button>
              {links}

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


export default Form;