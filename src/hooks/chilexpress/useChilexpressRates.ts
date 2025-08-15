import { useEffect, useState } from "react";

interface Rate {
  serviceTypeCode: number;
  serviceDescription: string;
  serviceValue: string;
}

export function useChilexpressRates(destinationCountyCode: string | null) {
  const [data, setData] = useState<Rate>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      if (!destinationCountyCode) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/chilexpress/rates`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destinationCountyCode }),
        });
        const json = await res.json();
        if (res.ok) {
          setData(json.data?.courierServiceOptions[0] || []);
        } else {
          setError(json.error || "Error desconocido");
        }
      } catch (err) {
        console.error("Error al consultar tarifas:", err);
        setError("Error al consultar tarifas");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [destinationCountyCode]);

  return { data, loading, error };
}
