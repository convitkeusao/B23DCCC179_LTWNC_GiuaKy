import React from 'react';
import { useAppStore } from '../store/useAppStore';

export function SearchBar() {
  const term = useAppStore((state) => state.term);
  const setTerm = useAppStore((state) => state.setTerm);
  return (
    <label>
      <span>Tìm sách</span>
      {' '}
      <input
        aria-label="Tìm theo tên sách hoặc tác giả"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Nhập tên sách hoặc tác giả..."
      />
    </label>
  );
}