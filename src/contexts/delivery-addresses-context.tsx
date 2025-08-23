"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Address from "models/Address.model";
import { makeKey } from "utils/ns";
import { ls } from "utils/form-persist";
import { useHydration } from "hooks/useHydration";

type Ctx = {
  isLoggedIn: boolean;
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  canAddAnother: boolean; // false si NO logged y ya hay 1
  addAddress: (addr: Address) => Promise<void> | void;
  replaceOnlyAddress: (addr: Address) => Promise<void> | void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
};

const DeliveryAddressesContext = createContext<Ctx | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
  userId: string | null;
  initialAddresses?: Address[];
};

export function DeliveryAddressesProvider({
  children,
  isLoggedIn,
  userId,
  initialAddresses = []
}: ProviderProps) {
  const isHydrated = useHydration();
  const ns = makeKey(isLoggedIn ? userId : undefined);
  
  // Persistencia de las direcciones
  const ADDRESSES_KEY = ns("checkout:addresses");
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  // Persistencia de la selección
  const SELECTED_KEY = ns("checkout:selectedAddressId");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  
  // Cargar datos del localStorage solo después de la hidratación
  useEffect(() => {
    if (!isHydrated) return;
    
    // Cargar direcciones guardadas
    const savedAddresses = ls.get<Address[]>(ADDRESSES_KEY, []);
    if (savedAddresses.length > 0) {
      setAddresses(savedAddresses);
    }
    
    // Cargar selección guardada
    const savedSelectedId = ls.get<string | null>(SELECTED_KEY, null);
    if (savedSelectedId !== null) {
      setSelectedAddressId(savedSelectedId);
    }
  }, [isHydrated, ADDRESSES_KEY, SELECTED_KEY]);
  
  // Guardar direcciones en localStorage cuando cambien (solo después de hidratación)
  useEffect(() => {
    if (!isHydrated) return;
    ls.set(ADDRESSES_KEY, addresses);
  }, [ADDRESSES_KEY, addresses, isHydrated]);
  
  useEffect(() => {
    if (!isHydrated) return;
    ls.set(SELECTED_KEY, selectedAddressId);
  }, [SELECTED_KEY, selectedAddressId, isHydrated]);

  const canAddAnother = isLoggedIn || addresses.length < 1;

  // Stubs para cuando integres API real:
  async function apiCreateAddress(addr: Address): Promise<Address> {
    // if (isLoggedIn) { const created = await fetch('/api/me/addresses', {method:'POST', body: JSON.stringify(addr)}).then(r=>r.json()); return created; }
    return addr; // invitado: solo eco
  }

  const addAddress = async (addr: Address) => {
    if (!canAddAnother) return;
    const created = await apiCreateAddress(addr);
    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressId((created as any)?.id ?? null); // si tu API devuelve id
  };

  const replaceOnlyAddress = async (addr: Address) => {
    if (isLoggedIn) {
      // TODO: si hay API, haz upsert/PUT aquí
    }
    setAddresses([addr]);
    setSelectedAddressId((addr as any)?.id ?? null);
  };

  const value = useMemo<Ctx>(
    () => ({
      isLoggedIn,
      addresses,
      setAddresses,
      canAddAnother,
      addAddress,
      replaceOnlyAddress,
      selectedAddressId,
      setSelectedAddressId
    }),
    [isLoggedIn, addresses, canAddAnother, selectedAddressId]
  );

  return <DeliveryAddressesContext.Provider value={value}>{children}</DeliveryAddressesContext.Provider>;
}

export function useDeliveryAddressesCTX() {
  const ctx = useContext(DeliveryAddressesContext);
  if (!ctx) throw new Error("useDeliveryAddresses must be used within DeliveryAddressesProvider");
  return ctx;
}
