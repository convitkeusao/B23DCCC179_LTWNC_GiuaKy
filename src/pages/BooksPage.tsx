import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BorrowedBooks } from '../components/BorrowedBooks';
import { BookList } from '../components/BookList';
import { ConfirmModal } from '../components/ConfirmModal';
import { FilterBar } from '../components/FilterBar';
import { PageLayout } from '../components/PageLayout';
import { SearchBar } from '../components/SearchBar';
import { borrowBook, returnBook } from '../features/books/booksSlice';
import { loadBooks } from '../features/books/booksThunks';
import { Book } from '../features/books/booksTypes';
import { useDebounce } from '../hooks/useDebounce';
import { useAppStore } from '../store/useAppStore';

type PendingAction = { book: Book; type: 'borrow' | 'return' };

export function BooksPage() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.items);
  const status = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);
  const borrowedIds = useAppSelector((state) => state.borrowed.ids);
  const term = useAppStore((state) => state.term);
  const category = useAppStore((state) => state.category);
  const sortBy = useAppStore((state) => state.sortBy);
  const debouncedTerm = useDebounce(term, 300);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [limitModal, setLimitModal] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (status === 'idle' && !loaded.current) {
      loaded.current = true;
      dispatch(loadBooks());
    }
  }, [dispatch, status]);

  const filteredBooks = useMemo(() => {
    const query = debouncedTerm.trim().toLocaleLowerCase();
    return books
      .filter((book) => category === 'all' || book.category === category)
      .filter((book) =>
        !query ||
        book.title.toLocaleLowerCase().includes(query) ||
        book.author.toLocaleLowerCase().includes(query),
      )
      .sort((a, b) =>
        sortBy === 'year'
          ? b.year - a.year || a.title.localeCompare(b.title, 'vi')
          : a.title.localeCompare(b.title, 'vi'),
      );
  }, [books, category, debouncedTerm, sortBy]);
  const borrowedBooks = useMemo(
    () => books.filter((book) => borrowedIds.includes(book.id)),
    [books, borrowedIds],
  );

  const askBorrow = useCallback(
    (id: string) => {
      if (borrowedIds.length >= 3) {
        setLimitModal(true);
        return;
      }
      const book = books.find((item) => item.id === id);
      if (book) setPending({ book, type: 'borrow' });
    },
    [books, borrowedIds.length],
  );
  const askReturn = useCallback(
    (id: string) => {
      const book = books.find((item) => item.id === id);
      if (book) setPending({ book, type: 'return' });
    },
    [books],
  );
  const confirmAction = useCallback(() => {
    if (!pending) return;
    if (pending.type === 'borrow') {
      dispatch(borrowBook(pending.book.id));
    } else {
      dispatch(returnBook(pending.book.id));
    }
    setPending(null);
  }, [dispatch, pending]);
  const retry = useCallback(() => dispatch(loadBooks()), [dispatch]);

  return (
    <PageLayout page="books">
      <h1>Khám phá sách</h1>
      <p>Tìm sách, mượn và theo dõi những cuốn bạn đang mượn.</p>
      <p>Đang mượn: {borrowedIds.length} / 3 cuốn</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <SearchBar />
        <FilterBar />
      </div>

      <BorrowedBooks books={borrowedBooks} onReturn={askReturn} />

      {status === 'loading' && <p role="status">Đang tải...</p>}
      {status === 'failed' && (
        <p role="alert">
          {error}{' '}
          <button onClick={retry}>Thử lại</button>
        </p>
      )}
      {status === 'succeeded' && (
        <>
          <p>Tìm thấy {filteredBooks.length} đầu sách</p>
          <BookList
            books={filteredBooks}
            borrowedIds={borrowedIds}
            onBorrow={askBorrow}
            onReturn={askReturn}
          />
        </>
      )}
      {pending && (
        <ConfirmModal
          title={pending.type === 'borrow' ? 'Xác nhận mượn sách' : 'Xác nhận trả sách'}
          message={`Bạn có chắc chắn muốn ${pending.type === 'borrow' ? 'mượn' : 'trả'} "${pending.book.title}" không?`}
          confirmText={pending.type === 'borrow' ? 'Xác nhận mượn' : 'Xác nhận trả'}
          onConfirm={confirmAction}
          onCancel={() => setPending(null)}
        />
      )}

      {limitModal && (
        <ConfirmModal
          title="Đã đạt giới hạn mượn"
          message="Bạn đã mượn tối đa 3 cuốn sách. Hãy trả một cuốn trước khi mượn sách khác."
          confirmText="Đã hiểu"
          onConfirm={() => setLimitModal(false)}
        />
      )}
    </PageLayout>
  );
}
