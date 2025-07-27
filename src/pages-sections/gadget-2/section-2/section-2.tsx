import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard11 from "components/product-cards/product-card-11";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section2() {
  const products = await api.getBestSellerProducts();

  if (!products || !products.length) return null;

  return (
    <Container>
      <Box textAlign="center" mt={8} mb={5}>
        <Typography variant="h2" sx={{ fontSize: { sm: 34, xs: 28 } }}>
          Best Seller Products
        </Typography>

        <Typography variant="body1" sx={{ color: "grey.600", fontSize: { sm: 16, xs: 14 } }}>
          There are many variations passages
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={product.id}>
            <Link href={`/products/${product.slug}`}>
              <ProductCard11 product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
