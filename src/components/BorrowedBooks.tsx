import React from 'react';
import { Book } from '../features/books/booksTypes';

type Props = {
  books: Book[];
  onReturn: (id: string) => void;
};

export function BorrowedBooks({ books, onReturn }: Props) {
  if (books.length === 0) return null;

  return (
    <section aria-labelledby="borrowed-heading">
      <h2 id="borrowed-heading">Sách đang mượn</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author}{' '}
            <button onClick={() => onReturn(book.id)}>Trả</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
