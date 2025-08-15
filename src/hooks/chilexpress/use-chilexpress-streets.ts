import { IStreet } from "models/Address.model";
import { useState, useEffect } from "react";

interface StreetRequest {
  countyName: string;
  streetName: string;
  pointsOfInterestEnabled?: boolean;
  streetNameEnabled?: boolean;
  roadType?: number;
}

export function useChilexpressStreets({
  countyName,
  streetName,
}: {
  countyName: string;
  streetName: string;
}) {
  const [streets, setStreets] = useState<IStreet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStreets = async () => {
      if (!countyName || streetName.length < 3) {
        setStreets([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/chilexpress/streets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            countyName,
            streetName,
            pointsOfInterestEnabled: true,
            streetNameEnabled: true,
            roadType: 0,
          } as StreetRequest),
        });

        const data = await res.json();
        
        if (res.ok && Array.isArray(data.streets)) {
          setStreets(data.streets);
        } else {
          setError("No se encontraron calles o hubo un error");
          setStreets([]);
        }
      } catch (err) {
        console.error("Error al buscar calles:", err);
        setError("Error al conectar con Chilexpress");
        setStreets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStreets();
  }, [countyName, streetName]);

  return { streets, loading, error };
}
