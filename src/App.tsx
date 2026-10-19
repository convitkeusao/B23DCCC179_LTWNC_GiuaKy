import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BooksPage } from './pages/BooksPage';
import { ThemeProvider } from './context/ThemeContext';

const StatsPage = lazy(() => import('./features/stats/StatsPage'));

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);
  const stats = path.replace(/\/+$/, '') === '/stats';

  return (
    <Provider store={store}>
      <ThemeProvider>
        {stats ? (
          <Suspense fallback={<p role="status">Đang tải...</p>}>
            <StatsPage />
          </Suspense>
        ) : (
          <BooksPage />
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
