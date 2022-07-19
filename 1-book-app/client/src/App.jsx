import React, { useEffect } from "react";

//router
import { Routes, Route } from "react-router-dom";

//pages
import {
  Home,
  Login,
  Signup,
  UserProfile,
  AddBook,
  BookList,
  BookDetail,
  MustLogin,
  EditForm,
} from "./pages";

//components
import { Navbar } from "./components";

//toastify
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { loadDefaultUserError } from "./app/features/auth";
import { loadDefaultBookError } from "./app/features/book";

const App = () => {
  const authState = useSelector((state) => state.auth);
  const bookState = useSelector((state) => state.book);
  const { isUserError, userErrorMsg } = authState;
  const { isBookError, bookErrorMsg } = bookState;

  const dispatch = useDispatch();

  //auth error
  useEffect(() => {
    if (isUserError) {
      toast.error(userErrorMsg);
      dispatch(loadDefaultUserError());
    }
  }, [isUserError]);

  //book error
  useEffect(() => {
    if (isBookError) {
      toast.error(bookErrorMsg);
      dispatch(loadDefaultBookError());
    }
  }, [isBookError]);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index={true} element={<Home />} />
          <Route index={false} path="login" element={<Login />} />
          <Route index={false} path="signup" element={<Signup />} />
          <Route index={false} path="user/:id" element={<UserProfile />} />
          <Route index={false} path="add-book" element={<AddBook />} />
          <Route index={true} path="book-list" element={<BookList />} />
          <Route
            index={false}
            path="book-list/book/:id"
            element={<BookDetail />}
          />
          <Route index={false} path="must-login" element={<MustLogin />} />
          <Route index={false} path="edit-book" element={<EditForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
