import Link from "next/link";
import Rating from "@mui/material/Rating";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import HoverActions from "./hover-actions";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { Card, CardMedia, CardContent } from "./styles";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { product: Product };
// ==============================================================

export default function ProductCard10({ product }: Props) {
  const { slug, price, rating, thumbnail, title, reviews } = product;

  return (
    <Card>
      <CardMedia>
        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${slug}`}>
          <LazyImage
            width={300}
            height={300}
            alt="category"
            src={thumbnail}
            className="product-img"
          />
        </Link>

        <HoverActions slug={slug} />
      </CardMedia>

      <CardContent>
        <p className="title">{title}</p>
        <p className="price">{currency(price)}</p>

        {/* PRODUCT RATINGS */}
        <div className="ratings">
          <Rating name="read-only" value={rating || 4} readOnly />
          <p className="amount">({reviews?.length || 0})</p>
        </div>

        {/* PRODUCT ADD TO CART BUTTON */}
        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
}
