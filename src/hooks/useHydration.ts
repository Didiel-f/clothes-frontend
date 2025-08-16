import { useEffect, useState } from "react";

/**
 * Hook para manejar la hidratación del lado del cliente
 * Evita hydration mismatch entre servidor y cliente
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
