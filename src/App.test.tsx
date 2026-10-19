import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the Mini Library page and loading state', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Khám phá sách' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải...');
});

test('navigates to statistics without leaving the application', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Thống kê' }));
  expect(window.location.pathname).toBe('/stats');
  expect(
    await screen.findByRole('heading', { name: 'Thống kê thư viện' }),
  ).toBeInTheDocument();
});
