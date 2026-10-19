import { createSlice } from '@reduxjs/toolkit';
import { borrowBook, returnBook } from '../books/booksSlice';

type BorrowedState = {
  ids: string[];
};

const initialState: BorrowedState = { ids: [] };

const borrowedSlice = createSlice({
  name: 'borrowed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook, (state, action) => {
        if (!state.ids.includes(action.payload)) {
          state.ids.push(action.payload);
        }
      })
      .addCase(returnBook, (state, action) => {
        state.ids = state.ids.filter((id) => id !== action.payload);
      });
  },
});

export default borrowedSlice.reducer;
