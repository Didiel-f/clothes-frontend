import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import IconComponent from "components/IconComponent";
// STYLED COMPONENTS
import { StyledCard, StyledFab } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section11() {
  const services = await api.getServiceList();

  return (
    <Container className="mb-5">
      <Grid container spacing={3}>
        {services.map(({ icon, title, description, id }) => (
          <Grid size={{ lg: 3, sm: 6, xs: 12 }} key={id}>
            <StyledCard>
              <StyledFab>
                <IconComponent icon={icon} fontSize="inherit" />
              </StyledFab>

              <h4>{title}</h4>
              <p>{description}</p>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
