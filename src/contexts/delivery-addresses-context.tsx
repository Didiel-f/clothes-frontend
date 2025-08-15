"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import Address from "models/Address.model";

type Ctx = {
  isLoggedIn: boolean;
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  canAddAnother: boolean;                 // false si NO logged y ya hay 1
  addAddress: (addr: Address) => void;
  replaceOnlyAddress: (addr: Address) => void;
};

const DeliveryAddressesContext = createContext<Ctx | null>(null);

export function DeliveryAddressesProvider({
  children,
  initialAddresses = [],
  isLoggedIn
}: {
  children: React.ReactNode;
  initialAddresses?: Address[];
  isLoggedIn: boolean;
}) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const canAddAnother = useMemo(() => {
    // Si NO está logueado, máximo 1 address
    return isLoggedIn ? true : addresses.length < 1;
  }, [isLoggedIn, addresses.length]);

  const addAddress = (addr: Address) => {
    if (isLoggedIn) {
      setAddresses((prev) => [...prev, addr]);
    } else {
      // No logueado ➜ solo 1: reemplaza o crea
      setAddresses([addr]);
    }
  };

  const replaceOnlyAddress = (addr: Address) => setAddresses([addr]);

  const value = useMemo(
    () => ({ isLoggedIn, addresses, setAddresses, canAddAnother, addAddress, replaceOnlyAddress }),
    [isLoggedIn, addresses, canAddAnother]
  );

  return (
    <DeliveryAddressesContext.Provider value={value}>
      {children}
    </DeliveryAddressesContext.Provider>
  );
}

export function useDeliveryAddressesCTX() {
  const ctx = useContext(DeliveryAddressesContext);
  if (!ctx) throw new Error("useDeliveryAddresses must be used within DeliveryAddressesProvider");
  return ctx;
}
