import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeStore } from '../app/store';
import { ThemeProvider } from '../context/ThemeContext';
import { loadBooks } from '../features/books/booksThunks';
import { Book } from '../features/books/booksTypes';
import { BooksPage } from './BooksPage';

const book: Book = {
  id: 'book-1',
  title: 'Sách thử',
  author: 'Tác giả thử',
  category: 'CNTT',
  year: 2024,
  copies: 2,
};

test('asks for confirmation before borrowing', () => {
  const store = makeStore();
  store.dispatch(loadBooks.fulfilled([book], 'test', undefined));

  render(
    <Provider store={store}>
      <ThemeProvider>
        <BooksPage />
      </ThemeProvider>
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: 'Mượn' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('Bạn có chắc chắn muốn mượn "Sách thử" không?');
  expect(store.getState().books.items[0].copies).toBe(2);

  userEvent.click(screen.getByRole('button', { name: 'Hủy' }));
  expect(store.getState().books.items[0].copies).toBe(2);

  userEvent.click(screen.getByRole('button', { name: 'Mượn' }));
  userEvent.click(screen.getByRole('button', { name: 'Xác nhận mượn' }));
  expect(store.getState().books.items[0].copies).toBe(1);
});

test('switches the page to dark mode', () => {
  const store = makeStore();
  store.dispatch(loadBooks.fulfilled([book], 'test', undefined));

  render(
    <Provider store={store}>
      <ThemeProvider>
        <BooksPage />
      </ThemeProvider>
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: 'Giao diện tối' }));
  expect(screen.getByRole('main')).toHaveStyle({
    colorScheme: 'dark',
    background: 'rgb(23, 23, 23)',
    color: 'rgb(245, 245, 245)',
  });
  expect(screen.getByRole('button', { name: 'Giao diện sáng' })).toBeInTheDocument();
});

test('shows a modal instead of borrowing when three books are already borrowed', () => {
  const store = makeStore();
  const books: Book[] = Array.from({ length: 4 }, (_, index) => ({
    ...book,
    id: `book-${index + 1}`,
    title: `Sách ${index + 1}`,
  }));
  store.dispatch(loadBooks.fulfilled(books, 'test', undefined));
  store.dispatch({ type: 'books/borrowBook', payload: 'book-1' });
  store.dispatch({ type: 'books/borrowBook', payload: 'book-2' });
  store.dispatch({ type: 'books/borrowBook', payload: 'book-3' });

  render(
    <Provider store={store}>
      <ThemeProvider>
        <BooksPage />
      </ThemeProvider>
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: 'Mượn' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('Bạn đã mượn tối đa 3 cuốn sách.');
  expect(screen.getByRole('button', { name: 'Đã hiểu' })).toBeInTheDocument();
  expect(store.getState().books.items[3].copies).toBe(2);
});
