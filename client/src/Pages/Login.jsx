import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../components/auth.js";
import { useNavigate, useParams } from "react-router-dom";
import store from "../app/store.js";
import Profile from "./Profile.jsx";
import { loadUser } from "../features/userAccess/userAccessSlice.js";
import { LocalTaxiTwoTone } from "@mui/icons-material";
import TextFields from "../components/FormsUI/TextField/index.js";
import { Form, Formik } from "formik";
import ProfileHeader from "../components/Header/ProfileHeader.js";

function Login({ type }) {
  const [isVisible, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });
  const dispatch = useDispatch();
  const auth = useAuth();

  const isLoading = useSelector((state) => {
    return state.userAccess.isLoading;
  });
  const stateToken = useSelector((state) => {
    return state.userAccess.token;
  });

  const error = localStorage.getItem("error");
  useEffect(() => {
    error ? setDisabled(true) : setDisabled(false);
  }, [error]);

  useEffect(() => {
    setToken(stateToken);
  }, [isLoading]);

  const changeVisibility = () => {
    setVisibility((prevState) => {
      return !prevState;
    });
  };
  const handleChange = (name, value) => {
    localStorage.removeItem("error");
    setState((prevState) => {
      return {
        ...prevState,
        [name]: {
          value: value,
          error: false,
        },
      };
    });
    setMessage("");
  };

  const handleClick = async () => {
    const keys = Object.keys(state);
    let flag = true;

    keys.forEach((key) => {
      if (state[key].value === "") {
        flag = false;
        setState((prevState) => {
          return {
            ...prevState,
            [key]: {
              value: "",
              error: true,
            },
          };
        });
      }
    });

    if (flag) {
      const body = {
        email: state.email.value,
        password: state.password.value,
      };
      await dispatch(loadUser({ body, type: "login" }));
      setMessage(localStorage.getItem("error"));
      if (store.getState().userAccess.token) {
        setState(() => {
          return {
            email: {
              value: "",
              error: false,
            },
            password: {
              value: "",
              error: false,
            },
          };
        });
        auth.login({});
      }
    }
  };

  if (auth.user) {
    return <Profile />;
  }
  return (
    <>
      <Formik>
        <Form>
          <TextFields name="email" label="Email" sx={{ width: "320px" }} />
        </Form>
      </Formik>
      <div className="login" style={{ overflowY: "hidden" }}>
        <ProfileHeader type="login" />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "150px",
            }}
          >
            <Typography
              sx={{ color: "#232968", fontWeight: 500 }}
              variant="h5"
              mb="50px"
            >
              {message || "Login to Your Account"}
            </Typography>

            <TextField
              error={state.email.error}
              value={state.email.value}
              required
              name="email"
              label="Email"
              variant="outlined"
              sx={{ width: "320px" }}
              onChange={({ target: { name, value } }) => {
                handleChange(name, value);
              }}
            />
            <TextField
              error={state.password.error}
              value={state.password.value}
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
              required
              type={isVisible ? "text" : "password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={{ width: "320px", mt: "25px" }}
              onChange={({ target: { name, value } }) => {
                handleChange(name, value);
              }}
            />
            <Btn
              isLoading={isLoading}
              disabled={disabled}
              onClick={handleClick}
              text="Login"
              style={{ mt: "25px" }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
export default Login;
