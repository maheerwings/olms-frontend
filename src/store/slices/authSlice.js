import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleSettingPopup } from "./popUpSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    otpVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.user = null;
      state.message = action.payload;
      state.isAuthenticated = false;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(authSlice.actions.registerSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response.data.message));
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/auth/otp-verification",
      { email, otp },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.otpVerificationFailed(error.response.data.message)
      );
    });
};

export const login = (data) => (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  axios
    .post("http://localhost:4000/api/v1/auth/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(authSlice.actions.loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(error.response.data.message));
    });
};

export const logout = () => (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  axios
    .get("http://localhost:4000/api/v1/auth/logout", {
      withCredentials: true,
    })
    .then((response) => {
      dispatch(authSlice.actions.logoutSuccess(response.data.message));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailed(error.response.data.message));
    });
};

export const getUser = () => (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  axios
    .get("http://localhost:4000/api/v1/auth/me", {
      withCredentials: true,
    })
    .then((response) => {
      dispatch(authSlice.actions.getUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.getUserFailed(error.response.data.message));
    });
};

export const forgotPassword = (email) => (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  axios
    .post(
      "http://localhost:4000/api/v1/auth/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(response.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.forgotPasswordFailed(error.response.data.message)
      );
    });
};

export const resetPassword = (data, token) => (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  axios
    .put(`http://localhost:4000/api/v1/auth/password/reset/${token}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(authSlice.actions.resetPasswordSuccess(response.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.resetPasswordFailed(error.response.data.message)
      );
    });
};

export const updatePassword = (data) => (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  axios
    .put(`http://localhost:4000/api/v1/auth/password/update`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(authSlice.actions.updatePasswordSuccess(response.data.message));
      dispatch(toggleSettingPopup());
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    });
};

export default authSlice.reducer;
