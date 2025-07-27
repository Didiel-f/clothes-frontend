import Image from "next/image";
// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// STYLED COMPONENTS
import { StyledCard, StyledContent, Title } from "./styles";

// LIST DATA
const LIST = [
  { icon: "verify", title: "SEO Friendly" },
  { icon: "cloud-data", title: "REST API" },
  { icon: "multivendor", title: "Multi-Vendor Support" },
  { icon: "optimization", title: "Optimized for Mobile" },
  { icon: "code", title: "Clean Code" },
  { icon: "lighting", title: "Fast" },
  { icon: "admin-dashboard", title: "Admin Dashboard" },
  { icon: "figma", title: "Figma Ready" }
];

export default function Section2() {
  return (
    <Container id="features" className="mt-5">
      <Title>Powerful Features</Title>

      <StyledContent>
        <Grid container spacing={7}>
          {LIST.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.title}>
              <StyledCard elevation={1}>
                <Image
                  width={64}
                  height={64}
                  alt={item.title}
                  src={`/assets/images/icons/${item.icon}.svg`}
                />

                <h4>{item.title}</h4>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContent>
    </Container>
  );
}
