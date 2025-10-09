"use client";

import { useState, useEffect } from "react";
import { SizeGuide } from "pages-sections/product-details/size-guide";

export function useSizeGuide(brandSlug?: string) {
  const [sizeGuides, setSizeGuides] = useState<SizeGuide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandSlug) {
      setSizeGuides([]);
      return;
    }

    const fetchSizeGuide = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/size-guides?brand=${brandSlug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setSizeGuides([]);
            return;
          }
          throw new Error("Error al obtener la guía de tallas");
        }

        const data = await response.json();
        setSizeGuides(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setSizeGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSizeGuide();
  }, [brandSlug]);

  return { sizeGuides, loading, error };
}

