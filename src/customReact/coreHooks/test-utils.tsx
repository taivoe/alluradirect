import { ReactNode } from 'react';
import { render, act } from '@testing-library/react';

// Simple wrapper around RTL renderHook pattern
export function renderHook<T>(callback: () => T) {
  const result: { current: T | undefined } = { current: undefined };

  function HookWrapper({ children }: { children?: ReactNode }) {
    result.current = callback();
    return <>{children}</>;
  }

  render(<HookWrapper />);
  return { result };
}

export { act };
