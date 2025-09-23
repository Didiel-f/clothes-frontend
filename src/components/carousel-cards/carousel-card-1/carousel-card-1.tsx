import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import Link from "next/link";

// ==================================================
interface Props {
  title: string;
  imgUrl: string;
  buttonLink: string;   // ahora es el link de la imagen completa
  description: string;
}
// ==================================================

export default function CarouselCard1({
  title,
  imgUrl,
  buttonLink,
  description,
}: Props) {
  return (
    <Link href={buttonLink} style={{ display: "block" }}>
      <StyledRoot
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 400, md: 600 },
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Imagen de fondo */}
        <LazyImage
          fill
          src={imgUrl || "/assets/images/products/product-1.png"}
          alt={title}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />

        {/* Overlay con textos */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            inset: 0,
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Grid sx={{ width: { xs: "100%", md: "66.67%" } }}>
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
          </Grid>
        </Grid>
      </StyledRoot>
    </Link>
  );
}
