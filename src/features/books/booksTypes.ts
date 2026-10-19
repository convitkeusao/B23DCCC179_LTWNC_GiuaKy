export const categories = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;

export type Category = (typeof categories)[number];

export type Book = {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  copies: number;
};

export type NewBook = Omit<Book, 'id'>;
export type BookPatch = Partial<Pick<Book, 'copies'>>;

export type BooksState = {
  items: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};