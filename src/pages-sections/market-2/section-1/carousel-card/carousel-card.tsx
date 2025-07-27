import Link from "next/link";
import Button from "@mui/material/Button";
// STYLED COMPONENT
import { CardWrapper } from "./styles";

// ===============================================================
interface Props {
  title: string;
  bgImage: string;
  category: string;
  discount: number;
  buttonLink: string;
  buttonText: string;
  description: string;
  mode?: "dark" | "light";
}
// ===============================================================

export default function CarouselCard({
  title,
  bgImage,
  category,
  discount,
  buttonLink,
  buttonText,
  description,
  mode = "dark"
}: Props) {
  return (
    <CardWrapper img={bgImage} mode={mode}>
      <div className="content">
        <h4 className="title">{title}</h4>
        <p className="category">{category}</p>

        <p className="discount">
          SALE UP TO <span>{discount}% OFF</span>
        </p>

        <p className="description">{description}</p>

        <Button
          size="large"
          color="dark"
          href={buttonLink}
          variant="contained"
          LinkComponent={Link}>
          {buttonText}
        </Button>
      </div>
    </CardWrapper>
  );
}
