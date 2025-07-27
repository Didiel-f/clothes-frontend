import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENT
import IconComponent from "components/IconComponent";
// STYLED COMPONENT
import { StyledRoot, Title } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/gadget-1";

export default async function Section2() {
  const categories = await api.getFeaturedCategories();
  if (!categories || !categories.length) return null;

  return (
    <Container className="mt-4">
      <Title>Featured Categories</Title>

      <Grid container spacing={3}>
        {categories.map(({ icon, name, totalProduct, id }) => (
          <Grid size={{ xl: 1.5, md: 3, sm: 4, xs: 6 }} key={id}>
            <StyledRoot>
              <div className="icon-box">
                <IconComponent icon={icon} color="inherit" />
              </div>

              <div className="content">
                <h6>{name}</h6>
                <p>{totalProduct} Products</p>
              </div>
            </StyledRoot>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
