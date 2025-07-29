import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Heading from "../shared/heading";
// GLOBAL CUSTOM COMPONENT
import CategoryCard1 from "components/category-cards/category-card-1";
import { getCategories } from "utils/__api__/fashion-2";
// API FUNCTIONS

export default async function Section4() {
  const categories = await getCategories();

  return (
    <Container className="mt-4">
      <Heading title="Shop By Category" />

      <Grid container spacing={3}>
        {categories?.map((item) => (
          <Grid size={{ md: 3, sm: 6, xs: 12 }} key={item.id}>
            <CategoryCard1 image={item?.image?.url!} title={item.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
