import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('updates the value only after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } },
    );
    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    act(() => jest.advanceTimersByTime(299));
    expect(result.current).toBe('first');

    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe('second');
  });
});
