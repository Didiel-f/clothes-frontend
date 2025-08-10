"use client";

import { Fragment } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import AccordionHeader from "components/accordion";
import { FlexBetween } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS
import CheckboxLabel from "./checkbox-label";
// CUSTOM LOCAL HOOK
import useProductFilterCard from "./use-product-filter-card";
// TYPES
import Filters from "models/Filters";
import { FormControlLabel, Checkbox } from "@mui/material";

type InitialFilters = {
  q: string;
  sale?: boolean;
  page: number;
  sort: string;
  prices: { min?: number; max?: number };
  brand: string[];
  category?: string;
};

export default function ProductFilters({
  filters,
  initial,                 // 👈 le llega desde el server
}: { filters: Filters; initial: InitialFilters }) {
  const { brands: BRANDS, categories: CATEGORIES, others: OTHERS } = filters;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Pásale `initial` a tu hook para que parta con esos valores
  const {
    sales,
    brand,
    prices,
    collapsed,
    category,
    discount,
    setCollapsed,
    handleChangeBrand,
    handleChangePrice,
    handleChangeCategory,
    handleToggleDiscount,
  } = useProductFilterCard({ initial });

  const handleClearFilters = () => router.push(pathname);

  return (
    <div>
      {/* CATEGORY VARIANT FILTER */}
      <Typography variant="h6" sx={{ mb: 1.25 }}>Categories</Typography>

      {CATEGORIES.map((item) =>
        item.children?.length ? (
          <Fragment key={item.slug}>
            <AccordionHeader
              open={collapsed}
              onClick={() => setCollapsed((s) => !s)}
              sx={{ padding: ".5rem 0", cursor: "pointer", color: "grey.600" }}>
              <Typography
                component="span"
                onClick={(e) => { e.stopPropagation(); handleChangeCategory(item.slug); }}
                sx={{ fontWeight: category === item.slug ? 600 : 400, color: category === item.slug ? "primary.main" : "grey.600" }}
              >
                {item.name}
              </Typography>
            </AccordionHeader>

            <Collapse in={collapsed}>
              {item.children.map((child) => (
                <Typography
                  variant="body1"
                  key={child.slug}
                  onClick={() => handleChangeCategory(child.slug)}
                  sx={{
                    py: 0.75, pl: "22px", fontSize: 14, cursor: "pointer",
                    color: category === child.slug ? "primary.main" : "grey.600",
                    fontWeight: category === child.slug ? 600 : 400,
                  }}>
                  {child.name}
                </Typography>
              ))}
            </Collapse>
          </Fragment>
        ) : (
          <Typography
            variant="body1"
            key={item.slug}
            onClick={() => handleChangeCategory(item.slug)}
            sx={{
              py: 0.75, fontSize: 14, cursor: "pointer",
              color: category === item.slug ? "primary.main" : "grey.600",
              fontWeight: category === item.slug ? 600 : 400,
            }}>
            {item.name}
          </Typography>
        )
      )}


      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rango de precio
      </Typography>

      <Slider
        min={0}
        max={300000}
        step={10000}
        size="small"
        value={prices}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) =>
          new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(v)
        }
        onChange={(_, v) => handleChangePrice(v as number[])}
      />


      <FlexBetween>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="0"
          value={new Intl.NumberFormat("es-CL").format(prices[0])}
          onChange={(e) => {
            const raw = e.target.value.replace(/\./g, "");
            handleChangePrice([+raw, prices[1]]);
          }}

        />

        <Typography variant="h5" sx={{ px: 1, color: "grey.600" }}>
          -
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="300.000"
          value={new Intl.NumberFormat("es-CL").format(prices[1])}
          onChange={(e) => {
            const raw = e.target.value.replace(/\./g, "");
            handleChangePrice([prices[0], +raw]); // 👈 correcto: [min, max]
          }}

        />
      </FlexBetween>

      <Box component={Divider} my={3} />

      {/* BRAND VARIANT FILTER */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Brands
      </Typography>
      <FormGroup>
        {BRANDS.map(({ name }) => (
          <CheckboxLabel
            key={name}
            label={name}
            checked={brand.includes(name)}
            onChange={() => handleChangeBrand(name)}
          />
        ))}
      </FormGroup>

      <Box component={Divider} my={3} />

      {/* SALES OPTIONS */}
      <FormControlLabel
        control={
          <Checkbox
            checked={discount}
            onChange={handleToggleDiscount}
            color="primary"
          />
        }
        label="Descuento"
      />
      <Box component={Divider} my={3} />

      {searchParams.size > 0 && (
        <Button
          fullWidth
          disableElevation
          color="error"
          variant="contained"
          onClick={handleClearFilters}
          sx={{ mt: 4 }}>
          Limpiar todos los filtros
        </Button>
      )}
    </div>
  );
}
