import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PageLayout } from '../../components/PageLayout';
import { categories } from '../books/booksTypes';
import { loadBooks } from '../books/booksThunks';

export default function StatsPage() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.items);
  const status = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);
  const borrowed = useAppSelector((state) => state.borrowed.ids);
  const loaded = useRef(false);

  useEffect(() => {
    if (status === 'idle' && !loaded.current) {
      loaded.current = true;
      dispatch(loadBooks());
    }
  }, [dispatch, status]);

  const retry = useCallback(() => dispatch(loadBooks()), [dispatch]);

  return (
    <PageLayout page="stats">
      <h1>Thống kê thư viện</h1>
      <p>Số đầu sách theo thể loại và số sách đang được mượn.</p>
      {(status === 'idle' || status === 'loading') && <p role="status">Đang tải...</p>}
      {status === 'failed' && (
        <p role="alert">
          {error}{' '}
          <button onClick={retry}>Thử lại</button>
        </p>
      )}
      {status === 'succeeded' && (
        <>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                {category}: {books.filter((book) => book.category === category).length} đầu sách
              </li>
            ))}
          </ul>
          <p>Sách đang mượn: {borrowed.length}</p>
        </>
      )}
    </PageLayout>
  );
}
