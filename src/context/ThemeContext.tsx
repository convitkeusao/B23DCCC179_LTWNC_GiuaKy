import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme phải được gọi bên trong ThemeProvider.');
  return context;
}