import React, { useEffect } from "react";
import { Container, Box, Typography, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getUser } from "../app/features/user";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser({ id: id }));
  }, []);

  const user = useSelector((state) => state.user.user);
  const { name, username, email } = user;

  return (
    <Container>
      <Box sx={{ mt: { lg: "140px", xs: "120px" } }}>
        <Typography variant="h4">{name}'s Profile</Typography>
        <Typography>Username: {username}</Typography>
        <Typography>Email: {email}</Typography>
      </Box>
    </Container>
  );
};

export default UserProfile;
