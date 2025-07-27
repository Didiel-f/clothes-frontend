import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite";
// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
// LOCAL CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==================================================================
type Props = { totalPages: number; products: Product[] };
// ==================================================================

export default function WishListPageView({ products, totalPages }: Props) {
  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={product.id}>
            <ProductCard1 product={product} />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <Pagination count={totalPages} />
    </Fragment>
  );
}
