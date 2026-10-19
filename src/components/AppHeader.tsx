import React from 'react';
import { AppLink } from '../app/AppLink';
import { useTheme } from '../context/ThemeContext';

type Props = {
  page: 'books' | 'stats';
};

export function AppHeader({ page }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 16,
      paddingBottom: 12,
      borderBottom: '1px solid currentColor',
    }}>
      <nav aria-label="Điều hướng chính" style={{ display: 'flex', gap: 12 }}>
        <AppLink aria-current={page === 'books' ? 'page' : undefined} href="/">Thư viện</AppLink>
        <AppLink aria-current={page === 'stats' ? 'page' : undefined} href="/stats">Thống kê</AppLink>
      </nav>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
      </button>
    </header>
  );
}
