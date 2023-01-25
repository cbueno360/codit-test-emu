import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMsal } from "@azure/msal-react";

export const AppBar = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { accounts } = useMsal();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Codit Exam Test
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages?.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
              {!!isAuthenticated && (
                <MenuItem key={"logout"} onClick={logout}>
                  <Typography textAlign="center">
                    {" "}
                    {accounts[0].username}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
            {!!isAuthenticated && (
              <Button
                key={"logout"}
                onClick={logout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"logout"}
              </Button>
            )}
          </Box>
          <Box>
            {!!isAuthenticated && (
              <Button
                key={"user"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Hello, {accounts[0].name}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
