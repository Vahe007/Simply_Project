import * as React from "react";
import Header from "../components/Header.jsx";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../components/Button";

function Login({ type }) {
    return (
      <div className="login">
        <Header type="login"/>
        <Container
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
              Login to your account
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "320px" }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ width: "320px", mt: "25px" }}
            />
            <Btn text="Login" style={{ mt: "25px" }} />
          </Box>
        </Container>
      </div>
    );
}
export default Login;
