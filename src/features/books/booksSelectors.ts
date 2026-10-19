import { RootState } from '../../app/store';

export const selectBooks = (state: RootState) => state.books.items;
export const selectBorrowedIds = (state: RootState) => state.borrowed.ids;