import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "next/link";
// LOCAL CUSTOM COMPONENT
import Heading from "../shared/heading";
import { brands } from "__server__/__db__/dashboard/brand";
import { FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
// API FUNCTIONS

export default async function Section9() {

  return (
    <Container className="mt-4 mb-4">
      <Heading title="Top Marcas" />

      <Grid container spacing={3}>
         {brands.map(({ id, image, name, url }) => (
          <Grid size={{ sm: 3, xs: 6 }} key={id}>
            <Link href={url} style={{ textDecoration: "none" }}>
              <FlexBox>
                <LazyImage 
                  src={image} 
                  alt={name} 
                  width={278} 
                  height={278} 
                  sx={{ 
                    width: "100%", 
                    height: "auto", 
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: 10,
                    overflow: "hidden"
                  }}
                />
              </FlexBox>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
