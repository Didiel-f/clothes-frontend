import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import CategoryCard1 from "components/category-cards/category-card-1";
import { getCategories, ICategory } from "utils/__api__/fashion-2";
// API FUNCTIONS

export default async function Section3() {
  try {
    const categories = await getCategories();
    
    return (
      <Container className="mt-4">
        <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
          Best selling Categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category: ICategory) => (
            <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={category.id}>
              <CategoryCard1 
                title={category.name}
                image={category.image?.url || ''}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } catch (error) {
    console.error('Error loading categories:', error);
    return (
      <Container className="mt-4">
        <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
          Best selling Categories
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", color: "error.main" }}>
          Error al cargar las categorías
        </Typography>
      </Container>
    );
  }
}
