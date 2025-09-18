import { act, renderHook } from '../test-utils'; // adjust import path

import { useSelectedToggle } from './useSelectedToggle';

test('it can be provided an initial value', () => {
  const initialValue = 5;

  const { result } = renderHook(() => useSelectedToggle(5));

  expect(result.current?.selectedValue).toBe(initialValue);
});

test('it opens with the selected value', () => {
  const selectedValue = 'abc';

  const { result } = renderHook(() => useSelectedToggle());

  act(() => {
    result.current?.openWith(selectedValue);
  });

  expect(result.current?.selectedValue).toBe(selectedValue);
});

test('when it is closed selected value is set to null', () => {
  const selectedValue = 'abc';

  const { result } = renderHook(() => useSelectedToggle());

  act(() => {
    result.current?.openWith(selectedValue);
  });

  act(() => {
    result.current?.close();
  });

  expect(result.current?.selectedValue).toBe(null);
});
