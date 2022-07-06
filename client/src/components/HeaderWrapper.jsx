import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function Header({ type }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const path = type === "login" ? "/signup" : "/login";
    navigate(path);
  };

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography endicon={<LoginIcon />} variant="h6" component="div">
            Website Title
          </Typography>
          <ButtonGroup style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "16px" }}>
              {type === "login"
                ? "Don’t have an account?"
                : "Already have an account?"}
            </div>
            <Button
              startIcon={<LoginIcon />}
              variant="outlined"
              style={{ border: "1px solid white", color: "white" }}
              color="primary"
              onClick={handleNavigation}
            >
              {type === "login" ? "Sign UP" : "Login"}
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
