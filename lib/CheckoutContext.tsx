'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface CheckoutContextValue {
  planId: string | null;
  open: (planId: string) => void;
  close: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<string | null>(null);
  return (
    <CheckoutContext.Provider
      value={{
        planId,
        open: (id) => setPlanId(id),
        close: () => setPlanId(null),
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
