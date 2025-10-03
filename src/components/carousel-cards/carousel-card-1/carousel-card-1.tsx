"use client";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { useRouter } from "next/navigation";

// ==================================================
interface Props {
  title: string;
  imgUrl: string;
  buttonLink: string;
  description: string;
}
// ==================================================

export default function CarouselCard1({
  title,
  imgUrl,
  buttonLink,
  description,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(buttonLink);
  };

  return (
    <StyledRoot
      onClick={handleClick}
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
          alt={title || "Banner promocional"}
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
  );
}
