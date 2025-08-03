"use client"
// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductGallery from "./product-gallery";
import ProductVariantSelector from "./product-variant-selector";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StyledRoot } from "./styles";
// CUSTOM DATA MODEL
import { IProduct, IVariant } from "models/Product.model";
import { useState } from "react";

// ================================================================
type Props = { product: IProduct };
// ================================================================

export default function ProductIntro({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | undefined>(undefined)
  const hasStock = product.variants.some(variant => variant.stock > 0);
  return (
    <StyledRoot>
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}
        { product.images && (<Grid size={{ lg: 5, md: 7, xs: 12 }}>
          <ProductGallery images={product.images!} />
        </Grid>)}

        {/* PRODUCT INFO AREA */}
        <Grid size={{ lg: 6, md: 5, xs: 12 }}>
          {/* PRODUCT NAME */}
          <Typography variant="h1" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          {/* PRODUCT BRAND */}
          {product.brand && (
            <p className="brand">
              Marca: <strong>{product.brand.name}</strong>
            </p>
          )}

          {/* PRODUCT VARIANTS */}
          <ProductVariantSelector selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} variants={product.variants} />

          {/* PRICE & STOCK */}
          <div className="price">
            <Typography variant="h2" sx={{ color: "primary.main", mb: 0.5, lineHeight: 1 }}>
              {currency(product.price)}
            </Typography>

            { hasStock
              ? (<p>Stock Disponible</p>)
              : (<p>Agotado</p>)
            }
          </div>

          {/* ADD TO CART BUTTON */}
          <AddToCart hasStock={hasStock} product={product} selectedVariant={selectedVariant} />

        </Grid>
      </Grid>
    </StyledRoot>
  );
}
