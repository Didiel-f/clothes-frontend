import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import WhiteButton from "components/WhiteButton";
import CategoryCard1 from "components/category-cards/category-card-1";
// CSS ANIMATION NAME
import { AdTitle1, AdWrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-2";

export default async function Section3() {
  const categories = await api.getCategories();

  if (!categories || !categories.length) return null;

  return (
    <Container className="mt-4">
      <Grid container spacing={3}>
        {/* CATEGORY LIST AREA */}
        {categories.map((item) => (
          <Grid size={{ lg: 2, md: 3, sm: 4, xs: 6 }} key={item.id}>
            <CategoryCard1 image={item.image!} title={item.name} />
          </Grid>
        ))}

        {/* ANIMATED BANNER AREA */}
        <Grid size={12}>
          <AdWrapper>
            <AdTitle1>Black friday sale!</AdTitle1>

            <p className="text-wrapper">
              <span className="slide-text">
                Pay only for <span className="slide-text-bold">your loving electronics</span>
              </span>
            </p>

            <div className="btn-shop">
              <WhiteButton>Shop Now</WhiteButton>
            </div>
          </AdWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
