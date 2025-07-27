import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENTS
import { CardRoot, PriceText, SaleBadge } from "./styles";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { product: Product };
// ==============================================================

export default function ProductCard11({ product }: Props) {
  const { title, discount, thumbnail, price } = product;

  return (
    <CardRoot elevation={0}>
      {/* SALE CHIP */}
      {discount ? (
        <SaleBadge>
          <p>Sale!</p>
        </SaleBadge>
      ) : null}

      {/* PRODUCT IMAGE */}
      <div className="img-wrapper">
        <Image fill sizes="(100vw, 340px)" alt="Apple Watch" src={thumbnail} />
      </div>

      <div className="content">
        {/* PRODUCT TITLE & REGULAR PRICE */}
        <div className="flex-between">
          <Typography noWrap variant="h3">
            {title}
          </Typography>
          {discount ? <PriceText>{currency(price)}</PriceText> : null}
        </div>

        {/* DESCRIPTION & SALE PRICE */}
        <div className="flex-between">
          <Typography noWrap variant="body1" color="grey.600">
            Powerful sensors, advanced
          </Typography>

          <Typography noWrap variant="h3">
            {calculateDiscount(price, discount)}
          </Typography>
        </div>
      </div>
    </CardRoot>
  );
}
