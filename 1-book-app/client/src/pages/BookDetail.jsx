import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../app/features/book";

//redux
import { deleteBook } from "../app/features/book";
import { Container } from "@mui/system";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const BookDetail = () => {
  //for alert
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook({ id: id }));
  }, [dispatch]);

  const bookState = useSelector((state) => state.book);
  const { book } = bookState;

  const {
    _id,
    bookName,
    authorName,
    publishedCountry,
    publishedYear,
    description,
    bookGenres,
    bookRating,
  } = book;

  return (
    <Container>
      <Box
        sx={{
          my: { lg: "100px", xs: "80px" },
          maxWidth: "1100px",
          mx: "auto",
          lineHeight: 3,
        }}
      >
        <Link to="/book-list" style={{ textDecoration: "none" }}>
          <Typography> {"<< Back"}</Typography>
        </Link>
        <Typography variant="h4" sx={{ my: 1, letterSpacing: 1, mb: 2 }}>
          {bookName}
        </Typography>
        <Typography variant="h6" mb={1}>
          Author: {authorName}
        </Typography>
        <Typography mb={1}>Country: {publishedCountry}</Typography>
        <Typography sx={{ fontStyle: "italic", mb: 1 }}>
          Published year: {new Date(publishedYear).getFullYear()}
        </Typography>
        <Typography mb={2}>
          Genres:{" "}
          {bookGenres?.map((genre) => (
            <Chip key={genre} label={genre} sx={{ mr: 1 }} />
          ))}
        </Typography>
        <Typography mb={2}>
          <Stack direction="row">
            Rating
            <Rating value={bookRating} readOnly precision={0.1} /> {bookRating}
          </Stack>
        </Typography>
        <Typography mb={1}>--Description--: {description}</Typography>

        {/* Delete and Edit button */}
        <Link to="/edit-book" style={{ textDecoration: "none" }}>
          <Button
            sx={{ textTransform: "capitalize", mt: 3, mr: 2 }}
            variant="contained"
            color="success"
          >
            Edit
          </Button>
        </Link>
        <Button
          sx={{ textTransform: "capitalize", mt: 3 }}
          variant="contained"
          color="error"
          onClick={() => setOpenAlert(true)}
        >
          Delete
        </Button>
        {/*Alert when you about to delete the book */}
        <Dialog
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          sx={{ py: 2 }}
        >
          <DialogTitle>{"Are you sure want to delete this book?"}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setOpenAlert(false)}
              color="primary"
              autoFocus
              variant="contained"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setOpenAlert(false);
                dispatch(deleteBook({ id: _id }));
                toast.success(`${bookName} has deleted!`);
                navigate("/book-list");
              }}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default BookDetail;
