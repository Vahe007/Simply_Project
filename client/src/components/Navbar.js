import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { classes } from "../styles/adminHomePageStyle";
import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";

function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = Cookies.get('token');
  const navigate = useNavigate();



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    console.log('okokookko');
    Cookies.remove('token');
    Cookies.remove('id');
    navigate('/login');

  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className={classes.header}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to="main/users">
            <Button className={classes.buttonHeader}>USERS</Button>
          </Link>
          <Link to="main/materials">
            <Button className={classes.buttonHeader}>MATERIALS</Button>
          </Link>
        </div>

        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </Box>
    </nav>
  );
}

export default Navbar;
