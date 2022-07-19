import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import userReducer from "./features/user";
import bookReducer from "./features/book";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    book: bookReducer,
  },
});
