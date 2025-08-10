import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Heading from "../shared/heading";
import { brands } from "__server__/__db__/dashboard/brand";
import { FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
// API FUNCTIONS

export default async function Section9() {

  return (
    <Container className="mt-4">
      <Heading title="Top Marcas" />

      <Grid container spacing={3}>
         {brands.map(({ id, image, name }) => (
          <Grid size={{ sm: 3, xs: 6 }} key={id}>
            <FlexBox borderRadius={3} overflow="hidden">
              <LazyImage src={image} alt={name} width={278} height={278} />
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
