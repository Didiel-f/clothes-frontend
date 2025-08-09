import { useEffect, useState } from "react";
import { IProduct } from "models/Product.model";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setProducts(json.data); // asegúrate que `json.data` tenga el array de productos
      } catch (err: any) {
        console.error("❌ Error en useProducts:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
