import { act, renderHook } from '../test-utils'; // adjust import path
import { useToggle } from './useToggle';

test('Can successfully Toggle the Hook', () => {
  const { result } = renderHook(() => useToggle({ isOpen: true }));

  // assert initial state
  expect(result.current?.isOpen).toBe(true);

  // Change to False
  act(() => {
    result.current?.close();
  });
  expect(result.current?.isOpen).toBe(false);

  // Change to True
  act(() => {
    result.current?.open();
  });
  expect(result.current?.isOpen).toBe(true);

  // Toggle again
  act(() => {
    result.current?.toggle();
  });
  expect(result.current?.isOpen).toBe(false);
});
