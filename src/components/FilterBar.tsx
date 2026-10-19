import React from 'react';
import { categories, Category } from '../features/books/booksTypes';
import { useAppStore } from '../store/useAppStore';

function isCategoryFilter(value: string): value is Category | 'all' {
  return value === 'all' || categories.some((category) => category === value);
}

export function FilterBar() {
  const category = useAppStore((state) => state.category);
  const setCategory = useAppStore((state) => state.setCategory);
  const sortBy = useAppStore((state) => state.sortBy);
  const setSortBy = useAppStore((state) => state.setSortBy);
  return (
    <div>
      <label>
        <span>Thể loại</span>
        {' '}
        <select
          aria-label="Lọc theo thể loại"
          value={category}
          onChange={(event) => {
            if (isCategoryFilter(event.target.value)) setCategory(event.target.value);
          }}
        >
          <option value="all">Tất cả</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      {' '}
      <label>
        <span>Sắp xếp</span>
        {' '}
        <select
          aria-label="Sắp xếp sách"
          value={sortBy}
          onChange={(event) => {
            if (event.target.value === 'title' || event.target.value === 'year') {
              setSortBy(event.target.value);
            }
          }}
        >
          <option value="title">Tên sách</option>
          <option value="year">Năm xuất bản</option>
        </select>
      </label>
    </div>
  );
}