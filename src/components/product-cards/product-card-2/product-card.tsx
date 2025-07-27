import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import FavoriteButton from "./favorite-button";
import ProductPrice from "../product-price";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import FlexBetween from "components/flex-box/flex-between";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ========================================================
interface Props {
  product: Product;
  rounded?: boolean;
  showReview?: boolean;
  showFavorite?: boolean;
}
// ========================================================

export default function ProductCard2({
  product,
  rounded = true,
  showReview = true,
  showFavorite = true
}: Props) {
  const { slug, title, price, thumbnail, rating, discount } = product;

  return (
    <div>
      <Link href={`/products/${slug}`}>
        <HoverBox overflow="hidden" borderRadius={rounded ? 3 : 0}>
          <LazyImage width={270} height={270} alt={title} src={thumbnail} />
        </HoverBox>
      </Link>

      <FlexBetween mt={2}>
        <div>
          <Typography noWrap variant="h6" sx={{ mb: 0.5 }}>
            {title}
          </Typography>

          {showReview && <Rating size="small" value={rating} color="warn" readOnly />}

          <ProductPrice price={price} discount={discount} />
        </div>

        {showFavorite && <FavoriteButton />}
      </FlexBetween>
    </div>
  );
}
