import Link from "next/link";
// MUI
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { Content, PriceText, StyledRoot } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { product: Product; btnSmall?: boolean };
// ==============================================================

export default function ProductCard14({ product, btnSmall = false }: Props) {
  const { slug, title, thumbnail, price, discount, rating } = product;

  return (
    <StyledRoot>
      <Link href={`/products/${slug}`}>
        <div className="img-wrapper">
          <LazyImage alt={title} width={260} height={280} src={thumbnail} />
        </div>
      </Link>

      <Content>
        <Rating size="small" value={rating} readOnly />
        <Typography variant="h4" sx={{ mt: 0.5 }}>
          {title}
        </Typography>

        <PriceText>
          {calculateDiscount(price, discount)}
          {discount ? <span className="base-price">{currency(price)}</span> : null}
        </PriceText>

        <div className={clsx({ "button-small": btnSmall })}>
          <AddToCart product={product} />
        </div>
      </Content>
    </StyledRoot>
  );
}
