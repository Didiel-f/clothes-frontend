import { memo } from "react";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
import { IProduct } from "models/Product.model";

// ==============================================================
type Props = { products: IProduct[] };
// ==============================================================

export default memo(function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3} minHeight={500}>
      {products?.map((product) => (
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={product.id}>
          <ProductCard1 product={product} />
        </Grid>
      ))}
    </Grid>
  );
});
