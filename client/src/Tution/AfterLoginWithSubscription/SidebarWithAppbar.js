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


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#254061" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "bold" }}
          >
            <Link
              to={"/tHome"}
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "2rem",
              }}
            >
              Home
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">View Subscription</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
