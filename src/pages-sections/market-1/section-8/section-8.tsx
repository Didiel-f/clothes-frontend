import Link from "next/link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENT
import LazyImage from "components/LazyImage";

export default function Section8() {
  return (
    <Container className="mb-5">
      <Grid container spacing={3}>
        <Grid size={{ md: 4, xs: 12 }}>
          <Link href="/">
            <LazyImage
              width={385}
              height={342}
              alt="banner"
              src="/assets/images/banners/banner-1.png"
              sx={{ borderRadius: 3 }}
            />
          </Link>
        </Grid>

        <Grid size={{ md: 8, xs: 12 }}>
          <Link href="/">
            <LazyImage
              width={790}
              height={342}
              alt="banner"
              src="/assets/images/banners/banner-2.png"
              sx={{ borderRadius: 3 }}
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
