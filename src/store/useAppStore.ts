import { create } from 'zustand';
import { Category } from '../features/books/booksTypes';

export type SortBy = 'title' | 'year';

type FilterState = {
  term: string;
  category: Category | 'all';
  sortBy: SortBy;
  setTerm: (term: string) => void;
  setCategory: (category: Category | 'all') => void;
  setSortBy: (sortBy: SortBy) => void;
};

export const useAppStore = create<FilterState>((set) => ({
  term: '',
  category: 'all',
  sortBy: 'title',
  setTerm: (term) => set({ term }),
  setCategory: (category) => set({ category }),
  setSortBy: (sortBy) => set({ sortBy }),
}));