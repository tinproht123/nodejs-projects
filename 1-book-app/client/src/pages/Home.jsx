import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.book.bookErrorMsg);
  return (
    <Container>
      <Box
        sx={{ mt: "120px", maxWidth: "1100px", mx: "auto" }}
        className="animate__animated animate__fadeInUp"
      >
        <Typography
          variant="h2"
          sx={{ letterSpacing: 3, mb: 2 }}
          color="primary"
        >
          Bookipia
        </Typography>
        <Link
          to="/add-book"
          style={{ textDecoration: "none", color: "steelblue" }}
        >
          <Typography sx={{ display: "inline-block", mr: 2, fontSize: 18 }}>
            Add book ?
          </Typography>
        </Link>
        <Link
          to="/book-list"
          style={{ textDecoration: "none", color: "steelblue" }}
        >
          <Typography sx={{ display: "inline-block", fontSize: 18 }}>
            Book list
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
