import React from 'react';
import { createContext } from 'react';

/** Use this function to create a new context with initial data, a context provider, and a hook that will consume the context  */
export function contextFactory<TProviderValue>() {
  const Context = createContext<TProviderValue | null>(null);

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (ctx === null) {
      throw new Error('ctx must be used inside its related provider');
    }

    return ctx;
  };

  const ContextProvider = ({ children, value }: { children: React.ReactNode; value: TProviderValue }): React.ReactElement => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return {
    Context,
    useContext,
    ContextProvider,
  };
}
