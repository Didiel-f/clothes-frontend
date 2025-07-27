import Link from "next/link";
import Image from "next/image";
// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// STYLED COMPONENT
import { Wrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/gadget-1";

export default async function Section5() {
  const banners = await api.getSaleBanner();

  return (
    <Container className="mt-4">
      <Grid container spacing={4}>
        {banners.map(({ id, thumbnail, title, url, description }) => (
          <Grid size={{ md: 6, xs: 12 }} key={id}>
            <Link href={url}>
              <Wrapper>
                <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={thumbnail} />

                <div className="content">
                  <h2 className="title">{title}</h2>
                  <p className="body">{description}</p>
                  <span className="btn">SHOP NOW</span>
                </div>
              </Wrapper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
