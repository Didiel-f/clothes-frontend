import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { SectionHeader } from "components/section-header";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { products: Product[]; heading: string };
// ==============================================================

export default function ProductGridList({ products, heading }: Props) {
  return (
    <Box flex="1 1 0">
      <SectionHeader title={heading} seeMoreLink="#" />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={product.id}>
            <ProductCard1 product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
