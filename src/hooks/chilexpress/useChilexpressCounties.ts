import { ICounty } from "models/Address.model";
import { useEffect, useState } from "react";

export function useChilexpressCounties(regionCode?: string) {
    const [counties, setCounties] = useState<ICounty[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!regionCode) return;

        const fetchCounties = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`/api/chilexpress/counties?region=${regionCode}`);
                const data = await res.json();

                if (res.ok && Array.isArray(data.coverageAreas)) {
                    const filteredCounties = data.coverageAreas.filter((county: ICounty) => county.countyName === county.coverageName)
                    setCounties(filteredCounties);
                } else {
                    setError("No se pudieron cargar las comunas");
                    setCounties([]);
                }
            } catch (err) {
                console.error("Error al obtener comunas:", err);
                setError("Error al obtener comunas");
                setCounties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCounties();
    }, [regionCode]);

    return { counties, loading, error };
}
