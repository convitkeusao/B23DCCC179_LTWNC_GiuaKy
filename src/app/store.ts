import { configureStore, Middleware } from '@reduxjs/toolkit';
import booksReducer, { borrowBook, returnBook } from '../features/books/booksSlice';
import borrowedReducer from '../features/borrowed/borrowedSlice';
import { BooksState } from '../features/books/booksTypes';

type BorrowedState = {
  ids: string[];
};

export type RootState = {
  books: BooksState;
  borrowed: BorrowedState;
};

const borrowLimit: Middleware<{}, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (borrowBook.match(action)) {
      const state = getState();
      if (state.borrowed.ids.length >= 3) return action;
      if (
        state.borrowed.ids.includes(action.payload) ||
        !state.books.items.some((book) => book.id === action.payload && book.copies > 0)
      ) return action;
    }
    if (returnBook.match(action) && !getState().borrowed.ids.includes(action.payload)) {
      return action;
    }
    return next(action);
  };

export const makeStore = () =>
  configureStore({
    reducer: {
      books: booksReducer,
      borrowed: borrowedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(borrowLimit),
  });

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;