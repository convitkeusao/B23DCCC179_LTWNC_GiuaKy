import React from 'react';
import { Book } from '../features/books/booksTypes';
import BookCard from './BookCard';

type Props = {
  books: Book[];
  borrowedIds: string[];
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
};

export function BookList({ books, borrowedIds, onBorrow, onReturn }: Props) {
  if (books.length === 0) return <p>Không tìm thấy sách phù hợp.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={onBorrow}
          onReturn={onReturn}
        />
      ))}
    </div>
  );
}
