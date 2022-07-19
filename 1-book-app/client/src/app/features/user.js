import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  errorMsg: "",
};

export const getUser = createAsyncThunk(
  "/user/getUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
      console.log(res.data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
  },
});

export default userSlice.reducer;
