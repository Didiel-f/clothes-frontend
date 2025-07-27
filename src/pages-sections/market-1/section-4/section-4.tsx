import Link from "next/link";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
// CUSTOM ICON COMPONENTS
import RankBadge from "icons/RankBadge";
import DottedStar from "icons/DottedStar";
// LOCAL CUSTOM COMPONENTS
import FeaturedProductCard from "../shared/featured-product-card";
import TopRatingProductCard from "../shared/top-rating-product-card";
// GLOBAL CUSTOM COMPONENTS
import { SectionHeader } from "components/section-header";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section4() {
  const [brands, products] = await Promise.all([api.getTopRatedBrand(), api.getTopRatedProduct()]);

  return (
    <Container className="mb-4">
      <Grid container spacing={4}>
        {/* TOP RATINGS AREA */}
        <Grid size={{ lg: 6, xs: 12 }}>
          <SectionHeader icon={<RankBadge />} title="Top Ratings" seeMoreLink="#" />

          <Card className="p-1">
            <Grid container spacing={4}>
              {products.map((item) => (
                <Grid size={{ md: 3, sm: 6, xs: 12 }} key={item.title}>
                  <Link href={`/products/${item.slug}`}>
                    <TopRatingProductCard
                      title={item.title}
                      price={item.price}
                      rating={item.rating}
                      imgUrl={item.thumbnail}
                      reviewCount={item.reviews?.length}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* FEATURED BRANDS AREA */}
        <Grid size={{ lg: 6, xs: 12 }}>
          <SectionHeader icon={<DottedStar />} title="Featured Brands" seeMoreLink="#" />

          <Card className="p-1">
            <Grid container spacing={3}>
              {brands.map(({ id, name, image, slug }: any) => (
                <Grid size={{ sm: 6, xs: 12 }} key={id}>
                  <Link href={`/products/search?category=${slug}`}>
                    <FeaturedProductCard title={name} imgUrl={image} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
