import { cache } from "react";
import axios from "utils/axiosInstance";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";
import Product, { IProduct } from "models/Product.model";



export const getProductData = cache(async (slug: string): Promise<IProduct | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[slug][$eq]=${slug}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const json = await response.json();
    return json.data[0];
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    return null;
  }
});

type Initial = {
  q?: string;
  sale?: boolean;
  page?: number;
  sort?: string;
  prices?: { min?: number; max?: number };
  brand?: string[];
  category?: string;
  discount?: boolean;
  gender?: string;
  sizes?: string[]; // Tallas disponibles (zapatos y ropa)
};

interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getProducts(initial: Initial = {}): Promise<StrapiCollectionResponse<IProduct>> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
  const qs = new URLSearchParams();
  // populate y paginación
  qs.set("populate", "*");
  qs.set("pagination[page]", String(initial.page ?? 1));
  qs.set("pagination[pageSize]", "24");
  qs.set("sort", initial.sort || "createdAt:desc");

  // búsqueda por nombre O por marca (name/slug)
  if (initial.q) {
    const q = initial.q.trim();

    qs.set("filters[$or][0][name][$containsi]", q);
    qs.set("filters[$or][1][brand][name][$containsi]", q);
    qs.set("filters[$or][2][brand][slug][$containsi]", q);
  }

  // búsqueda por gender
  if (initial.gender) {
    qs.set("filters[gender][$eq]", initial.gender);
  }

  // categoría
  if (initial.category) qs.set("filters[category][slug][$eq]", initial.category);

  // ✅ marcas (slug) usando `brand`
  if (initial.brand && initial.brand.length) {
    if (initial.brand.length === 1) {
      qs.set(
        "filters[brand][slug][$eq]",
        initial.brand[0].toLowerCase()
      );
    } else {
      initial.brand.forEach((b) => {
        qs.append(
          "filters[brand][slug][$in]",
          b.toLowerCase()
        );
      });
    }
  }

  // rango de precios
  if (initial.prices?.min != null) qs.set("filters[price][$gte]", String(initial.prices.min));
  if (initial.prices?.max != null) qs.set("filters[price][$lte]", String(initial.prices.max));

  // ✅ solo productos con descuento (discount > 0)
  if (initial.discount) {
    qs.set("filters[$and][0][discount][$notNull]", "true");
    qs.set("filters[$and][1][discount][$gt]", "0");
  }

  // ✅ filtro por tallas (zapatos o ropa)
  if (initial.sizes && initial.sizes.length > 0) {
    // Para cada talla, buscamos productos que tengan variantes con esa talla
    // en shoesSize O clotheSize
    if (initial.sizes.length === 1) {
      const size = initial.sizes[0];
      qs.set("filters[$or][0][variants][shoesSize][$eq]", size);
      qs.set("filters[$or][1][variants][clotheSize][$eq]", size);
    } else {
      // Para múltiples tallas, usamos $in
      initial.sizes.forEach((size) => {
        qs.append("filters[$or][0][variants][shoesSize][$in]", size);
        qs.append("filters[$or][1][variants][clotheSize][$in]", size);
      });
    }
  }

  const url = `${base}/api/products?${qs.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN ?? ""}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi ${res.status}: ${text}`);
  }

  return res.json();
}

// Obtener todas las tallas disponibles de los productos
export async function getAvailableSizes(): Promise<string[]> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");

  const url = `${base}/api/variants?populate=*&pagination[pageSize]=1000`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN ?? ""}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error fetching variants for sizes");
    return [];
  }

  const data = await res.json();
  const variants = data.data || [];
  
  const sizes = new Set<string>();
  variants.forEach((variant: any) => {
    if (variant.shoesSize) sizes.add(variant.shoesSize);
    if (variant.clotheSize) sizes.add(variant.clotheSize);
  });

  // Ordenar tallas: primero numéricas, luego alfabéticas
  return Array.from(sizes).sort((a, b) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (!isNaN(aNum)) return -1;
    if (!isNaN(bNum)) return 1;
    return a.localeCompare(b);
  });
}

// get all product slug
const getSlugs = cache(async () => {
  const response = await axios.get<SlugParams[]>("/api/products/slug-list");
  return response.data;
});

// get product based on slug
const getProduct = cache(async (slug: string) => {
  const response = await axios.get<Product>("/api/products/slug", { params: { slug } });
  return response.data;
});

// search products
const searchProducts = cache(async (name?: string, category?: string) => {
  const response = await axios.get<string[]>("/api/products/search", {
    params: { name, category }
  });
  return response.data;
});

interface ProductReview {
  name: string;
  date: string;
  imgUrl: string;
  rating: number;
  comment: string;
}

// product reviews
const getProductReviews = cache(async () => {
  const response = await axios.get<ProductReview[]>("/api/product/reviews");
  return response.data;
});

export default { getSlugs, getProduct, searchProducts, getProductReviews };
