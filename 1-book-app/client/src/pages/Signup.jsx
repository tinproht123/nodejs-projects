import React, { useState } from "react";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { register } from "../app/features/auth";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const { email, name, username, password, password2 } = signupData;

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.warning("Password not match");
      return;
    }
    dispatch(register({ data: signupData, navigate }));
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
          marginTop: { lg: "140px", xs: "100px" },
          marginBottom: "60px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", letterSpacing: 5, mb: 4 }}
          color="primary"
        >
          Sign up for new{" "}
          <Typography
            variant="h6 "
            color="error"
            sx={{ display: "inline-block", fontWeight: "bold" }}
          >
            Bookipia
          </Typography>{" "}
          account
        </Typography>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <TextField
            variant="outlined"
            label="Email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ mb: 1 }} fullWidth>
          <TextField
            variant="outlined"
            label="Your name"
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ mb: 1 }} fullWidth>
          <TextField
            variant="outlined"
            label="Username"
            helperText="Username must contained at least 6 letters"
            required
            name="username"
            value={username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ mb: 1 }} fullWidth>
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            helperText="Require number, uppercase letter, special character and must contained at least 5 letters"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <TextField
            variant="outlined"
            label="Confirm password"
            type="password"
            required
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          sx={{ letterSpacing: 3, mt: 2, py: 1 }}
          type="submit"
          fullWidth
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default Signup;
