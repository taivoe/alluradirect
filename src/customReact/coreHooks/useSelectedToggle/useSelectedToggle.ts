import React from 'react';
import { useToggle } from '../useToggle/useToggle';

export interface UseSelectedToggleType<T> {
  isOpen: boolean;
  openWith: (val: T) => void;
  close: () => void;
  selectedValue: T | null;
}

// Couple state used in a dialog to its open/closed state
export function useSelectedToggle<T>(initialValue?: T): UseSelectedToggleType<T> {
  const [selectedValue, setSelectedValue] = React.useState<T | null>(initialValue ?? null);
  const { open: toggleOpen, isOpen, close } = useToggle();

  const openWith = (val: T) => {
    setSelectedValue(val);
  };

  const closeWith = () => {
    close();
    setSelectedValue(null);
  };

  React.useEffect(() => {
    if (selectedValue !== null) {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return {
    isOpen,
    openWith,
    close: closeWith,
    selectedValue,
  };
}
