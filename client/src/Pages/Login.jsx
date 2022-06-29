import React, { useState, useEffect } from "react";
import Header from "../components/HeaderWrapper.jsx";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../components/auth.js";
import store from "../app/store";
import Profile from "./Profile.jsx";
import { loadUser } from "../features/userAccess/userAccessSlice.js";
import TextField from "../components/FormsUI/TextField/index.js";
import { Form, Formik } from "formik";
import { editUserLoginSchema } from "../features/userAccess/validations.js";
import Button from "../components/FormsUI/Button";
import { getExhibitsPerPage } from "../features/exhibits/exhibitsSlice.js";
import { getLoading, getUserInfo, getToken } from "../features/userAccess/selectors.js";

function Login({ type }) {
  const [isVisible, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const token = useSelector(getToken);
  const [stateToken, setStateToken] = useState(token);
  const dispatch = useDispatch();
  const auth = useAuth();
  const isLoading = useSelector(getLoading);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    localStorage.removeItem("message");
  }, [])


  
  useEffect(() => {
    setStateToken(token);
  }, [token]);

  

  const changeVisibility = () => {
    setVisibility((prevState) => {
      return !prevState;
    });
  };

  const handleLogin = async (values) => {
    await dispatch(loadUser(values));
    setMessage(localStorage.getItem("message"));
    if (store.getState().userAccess.token) {
      localStorage.removeItem("message");
      auth.login(userInfo);
    }
  };

  if (auth.user) {
    return <Profile />;
  }
  return (
    <div className="login" style={{ overflowY: "hidden" }}>
      <Header type="login" />
      <Box
        sx={{
          mt: "150px",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={editUserLoginSchema}
          onSubmit={handleLogin}
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
              {message || "Login to Your Account"}
            </Typography>
            <TextField name="email" label="Email" sx={{ width: "320px" }} />
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              label="Password"
              sx={{ width: "320px", mt: "20px" }}
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
            <Button sx={{mt: "15px"}} isLoading={isLoading}>Login</Button>
          </Form>
        </Formik>
      </Box>
    </div>
  );
}
export default Login;
