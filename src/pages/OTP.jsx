import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to={"/login"}
            className="border-2 border-[#689F38] rounded-3xl font-bold w-52 py-2 px-4 fixed 
            top-10 -left-28 hover:bg-[#689F38] hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Check you Mailbox
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full px-4 py-3 border border-[#689F38] rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 py-3 border-[#689F38] w-full font-semibold bg-[#689F38] 
                text-white rounded-lg hover:bg-white hover:text-[#689F38] transition"
              >
                VERIFY
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="hidden w-full md:w-1/2 bg-[#689F38] text-white md:flex flex-col 
        items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]"
        >
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo-with-title"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              New to our platform? Sign Up now.
            </p>
            <Link
              to={"/register"}
              className="border-white px-8 hover:bg-white hover:text-[#689F38] transition 
              border-2 mt-5 py-3  w-full font-semibold bg-[#689F38] text-white rounded-lg"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
