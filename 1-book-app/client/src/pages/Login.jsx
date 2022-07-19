import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../app/features/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const { user } = authState;

  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const { username, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ data: loginData, navigate }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          boxShadow: 3,
          p: 3,
          mx: "auto",
          borderRadius: 3,
          maxWidth: "500px",
          width: "100%",
          marginTop: { lg: "140px", xs: "120px" },
          marginBottom: "60px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            letterSpacing: 5,
            mb: 3,
          }}
          color="primary"
        >
          Login to{" "}
          <Typography
            variant="h4"
            color="error"
            sx={{ display: "inline-block", fontWeight: "bold" }}
          >
            Bookipia
          </Typography>
        </Typography>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <TextField
            variant="standard"
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>
        <FormControl sx={{ mb: 4 }} fullWidth>
          <TextField
            variant="standard"
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fullWidth
            type="password"
            required
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            fontSize: { lg: 14, xs: 12 },
            letterSpacing: 3,
            mb: 3,
          }}
          type="submit"
        >
          Login
        </Button>
        <Stack direction="row" justifyContent="center">
          <Button color="error" sx={{ textTransform: "none" }}>
            Forget your password?
          </Button>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button sx={{ textTransform: "none" }}>Sign up</Button>
          </Link>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
