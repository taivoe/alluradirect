import { useCallback, useState } from 'react';

export interface UseToggleType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useToggle = (defaultState = { isOpen: false }): UseToggleType => {
  const [isOpen, setIsOpen] = useState(defaultState.isOpen);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  return { isOpen, toggle, close, open } as UseToggleType;
};
