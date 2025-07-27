import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// CUSTOM ICON COMPONENT
import CategoryIcon from "icons/Category";
// GLOBAL CUSTOM COMPONENTS
import { SectionHeader } from "components/section-header";
// STYLED COMPONENT
import { StyledCard } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section9() {
  const categories = await api.getCategories();

  return (
    <Container className="mb-5">
      <SectionHeader seeMoreLink="#" title="Categories" icon={<CategoryIcon color="primary" />} />

      <Grid container spacing={3}>
        {categories.map((item, ind) => (
          <Grid size={{ lg: 2, md: 3, sm: 4, xs: 6 }} key={ind}>
            <Link href={`/products/search?category=${item.slug}`}>
              <StyledCard elevation={6}>
                <Image width={52} height={52} alt="fashion" src={item.image!} />
                <Typography variant="h6">{item.name}</Typography>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
