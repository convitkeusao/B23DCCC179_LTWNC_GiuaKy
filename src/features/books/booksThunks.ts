import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks, isApiFail } from '../../api/booksApi';
import { Book } from './booksTypes';

export const loadBooks = createAsyncThunk<
  Book[],
  boolean | undefined,
  { rejectValue: string }
>('books/load', async (fail, { rejectWithValue }) => {
  const result = await getBooks(fail);
  if (isApiFail(result)) return rejectWithValue(result.error);
  return result.data;
});