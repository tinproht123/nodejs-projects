import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MustLogin = () => {
  return (
    <Box
      sx={{
        maxWidth: "600px",
        mx: "auto",
        mt: { lg: "150px", xs: "120px" },
        border: "1px solid ",
        borderRadius: 1,
        shadow: 3,
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        You must login to add book!
      </Typography>
      <Link to="/login" style={{ textDecoration: "none", color: "steelblue" }}>
        <Button>Login to Bookipia</Button>
      </Link>
    </Box>
  );
};

export default MustLogin;
