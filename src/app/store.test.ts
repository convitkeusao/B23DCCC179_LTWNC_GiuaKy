import { makeStore } from './store';
import { borrowBook, returnBook } from '../features/books/booksSlice';
import { loadBooks } from '../features/books/booksThunks';
import { Book } from '../features/books/booksTypes';

const books: Book[] = Array.from({ length: 4 }, (_, index) => ({
  id: `book-${index + 1}`,
  title: `Sách ${index + 1}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2024,
  copies: 2,
}));

test('blocks the fourth concurrent borrow and allows return', () => {
  const store = makeStore();
  store.dispatch(loadBooks.fulfilled(books, 'req-1', undefined));

  store.dispatch(borrowBook('book-1'));
  store.dispatch(borrowBook('book-2'));
  store.dispatch(borrowBook('book-3'));
  store.dispatch(borrowBook('book-4'));

  expect(store.getState().borrowed.ids).toHaveLength(3);
  expect(store.getState().books.items[3].copies).toBe(2);

  store.dispatch(returnBook('book-1'));
  expect(store.getState().borrowed.ids).toHaveLength(2);
  expect(store.getState().books.items[0].copies).toBe(2);
});
