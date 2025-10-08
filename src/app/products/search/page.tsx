import { Metadata } from "next";
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import { getBrands, getCategories } from "utils/__api__/fashion-2";
import { getFilters } from "utils/__api__/product-search";
import { getProducts, getAvailableSizes } from "utils/__api__/products";

export const metadata: Metadata = {
  title: "Buscar Productos | ZAG",
  description: "Encuentra exactamente lo que buscas en ZAG. Filtra por categoría, marca, precio y más. Tu tienda online de calzado y ropa.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["búsqueda", "productos", "filtros", "categorías", "marcas", "ZAG", "tienda online", "calzado", "ropa"]
};

type SearchParams = {
  q?: string;
  sale?: string;
  page?: string;
  sort?: string;
  prices?: string;
  brand?: string;
  category?: string;
  discount?: boolean;
  gender?: string;
  sizes?: string; // Tallas seleccionadas
};

function parseSearchParams(sp: SearchParams) {
  const [minStr, maxStr] = (sp.prices ?? "").split("-");
  const min = Number.isFinite(+minStr) ? +minStr : 5000;
  const max = Number.isFinite(+maxStr) ? +maxStr : 300000;
  // Si viene ?discount>0 o ?sale=true, activamos el filtro de descuento
  const discount =
    (typeof sp.discount !== "undefined" && Number(sp.discount) > 0) ||
      sp.sale === "true"
      ? true
      : undefined;
  return {
    q: sp.q ?? "",
    sale: sp.sale === "true" ? true : undefined,
    page: Number(sp.page ?? 1),
    sort: sp.sort ?? "price:asc",
    prices: { min, max },
    brand: (sp.brand ?? "").split(",").filter(Boolean),
    category: sp.category ?? undefined,
    discount,
    gender: sp.gender ?? undefined,
    sizes: (sp.sizes ?? "").split(",").filter(Boolean),
  };
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ProductSearch({ searchParams }: Props) {
  const sp = await searchParams;
  const initial = parseSearchParams(sp);

  const [productsRes, categories, brands, availableSizes] = await Promise.all([
    getProducts(initial),
    getCategories(),
    getBrands(),
    getAvailableSizes(),
  ]);
  const pageCount = productsRes.meta?.pagination?.pageCount ?? 1;
  const totalProducts = productsRes.meta?.pagination?.total ?? 0;
  const page = productsRes.meta?.pagination?.page ?? 1;
  const pageSize = productsRes.meta?.pagination?.pageSize ?? 24;

  const firstIndex = (page - 1) * pageSize + 1;
  const lastIndex = Math.min(page * pageSize, totalProducts);

  return (
    <ProductSearchPageView
      filters={{ categories, brands, sizes: availableSizes }}
      products={productsRes.data}
      initial={initial}
      pageCount={pageCount}
      totalProducts={totalProducts}
      lastIndex={lastIndex}
      firstIndex={firstIndex}
    />
  );
}
