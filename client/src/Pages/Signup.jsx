import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
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

  const handleRegistration = async (body, { resetForm }) => {
    await dispatch(createUser({ body, type: "registration" }));
    setMessage(localStorage.getItem("message"));
    if (localStorage.getItem("message") === "User successfully created") {
      resetForm({ values: "" });
    }
  };

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
        <Formik
          validationSchema={editUserSignupSchema}
          initialValues={initialState}
          onSubmit={handleRegistration}
        >
          <Form
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
              label="FirstName"
              name="firstName"
              sx={{ width: "320px" }}
            />
            <TextField
              label="LastName"
              name="lastName"
              sx={{ width: "320px", mt: "15px" }}
            />
            <TextField
              label="Email"
              name="email"
              sx={{ width: "320px", mt: "15px" }}
            />
            <TextField
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
            <TextField
              label="Phone"
              name="phoneNumber"
              sx={{ width: "320px", mt: "15px" }}
            />
            <Button isLoading={isLoading} sx={{ mt: "25px" }}>
              Sign Up
            </Button>
          </Form>
        </Formik>
      </Box>
    </div>
  );
};

export default Signup;
