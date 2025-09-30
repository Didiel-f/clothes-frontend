"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Apps from "@mui/icons-material/Apps";
import ViewList from "@mui/icons-material/ViewList";
import FilterList from "@mui/icons-material/FilterList";

import Sidenav from "components/side-nav";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductFilters from "components/products-view/filters";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";

import Filters from "models/Filters";
import { IProduct } from "models/Product.model";

const SORT_OPTIONS = [
  { label: "Precio bajo a alto", value: "price:asc" },
  { label: "Precio alto a bajo", value: "price:desc" }
];

interface InitialFilters {
  q: string;
  sale?: boolean;
  page: number;
  sort: string; 
  prices: { min?: number; max?: number };
  brand: string[];
  category?: string;
}

// ==============================================================
interface Props {
  filters: Filters;
  products: IProduct[] | null;
  pageCount: number;
  lastIndex: number;
  firstIndex: number;
  totalProducts: number;
  initial: InitialFilters; // 👈 correcto
}
// ==============================================================

export default function ProductSearchPageView({
  filters,
  products,
  pageCount,
  lastIndex,
  firstIndex,
  totalProducts,
  initial, // 👈 usar el alias correcto
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lee URL, pero con fallback a `initial` del server
  const query = searchParams.get("q") ?? initial.q ?? "";
  const page = searchParams.get("page") ?? String(initial.page ?? 1);
  const view = searchParams.get("view") ?? "grid";
  const sort = searchParams.get("sort") ?? (initial.sort || SORT_OPTIONS[0].value);

  const handleChangeSearchParams = (key: string, value: string) => {
    if (!key) return;
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.set("page", "1"); // reset de paginación al cambiar filtros
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white pt-2 pb-4">
      <Container>
        {/* FILTER ACTION AREA */}
        <FlexBetween flexWrap="wrap" gap={2} mb={2}>
          {query ? (
            <div>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Buscando “{query}”
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                {products?.length ?? 0} resultados encontrados
              </Typography>
            </div>
          ) : (
            <div />
          )}

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Typography variant="body1" sx={{ color: "grey.600", whiteSpace: "pre" }}>
                Ordenar por:
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={sort}
                variant="outlined"
                placeholder="Ordenar por"
                onChange={(e) => handleChangeSearchParams("sort", e.target.value)}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Typography variant="body1" sx={{ color: "grey.600", mr: 1 }}>
                Vista:
              </Typography>

              <IconButton onClick={() => handleChangeSearchParams("view", "grid")}>
                <Apps fontSize="small" color={view === "grid" ? "primary" : "inherit"} />
              </IconButton>

              <IconButton onClick={() => handleChangeSearchParams("view", "list")}>
                <ViewList fontSize="small" color={view === "list" ? "primary" : "inherit"} />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              <Box display={{ md: "none", xs: "block" }}>
                <Sidenav
                  handler={(close) => (
                    <IconButton onClick={close}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                >
                  <Box px={3} py={2}>
                    <ProductFilters filters={filters} initial={initial} />
                  </Box>
                </Sidenav>
              </Box>
            </FlexBox>
          </FlexBox>
        </FlexBetween>

        <Grid container spacing={4}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid size={{ xl: 2, md: 3 }} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilters filters={filters} initial={initial} />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid size={{ xl: 10, md: 9, xs: 12 }}>
            {view === "grid" ? (
              <ProductsGridView products={products} />
            ) : (
              <ProductsListView products={products} />
            )}

            <FlexBetween flexWrap="wrap" mt={6}>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                Mostrando {firstIndex}-{lastIndex} de {totalProducts} Productos
              </Typography>

              <Pagination
                color="primary"
                variant="outlined"
                page={Number(page)}
                count={pageCount}
                onChange={(_, p) => handleChangeSearchParams("page", String(p))}
              />
            </FlexBetween>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
