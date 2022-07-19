import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  isLoading: false,
  isUserError: false,
  userErrorMsg: "",
  isUserActive: false,
};

export const login = createAsyncThunk(
  "/auth/login",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data
      );
      toast.success("Login successfully!");
      navigate("/");

      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/logout");
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "/auth/register",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", data);
      toast.success("Sign up successfully! Now you can login in Bookipia");
      navigate("/login");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadDefaultUserError: (state, action) => {
      state.isUserError = false;
    },
  },
  extraReducers: {
    //1. Login
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isUserActive = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isUserError = true;
      state.userErrorMsg = action.payload.message;
    },

    //2. Register
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [register.rejected]: (state, action) => {
      state.isUserError = true;
      state.userErrorMsg = action.payload.message;
    },

    //3. Logout
    [logout.pending]: (state, action) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = {};
      state.isUserActive = false;
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      state.isUserError = true;
      state.userErrorMsg = action.payload.message;
    },
  },
});

export default authSlice.reducer;
export const { loadDefaultUserError } = authSlice.actions;
