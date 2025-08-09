import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

type InitialFilters = {
  q: string;
  sale?: boolean; // fallback inicial (si ya lo usabas)
  page: number;
  sort: string;
  prices: { min?: number; max?: number };
  brand: string[];
  category?: string;
};

type Options = { initial?: InitialFilters };

export default function useProductFilterCard({ initial }: Options = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback((key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value == null || value === "") params.delete(key);
    else params.set(key, value);
    if (key !== "page") params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  // CATEGORY (valor actual)
  const category = searchParams.get("category") ?? initial?.category ?? undefined;

  // BRANDS / SALES (si las sigues usando)
  const brand = useMemo(
    () => (searchParams.get("brand") || (initial?.brand ?? [])?.join(","))
            .split(",").filter(Boolean),
    [searchParams, initial]
  );
  const sales = useMemo(
    () => (searchParams.get("sales") || "").split(",").filter(Boolean),
    [searchParams]
  );

  // ✅ DISCOUNT (solo productos con descuento)
  // URL: ?discount=1 activa el filtro
  const discount = useMemo(() => {
    const d = searchParams.get("discount");
    if (d !== null) return Number(d) > 0;           // desde URL
    return !!initial?.sale;                          // fallback a "sale" inicial si lo usabas
  }, [searchParams, initial]);

  const handleToggleDiscount = useCallback(() => {
    setParam("discount", discount ? undefined : "1");
  }, [discount, setParam]);

  // PRECIOS
  const getPricesFromURL = (): [number, number] => {
    const raw = searchParams.get("prices");
    if (raw) {
      const [a, b] = raw.split("-");
      const min = +a, max = +b;
      if (Number.isFinite(min) && Number.isFinite(max)) return [min, max];
    }
    return [initial?.prices.min ?? 5000, initial?.prices.max ?? 300000];
  };
  const [prices, setPrices] = useState<number[]>(getPricesFromURL());
  const debouncedChangePrice = useMemo(
    () => debounce((v: number[]) => setParam("prices", `${v[0]}-${v[1]}`), 500),
    [setParam]
  );
  const handleChangePrice = useCallback((v: number[]) => {
    setPrices(v);
    debouncedChangePrice(v);
  }, [debouncedChangePrice]);

  // HANDLERS
  const handleChangeBrand = useCallback((val: string) => {
    const next = brand.includes(val) ? brand.filter(v => v !== val) : [...brand, val];
    setParam("brand", next.join(","));
  }, [brand, setParam]);

  const handleChangeSales = useCallback((val: string) => {
    const next = sales.includes(val) ? sales.filter(v => v !== val) : [...sales, val];
    setParam("sales", next.join(","));
  }, [sales, setParam]);

  const handleChangeSearchParams = useCallback((k: string, v: string) => {
    if (!k) return;
    setParam(k, v);
  }, [setParam]);

  const handleChangeCategory = useCallback((slug?: string) => {
    const current = category;
    setParam("category", current === slug ? undefined : slug);
  }, [category, setParam]);

  const [collapsed, setCollapsed] = useState(true);

  return {
    // estado
    collapsed, setCollapsed,
    prices, brand, sales, category,
    discount,
    // handlers
    handleChangePrice,
    handleChangeBrand,
    handleChangeSales,
    handleChangeSearchParams,
    handleChangeCategory,
    handleToggleDiscount,
  };
}
