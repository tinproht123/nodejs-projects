import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";

//mui icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/features/auth";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUserActive, user } = authState;

  const handleLogout = () => {
    dispatch(logout({ navigate }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                flexGrow: 1,
              }}
            >
              <Stack direction="row">
                <MenuBookIcon fontSize="large" />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  BOOKIPIA
                </Typography>
              </Stack>
            </Link>
            {isUserActive ? (
              <Stack direction="row" alignItems="center">
                <Link
                  to={`/user/${user._id}`}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    color: "#fff",
                  }}
                >
                  <AccountCircleIcon />
                  <Typography sx={{ ml: 2 }}>{user.name}</Typography>
                </Link>
                <Button
                  onClick={handleLogout}
                  sx={{ textTransform: "capitalize", color: "#fff", ml: 2 }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Logout</Typography>
                </Button>
              </Stack>
            ) : (
              <Stack direction="row">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">Login</Typography>
                </Link>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginInline: "20px",
                  }}
                >
                  <Typography variant="h6">Sign up</Typography>
                </Link>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
