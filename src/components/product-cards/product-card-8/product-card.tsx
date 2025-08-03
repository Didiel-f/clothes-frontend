import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./hover-actions";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { Card, CardMedia, CardContent } from "./styles";
import { IProduct } from "models/Product.model";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { product: IProduct };
// ==============================================================

export default function ProductCard8({ product }: Props) {
  const { slug, name, price, images, category } = product;

  return (
    <Card>
      <CardMedia>
        <Link href={`/products/${slug}`}>
          <LazyImage
            width={150}
            height={150}
            src={images[0]?.url ?? "/assets/images/faces/7.png"}
            alt="category"
            className="product-img"
          />
        </Link>

        <HoverActions product={product} />
      </CardMedia>

      <CardContent>
        {/* PRODUCT CATEGORY */}
        <p className="category">{category?.name}</p>

        {/* PRODUCT TITLE / NAME */}
        <p className="title">{name}</p>

        {/* PRODUCT PRICE */}
        <h4 className="price">{currency(price)}</h4>
      </CardContent>
    </Card>
  );
}
