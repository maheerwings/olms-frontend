import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import Home from "./pages/Home";
import { fetchAllBooks } from "./store/slices/bookSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import {
  fetchAllBorrowedBooks,
  fetchUserBorrowBooks,
} from "./store/slices/borrowSlice";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchUserBorrowBooks());
    }
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/otp-verification/:email" element={<OTP />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer theme="dark" />
      </Router>
    </>
  );
};

export default App;
