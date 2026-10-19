import React, { memo } from 'react';
import { Book } from '../features/books/booksTypes';

type Props = {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
};

function BookCard({ book, isBorrowed, onBorrow, onReturn }: Props) {
  return (
    <article style={{
      border: '1px solid currentColor',
      borderRadius: 4,
      padding: 16,
      color: 'inherit',
      background: 'Canvas',
    }}>
      <h2>{book.title}</h2>
      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.category}</p>
      <p>Năm xuất bản: {book.year}</p>
      <p>Số bản còn: {book.copies}</p>
      {isBorrowed ? (
        <button onClick={() => onReturn(book.id)}>Trả</button>
      ) : (
        <button onClick={() => onBorrow(book.id)} disabled={book.copies === 0}>
          Mượn
        </button>
      )}
    </article>
  );
}

export default memo(BookCard);
