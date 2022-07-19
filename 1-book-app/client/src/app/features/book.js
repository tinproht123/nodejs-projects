import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  isLoading: false,
  book: {},
  bookList: [],
  isBookError: false,
  bookErrorMsg: "",
};

export const createBook = createAsyncThunk(
  "/book/createBook",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/books", data);
      toast.success("Add book successed!");
      console.log(res.data.book);
      return res.data.book;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "/book/getAllBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/books");
      console.log(res.data);
      return res.data.results;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBook = createAsyncThunk(
  "/book/getBook",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/books/book/${id}`
      );
      console.log(res.data.book);
      return res.data.book;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "/book/deleteBook",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/books/book/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "/book/updateBook",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/books/book/${id}`,
        updateData
      );
      console.log(res.data);
      toast.success("Book has updated!");
      navigate(-1);
      return res.data.book;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    loadDefaultBookError: (state, action) => {
      state.isBookError = false;
    },
  },
  extraReducers: {
    //1. Create book
    [createBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    [createBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isBookError = true;
      state.bookErrorMsg = action.payload.message;
    },

    //2. Get all books
    [getAllBooks.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookList = action.payload;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isBookError = true;
      state.bookErrorMsg = action.payload.message;
    },

    //3. Get book with id
    [getBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isBookError = true;
      state.bookErrorMsg = action.payload.message;
    },

    //4. Delete book with id
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.books = state.books.filter((book) => book._id !== id);
      }
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isBookError = true;
      state.bookErrorMsg = action.payload.message;
    },

    //5. Update book with id
    [updateBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      const {
        arg: { id },
      } = action.meta;
      state.books = state.books.map((book) =>
        book._id === id ? action.payload : book
      );
    },
    [updateBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isBookError = true;
      state.bookErrorMsg = action.payload.message;
    },
  },
});

export default bookSlice.reducer;
export const { loadDefaultBookError } = bookSlice.actions;
