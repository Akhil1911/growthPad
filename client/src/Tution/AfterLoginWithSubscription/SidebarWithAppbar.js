import * as React from "react";
import { styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import Cookies from "universal-cookie"
import {useNavigate} from "react-router-dom"
import { clearTuition } from "../../Store/tuition";
import {useDispatch} from "react-redux"
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function SidebarWithAppbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const cookies = new Cookies()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static" open={open} sx={{ backgroundColor: "#254061" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            href=""
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Link
              to={"/tuition/subscribed/home"}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              GrowthPad
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
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
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">View Subscription</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  cookies.remove("token");
                  navigate("/login");
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJfaWQiOiI2NDU2NmI0MzI2NTkyMTNjYjY1ZmIwOTAiLCJpYXQiOjE2ODM3MDYwMzR9
//   .u92e4rhrM5lymZPaJlrhsqgDGTDhWpckm_iiWS7JqLw;
