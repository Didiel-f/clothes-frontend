// hooks/useChilexpressRegions.ts
import { IRegion } from "models/Address.model";
import { useEffect, useState } from "react";

export function useChilexpressRegions() {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {

        const res = await fetch("/api/chilexpress/regions");
        const data = await res.json();
        if (res.ok && Array.isArray(data.regions)) {
          setRegions(data.regions);
        } else {
          setError("No se pudieron obtener las regiones");
        }
      } catch (err) {
        console.error("Error al conectar con la API de regiones:", err);
        setError("Error al conectar con la API de regiones");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loading, error };
}
