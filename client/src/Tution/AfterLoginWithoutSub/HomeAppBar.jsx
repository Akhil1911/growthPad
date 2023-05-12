import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearTuition } from "../../Store/tuition";
const HomeAppBar = () => {
  const cookies = new Cookies();
  const navigate = new useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "#254061", height: "auto" }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button
                onClick={()=>navigate("/tuition/home")}
                sx={{
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                GrowthPad
              </Button>
            </Typography>
            <Tooltip title="View Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Pic" src="" />
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
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate("/tuition/profile");
                }}
              >
                <Typography textAlign="center">My Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  cookies.remove("token");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default HomeAppBar;
