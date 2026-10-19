import reducer, { borrowBook, returnBook } from './booksSlice';
import { loadBooks } from './booksThunks';
import { Book, BooksState } from './booksTypes';

const sample: Book = {
  id: 'b1',
  title: 'Lập trình TypeScript',
  author: 'Nguyễn Minh',
  category: 'CNTT',
  year: 2023,
  copies: 2,
};

const start: BooksState = { items: [sample], status: 'idle', error: null };

describe('booksSlice', () => {
  test('sets loading state when loading begins', () => {
    const state = reducer(start, loadBooks.pending('req-1', undefined));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  test('stores books after a successful request', () => {
    const state = reducer(start, loadBooks.fulfilled([sample], 'req-1', undefined));
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual([sample]);
  });

  test('stores the API error after a failed request', () => {
    const state = reducer(start, loadBooks.rejected(
      new Error('failed'),
      'req-1',
      undefined,
      'Không tải được sách',
    ));
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Không tải được sách');
  });

  test('decreases and restores available copies', () => {
    const borrowed = reducer(start, borrowBook('b1'));
    expect(borrowed.items[0].copies).toBe(1);
    const returned = reducer(borrowed, returnBook('b1'));
    expect(returned.items[0].copies).toBe(2);
  });

  test('does not decrease copies below zero', () => {
    const empty = { ...start, items: [{ ...sample, copies: 0 }] };
    expect(reducer(empty, borrowBook('b1')).items[0].copies).toBe(0);
  });
});