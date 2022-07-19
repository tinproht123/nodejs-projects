import React, { useEffect, useState } from "react";
import { Container, Box, Typography, List, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../app/features/book";

import { Book } from "../components";

const BookList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const bookState = useSelector((state) => state.book);
  const { bookList } = bookState;

  return (
    <Container>
      <Box
        sx={{ mt: { lg: "100px", xs: "80px" }, maxWidth: "800px", mx: "auto" }}
      >
        <Typography variant="h3" sx={{ letterSpacing: 2 }} color="primary">
          Book List
        </Typography>
        <List>
          {bookList.map((book) => (
            <Book key={book._id} {...book} />
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BookList;
