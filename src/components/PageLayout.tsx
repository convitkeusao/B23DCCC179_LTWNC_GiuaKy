import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AppHeader } from './AppHeader';

type Props = {
  page: 'books' | 'stats';
  children: ReactNode;
};

export function PageLayout({ page, children }: Props) {
  const { theme } = useTheme();

  return (
    <main style={{
      minHeight: '100vh',
      padding: 16,
      colorScheme: theme,
      color: theme === 'dark' ? '#f5f5f5' : '#222',
      background: theme === 'dark' ? '#171717' : '#fff',
      transition: 'background 150ms ease, color 150ms ease',
    }}>
      <AppHeader page={page} />
      <section style={{ marginTop: 24 }}>{children}</section>
    </main>
  );
}
