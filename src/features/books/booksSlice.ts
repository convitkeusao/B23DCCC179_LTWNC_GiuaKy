import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadBooks } from './booksThunks';
import { BooksState, BookPatch } from './booksTypes';

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book && book.copies > 0) {
        const patch: BookPatch = { copies: book.copies - 1 };
        Object.assign(book, patch);
      }
    },
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book) {
        const patch: BookPatch = { copies: book.copies + 1 };
        Object.assign(book, patch);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Đã xảy ra lỗi khi tải sách.';
      });
  },
});

export const { borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;