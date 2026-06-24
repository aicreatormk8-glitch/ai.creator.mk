'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CheckoutItem {
  name: string;
  price: string;
}

interface CheckoutContextValue {
  item: CheckoutItem | null;
  open: (item: CheckoutItem) => void;
  close: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<CheckoutItem | null>(null);
  return (
    <CheckoutContext.Provider
      value={{
        item,
        open: (i) => setItem(i),
        close: () => setItem(null),
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
