import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  Chip,
  MenuItem,
  FormHelperText,
  Rating,
} from "@mui/material";

//mui datepickers
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { createBook } from "../app/features/book";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import bookTypes from "../db/type";
import countries from "../db/country";

//component
const AddBook = () => {
  const navigate = useNavigate();
  const isUserActive = useSelector((state) => state.auth.isUserActive);

  useEffect(() => {
    if (!isUserActive) {
      navigate("/must-login");
    }
  }, []);

  const dispatch = useDispatch();

  const [bookValue, setBookValue] = useState({
    bookName: "",
    description: "",
    authorName: "",
    bookGenres: [],
    publishedCountry: "Afghanistan",
    publishedYear: "2022",
    bookLikeNumber: 0,
    bookRating: 4.5,
  });

  const {
    bookName,
    description,
    authorName,
    bookGenres,
    publishedCountry,
    publishedYear,
    bookLikeNumber,
    bookRating,
  } = bookValue;

  const [hover, setHover] = useState(bookRating);
  //for rating component only

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createBook({ data: bookValue }));

    console.log(bookValue);

    setBookValue({
      bookName: "",
      description: "",
      authorName: "",
      bookGenres: [],
      publishedCountry: "Afghanistan",
      publishedYear: "2022",
      bookLikeNumber: 0,
      bookRating: 4.5,
    });
  };

  const handleChange = (e) => {
    setBookValue({ ...bookValue, [e.target.name]: e.target.value });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            boxShadow: 3,
            p: 3,
            mx: "auto",
            borderRadius: 3,
            maxWidth: "500px",
            width: "100%",
            marginTop: { lg: "140px", xs: "40px" },
            marginBottom: "60px",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Add book Form
          </Typography>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <TextField
              variant="outlined"
              label="Book name"
              name="bookName"
              value={bookName}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <TextField
              variant="outlined"
              label="Author name"
              name="authorName"
              value={authorName}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              multiline
              rows={5}
              value={description}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel>Book type</InputLabel>
            <Select
              multiple
              name="bookGenres"
              value={bookGenres}
              onChange={(e) => {
                setBookValue({
                  ...bookValue,
                  bookGenres:
                    typeof e.target.value === "string"
                      ? e.target.value.split(", ")
                      : e.target.value,
                });
              }}
              input={<OutlinedInput label="Book genres" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {bookTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>You can choose more than 1 genres</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel>Published country</InputLabel>
            <Select
              value={publishedCountry}
              onChange={handleChange}
              label="Published country"
              name="publishedCountry"
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <DatePicker
              views={["year"]}
              label="Published year"
              value={publishedYear}
              onChange={(newValue) => {
                setBookValue({ ...bookValue, publishedYear: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <TextField
              variant="outlined"
              label="Like number"
              name="bookLikeNumber"
              value={bookLikeNumber}
              onChange={handleChange}
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              helperText="Number the likes of the book"
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <Typography sx={{ color: "#00000099", mb: 1 }}>
              Book rating
            </Typography>
            <Rating
              name="bookRating"
              precision={0.1}
              value={bookRating}
              onChange={handleChange}
              onChangeActive={(e, newHover) => {
                setHover(newHover);
              }}
            />
            <Typography sx={{ my: 1 }}>
              {hover !== -1 ? hover : bookRating}
            </Typography>
          </FormControl>
          <Button type="submit">Submit</Button>
          <Button
            onClick={() => {
              console.log(new Date().getFullYear());
            }}
          >
            Year
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default AddBook;
