import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { classes } from "../styles/adminHomePageStyle";
import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {  getUserInfo } from "../features/userAccess/selectors.js";

import Grid from '@mui/material/Grid';
import {  TextField } from '@material-ui/core';

function Navbar() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const userInfo = useSelector(getUserInfo);
  const { role } = userInfo;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    navigate('/login');

  }
  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
}
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className={classes.header}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {  role==='ADMIN' &&      <div>
          <Link to="main/users">
            <Button className={classes.buttonHeader}>USERS</Button>
          </Link>
          <Link to="main/materials">
            <Button className={classes.buttonHeader}>MATERIALS</Button>
          </Link>
        </div>
      }

      {
        role === 'GUEST' &&         <Grid item xs={12}>
        <TextField
            fullWidth
            onChange={handleSearch}
            value={query}
            id="standard-bare"
            variant="outlined"
            defaultValue="How can we help"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
    </Grid>
      }

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
