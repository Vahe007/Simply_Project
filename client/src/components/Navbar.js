import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { classes } from "../styles/adminHomePageStyle";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";
import MainDialog from "./listOfUsers/dialogs/helpers/MainDialog";

function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    navigate("/login");
  };

  const dialogAttributes = {
    onConfirm: handleLogout,
    onClose: () => setOpen(false),
    title: "Are you sure you want to log out?",
    content: <Button onClick={handleLogout}>Confirm</Button>,
  }

  return (
    <nav className={classes.header}>
      {open && <MainDialog {...dialogAttributes} />}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to="main/users">
            <Button className={classes.buttonHeader}>USERS</Button>
          </Link>
          <Link to="main/materials">
            <Button className={classes.buttonHeader}>MATERIALS</Button>
          </Link>
          <Link to="main/contributors">
            <Button className={classes.buttonHeader}>CONTRIBUTORS</Button>
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
              <MenuItem onClick={() => setOpen(true)}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </Box>
    </nav>
  );
}

export default Navbar;
