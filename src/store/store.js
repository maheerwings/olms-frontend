import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import borrowReducer from "./slices/borrowSlice";
import bookReducer from "./slices/bookSlice";
import userReducer from "./slices/userSlice";
import popupReducer from "./slices/popUpSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    borrow: borrowReducer,
    book: bookReducer,
    user: userReducer,
    popup: popupReducer,
  },
});
