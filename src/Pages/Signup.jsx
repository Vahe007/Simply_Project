import React from "react";
import Header from "../components/Header.jsx";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../components/Button";

const Signup = () => {
  return (
    <div className="signup">
      <Header type="signup"/>
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
          Create Your Account
        </Typography>
        <TextField label="Name*" variant="outlined" sx={{ width: "320px" }} />
        <TextField
          label="Surname*"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
        />
        <TextField
          label="Email*"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
        />
        <TextField
          label="Password*"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          sx={{ width: "320px", mt: "25px" }}
        />
        <Btn text="Sign up" style={{ mt: "25px" }} />
      </Box>
    </div>
  );
};

export default Signup;
