import { Book, NewBook } from '../features/books/booksTypes';

const books: Array<NewBook & Pick<Book, 'id'>> = [
  { id: 'b1', title: 'Lập trình TypeScript', author: 'Nguyễn Minh', category: 'CNTT', year: 2023, copies: 4 },
  { id: 'b2', title: 'Cấu trúc dữ liệu và giải thuật', author: 'Lê Hoàng', category: 'CNTT', year: 2021, copies: 2 },
  { id: 'b3', title: 'Nhập môn trí tuệ nhân tạo', author: 'Trần An', category: 'CNTT', year: 2024, copies: 3 },
  { id: 'b4', title: 'Kinh tế vi mô', author: 'Phạm Hà', category: 'Kinh tế', year: 2020, copies: 3 },
];

export function getBooks(fail = false): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (fail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' });
        return;
      }
      resolve({ ok: true, data: books.map((book) => ({ ...book })) });
    }, 500);
  });
}

export type ApiOk<T> = { ok: true; data: T };
export type ApiFail = { ok: false; error: string };
export type ApiResult<T> = ApiOk<T> | ApiFail;

export function isApiFail<T>(result: ApiResult<T>): result is ApiFail {
  return result.ok === false;
}