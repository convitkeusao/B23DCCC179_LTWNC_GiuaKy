import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookCard from './BookCard';
import { Book } from '../features/books/booksTypes';
import { ThemeProvider } from '../context/ThemeContext';

const book: Book = {
  id: 'book-42',
  title: 'Lập trình TypeScript',
  author: 'Nguyễn Minh',
  category: 'CNTT',
  year: 2023,
  copies: 2,
};

function renderCard(props: React.ComponentProps<typeof BookCard>) {
  return render(
    <ThemeProvider>
      <BookCard {...props} />
    </ThemeProvider>,
  );
}

describe('BookCard', () => {
  test('shows the book information', () => {
    renderCard({ book, isBorrowed: false, onBorrow: jest.fn(), onReturn: jest.fn() });
    expect(screen.getByRole('heading', { name: book.title })).toBeInTheDocument();
    expect(screen.getByText('Tác giả: Nguyễn Minh')).toBeInTheDocument();
    expect(screen.getByText('Thể loại: CNTT')).toBeInTheDocument();
    expect(screen.getByText('Năm xuất bản: 2023')).toBeInTheDocument();
    expect(screen.getByText('Số bản còn: 2')).toBeInTheDocument();
  });

  test('calls the borrow handler with the book id', () => {
    const onBorrow = jest.fn();
    renderCard({ book, isBorrowed: false, onBorrow, onReturn: jest.fn() });
    userEvent.click(screen.getByRole('button', { name: 'Mượn' }));
    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('book-42');
  });

  test('disables borrowing when no copies are available', () => {
    renderCard({
      book: { ...book, copies: 0 },
      isBorrowed: false,
      onBorrow: jest.fn(),
      onReturn: jest.fn(),
    });
    expect(screen.getByRole('button', { name: 'Mượn' })).toBeDisabled();
  });
});
