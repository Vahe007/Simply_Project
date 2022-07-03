import React, { useState, useEffect } from "react";
import Header from "../components/HeaderWrapper.jsx";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth.js";
import store from "../app/store";
import {
  loadUser,
  createUser,
} from "../features/userAccess/userAccessSlice.js";
import { Formik, Form } from "formik";
import TextField from "../components/FormsUI/TextField/index.js";
import Button from "../components/FormsUI/Button";
import { editUserSignupSchema } from "../features/userAccess/validations";
import { getLoading, getToken } from "../features/userAccess/selectors.js";
import { useFormik } from "formik";

const Signup = () => {
  const [isVisible, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const isLoading = useSelector(getLoading);

  const dispatch = useDispatch();
  const auth = useAuth();

  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const handleRegistration = async (values, {resetForm}) => {
    await dispatch(createUser(values));
    setMessage(localStorage.getItem("message"));
    if (localStorage.getItem("message") === "User successfully created") {
      resetForm({ values: "" });
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: editUserSignupSchema,
    onSubmit: handleRegistration,
  });

  const changeVisibility = () => {
    setVisibility((prevState) => {
      return !prevState;
    });
  };

  if (auth.user) {
    return <Navigate to="profile" />;
  }
  return (
    <div className="signup">
      <Header type="signup" />
      <Box
        sx={{
          mt: "50px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "150px",
          }}
        >
          <Typography
            sx={{ color: "#232968", fontWeight: 600 }}
            variant="h5"
            mb="50px"
          >
            {message || "Create Your Account"}
          </Typography>
          <TextField
            onChange={formik.handleChange}
            value={formik.values.firstName}
            label="FirstName"
            name="firstName"
            sx={{ width: "320px" }}
          />
          {formik.errors.firstName && <div style={{width: "320px", color: "red"}}>{formik.errors.firstName}</div>}
          <TextField
            onChange={formik.handleChange}
            value={formik.values.lastName}
            label="LastName"
            name="lastName"
            sx={{ width: "320px", mt: "15px" }}
          />
          {formik.errors.lastName && <div style={{width: "320px", color: "red"}}>{formik.errors.lastName}</div>}
          <TextField
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Email"
            name="email"
            sx={{ width: "320px", mt: "15px" }}
          />
          {formik.errors.email && <div style={{width: "320px", color: "red"}}>{formik.errors.email}</div>}
          <TextField
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Password"
            name="password"
            type={isVisible ? "text" : "password"}
            sx={{ width: "320px", mt: "15px" }}
            InputProps={{
              endAdornment: isVisible ? (
                <VisibilityIcon
                  onClick={changeVisibility}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={changeVisibility}
                  sx={{ cursor: "pointer" }}
                />
              ),
            }}
          />
          {formik.errors.password && <div style={{width: "320px", color: "red"}}>{formik.errors.password}</div>}
          <TextField
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            label="Phone"
            name="phoneNumber"
            sx={{ width: "320px", mt: "15px" }}
          />
          {formik.errors.phoneNumber && <div style={{width: "320px", color: "red"}}>{formik.errors.phoneNumber}</div>}
          <Button type="submit" isLoading={isLoading} sx={{ mt: "25px" }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Signup;
