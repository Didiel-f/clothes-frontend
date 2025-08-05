import Link from "next/link";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import DiscountChip from "../discount-chip";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { PriceText, StyledRoot } from "./styles";
import { IProduct, IVariant } from "models/Product.model";
import { useState } from "react";

// ==============================================================
type Props = { product: IProduct };
// ==============================================================

export default function ProductCard16({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | undefined>(undefined)
  const hasStock = product.variants.some(variant => variant.stock > 0);
  const { slug, name, images, price } = product;

  return (
    <StyledRoot>
      <Link href={`/products/${slug}`}>
        <div className="img-wrapper">
          <LazyImage alt={name} width={380} height={379} src={product.images[0].url} />
          {true ? <DiscountChip discount={20} sx={{ left: 20, top: 20 }} /> : null}
        </div>
      </Link>

      <div className="content">
        <div>
          <Link href={`/products/${slug}`}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {name}
            </Typography>
          </Link>

          <PriceText>
            {calculateDiscount(price, 20)}
            {true && <span className="base-price">{currency(price)}</span>}
          </PriceText>
        </div>

        {/* ADD TO CART BUTTON */}
        <AddToCart hasStock={hasStock} product={product} selectedVariant={selectedVariant} />
      </div>
    </StyledRoot>
  );
}
