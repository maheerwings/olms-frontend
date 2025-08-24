import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteBookRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.books = state.books.filter(
        (book) => book._id !== action.payload.bookId
      );
    },

    deleteBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetBookSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/book/all", { withCredentials: true })
    .then((response) => {
      dispatch(bookSlice.actions.fetchBooksSuccess(response.data.books));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.fetchBooksFailed(error.response.data.message));
    });
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post("http://localhost:4000/api/v1/book/admin/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      dispatch(bookSlice.actions.addBookSuccess(response.data.message));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
    });
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.deleteBookRequest());
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/book/delete/${bookId}`,
      { withCredentials: true }
    );
    dispatch(
      bookSlice.actions.deleteBookSuccess({ message: data.message, bookId })
    );
  } catch (error) {
    dispatch(bookSlice.actions.deleteBookFailed(error.response.data.message));
  }
};

export const resetBookSlice = () => async (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
