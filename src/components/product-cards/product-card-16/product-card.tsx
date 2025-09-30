import Link from "next/link";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency, getEffectiveDiscount } from "lib";
// STYLED COMPONENTS
import { PriceText, StyledRoot } from "./styles";
import { IProduct } from "models/Product.model";

// ==============================================================
type Props = { product: IProduct };
// ==============================================================

export default function ProductCard16({ product }: Props) {
  const { slug, name, price, images, brand, category } = product;
  const discount = getEffectiveDiscount(product);
  const hasDiscount = discount > 0;

  // Validaciones para marca y categoría
  const hasBrand = brand && brand.name;
  const hasCategory = category && category.name;

  return (
    <StyledRoot>
      <Link href={`/products/${slug}`}>
        <div className="img-wrapper">
          <LazyImage
            alt={name}
            width={380}
            height={379}
            src={
              images && images.length > 0
                ? images[0].url
                : "/assets/images/placeholder.png"
            }
          />
          {hasDiscount && (
            <DiscountChip discount={discount} sx={{ left: 20, top: 20 }} />
          )}
        </div>
      </Link>

      <div className="content">
        <Link href={`/products/${slug}`}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {hasCategory && `${category.name} `}
            {hasBrand && `${brand.name} `}
            {name}
          </Typography>
        </Link>

        <PriceText>
          {hasDiscount
            ? calculateDiscount(price, discount)
            : currency(price)}
          {hasDiscount && (
            <span className="base-price">{currency(price)}</span>
          )}
        </PriceText>
      </div>
    </StyledRoot>
  );
}