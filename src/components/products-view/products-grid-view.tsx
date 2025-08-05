import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import ProductCard16 from "components/product-cards/product-card-16";
import { IProduct } from "models/Product.model";
// CUSTOM DATA MODEL

// ========================================================
type Props = { products: IProduct[] | null };
// ========================================================

export default function ProductsGridView({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products?.map((product: IProduct) => (
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={product.id}>
          <ProductCard16 product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
