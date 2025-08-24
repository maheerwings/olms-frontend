import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left Section */}
        <div className="hidden w-full md:w-1/2 bg-[#689F38] text-white md:flex 
        flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[450px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo-with-title"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl 
            font-medium leading-10">
              "Your premier digital library for borrowing and reading books"
            </h3>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center 
        justify-center bg-white p-8 relative">
          <Link
            to={"/login"}
            className="border-2 border-[#689F38] rounded-3xl font-bold w-52 py-2 
            px-4 fixed top-10 -right-28 hover:bg-[#689F38] hover:text-white 
            transition duration-300"
          >
            Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
              Forgot Password
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your email
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-[#689F38] rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading ? true : false}
                className="border-2 mt-5 py-3 border-[#689F38] w-full font-semibold bg-[#689F38] 
                text-white rounded-lg hover:bg-white hover:text-[#689F38] transition"
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
