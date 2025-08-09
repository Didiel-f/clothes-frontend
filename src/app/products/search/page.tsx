import { Metadata } from "next";
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import { getBrands, getCategories } from "utils/__api__/fashion-2";
import { getFilters } from "utils/__api__/product-search";
import { getProducts } from "utils/__api__/products";

export const metadata: Metadata = {
  title: "Product Search - Bazaar Next.js E-commerce Template",
  description: "Bazaar is a React Next.js E-commerce template...",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

type SearchParams = {
  q?: string;
  sale?: string;
  page?: string;
  sort?: string;
  prices?: string;   
  brand?: string;
  category?: string;
};

function parseSearchParams(sp: SearchParams) {
  const [minStr, maxStr] = (sp.prices ?? "").split("-");
  const min = Number.isFinite(+minStr) ? +minStr : 5000;
  const max = Number.isFinite(+maxStr) ? +maxStr : 300000;

  return {
    q: sp.q ?? "",
    sale: sp.sale === "true" ? true : undefined,
    page: Number(sp.page ?? 1),
    sort: sp.sort ?? "createdAt:desc",
    prices: { min, max },
    brand: (sp.brand ?? "").split(",").filter(Boolean),
    category: sp.category ?? undefined,
  };
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ProductSearch({ searchParams }: Props) {
  const sp = await searchParams;
  const initial = parseSearchParams(sp);

  const [filters, productsRes, categories, brands] = await Promise.all([
    getFilters(),
    getProducts(initial),
    getCategories(),
    getBrands(),
  ]);
  const pageCount = productsRes.meta?.pagination?.pageCount ?? 1;
  const totalProducts = productsRes.meta?.pagination?.total ?? 0;
  const page = productsRes.meta?.pagination?.page ?? 1;
  const pageSize = productsRes.meta?.pagination?.pageSize ?? 24;

  const firstIndex = (page - 1) * pageSize + 1;
  const lastIndex = Math.min(page * pageSize, totalProducts);

  return (
    <ProductSearchPageView
      filters={{ ...filters, categories, brands }}
      products={productsRes.data}
      initial={initial}
      pageCount={pageCount}
      totalProducts={totalProducts}
      lastIndex={lastIndex}
      firstIndex={firstIndex}
    />
  );
}
