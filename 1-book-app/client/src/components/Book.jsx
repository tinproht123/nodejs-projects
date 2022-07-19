import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

const Book = (props) => {
  //for readmore button
  const [readmore, setReadmore] = useState(false);
  const {
    _id,
    bookName,
    authorName,
    publishedCountry,
    publishedYear,
    description,
  } = props;
  return (
    <Box
      key={_id}
      sx={{
        border: "2px solid",
        borderRadius: "4px",
        p: 2,
        my: 2,
      }}
    >
      <Typography variant="h4" sx={{ my: 1, letterSpacing: 1 }}>
        {bookName}
      </Typography>
      <Typography variant="h6">Author: {authorName}</Typography>
      <Typography>Country: {publishedCountry}</Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Published year: {new Date(publishedYear).getFullYear()}
      </Typography>
      <Typography>
        --Description--:{" "}
        {readmore ? description : `${description.substring(0, 200)}...`}
        <Button
          color="error"
          sx={{ textTransform: "lowercase" }}
          onClick={() => {
            setReadmore(!readmore);
          }}
        >
          {readmore ? "show less" : "read more"}
        </Button>
      </Typography>
      <Link to={`/book-list/book/${_id}`}>Details</Link>
    </Box>
  );
};

export default Book;
