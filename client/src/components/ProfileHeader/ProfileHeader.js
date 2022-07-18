import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "../Avatar/Avatar";
import Logo from "../../assets/Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserInfo } from "../../redux/features/userAccess/selectors";
import Cookies from "js-cookie";
import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog";
import Button from "../FormsUI/Button";


const ProfileHeader = () => {
  const userInfo = useSelector(getUserInfo)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const name = userInfo.firstName;
  const surname = userInfo.lastName;
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleClose = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onProfileClick = () => {
    navigate('/settings');
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    <AppBar position="static">
      {open && <MainDialog {...dialogAttributes} />}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 80,
              mr: 2,    
              display: { xs: "none", md: "flex" },
            }}
            alt="Logo"
            src={Logo}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "none", md: "flex" },
              fontFamily: "Source Serif Pro",
              fontWeight: 600,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HISTORY MUSEUM OF ARMENIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
          <Box
            component="img"
            sx={{
              height: 80,
              mr: 2,
              display: { xs: "flex", md: "none" },
            }}
            alt="Logo"
            src={Logo}
          />

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Source Serif Pro",
              fontWeight: 400,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HISTORY MUSEUM OF ARMENIA
          </Typography> */}

          {/* <Typography
            variant="h5"
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none", md: "none" },
              flexGrow: 1,
              fontFamily: "Source Serif Pro",
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HISTORY MUSEUM OF ARMENIA
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar name={name} surname={surname} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleClose}
            >
              <MenuItem onClick={onProfileClick}>Profile</MenuItem>
              <MenuItem onClick={() => setOpen(true)}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ProfileHeader;