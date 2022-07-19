import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const SingleBook = () => {
  const getBook = async (id) => {
    const res = await axios.get("http://localhost:");
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Typography></Typography>
    </Box>
  );
};

export default SingleBook;
