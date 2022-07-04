import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth.js";
import { loadUser } from "../features/userAccess/userAccessSlice.js";

const Signup = () => {
  const [isVisible, setVisibility] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const auth = useAuth();
  const error = localStorage.getItem("error");

  useEffect(() => {
    error ? setDisabled(true) : setDisabled(false);

    // return () => {
    //   console.log("cleaned up");
    //   localStorage.removeItem("error");
    // };
  }, [error]);

  const isLoading = useSelector((state) => {
    return state.signup.isLoading;
  });

  const [state, setState] = useState({
    name: {
      value: "",
      isRed: false,
    },
    surname: {
      value: "",
      isRed: false,
    },
    email: {
      value: "",
      isRed: false,
    },
    password: {
      value: "",
      isRed: false,
    },
    phone: {
      value: "",
      isRed: false,
    },
  });
  //handle second error with useEffect
  const handleRegistration = async () => {
    const keys = Object.keys(state);
    let flag = true;
    keys.forEach((key) => {
      if (key !== "phone" && state[key].value === "") {
        flag = false;
        setState((prevState) => {
          return {
            ...prevState,
            [key]: {
              value: "",
              isRed: true,
            },
          };
        });
      }
    });

    if (flag) {
      const body = {
        name: state.name.value,
        surname: state.surname.value,
        email: state.email.value,
        password: state.password.value,
        phoneNumber: state.phone.value || null,
      };
      await dispatch(loadUser({ body, type: "registration" }));
      setMessage(localStorage.getItem("error"));

      // setState({
      //   name: {
      //     value: "",
      //     isRed: false,
      //   },
      //   surname: {
      //     value: "",
      //     isRed: false,
      //   },
      //   email: {
      //     value: "",
      //     isRed: false,
      //   },
      //   password: {
      //     value: "",
      //     isRed: false,
      //   },
      //   phone: {
      //     value: "",
      //     isRed: false,
      //   },
      // });
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setMessage("");
    localStorage.removeItem("error");
    setState((prevState) => {
      return {
        ...prevState,
        [name]: {
          value,
          isRed: false,
        },
      };
    });
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "50px",
        }}
      >
        <Typography
          sx={{ color: "#232968", fontWeight: 500 }}
          variant="h5"
          mb="50px"
        >
          {message || "Create Your Account"}
        </Typography>
        <TextField
          error={state.name.isRed}
          value={state.name.value}
          required
          label="Name"
          name="name"
          variant="outlined"
          sx={{ width: "320px" }}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          error={state.surname.isRed}
          value={state.surname.value}
          required
          label="Surname"
          name="surname"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          error={state.email.isRed}
          value={state.email.value}
          required
          label="Email"
          name="email"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          error={state.password.isRed}
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
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          value={state.phone.value}
          label="Phone"
          name="phone"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Btn
          isLoading={isLoading}
          disabled={disabled}
          onClick={handleRegistration}
          text="Sign up"
          style={{ mt: "25px" }}
        />
      </Box>
    </div>
  );
};

export default Signup;
