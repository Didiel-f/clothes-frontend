import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import FavoriteButton from "./favorite-button";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledCard, HoverIconWrapper } from "./styles";
import { IProduct, IVariant } from "models/Product.model";
import { useState } from "react";
// CUSTOM DATA MODEL

// ========================================================
interface Props {
  product: IProduct;
  showRating?: boolean;
  showProductSize?: boolean;
}
// ========================================================

export default function ProductCard1({ product, showProductSize, showRating = true }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | undefined>(undefined)
  const { slug, name, price, images, category } = product;
  const hasStock = product.variants.some(variant => variant.stock > 0);

  return (
    <StyledCard elevation={6}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip discount={50} />

        {/* HOVER ACTION ICONS */}
        <HoverIconWrapper className="hover-box">
          <Link href={`/products/${slug}/view`} scroll={false}>
            <IconButton color="inherit">
              <RemoveRedEye fontSize="small" color="inherit" />
            </IconButton>
          </Link>

          <FavoriteButton />
        </HoverIconWrapper>

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${slug}`}>
          <LazyImage
            priority
            alt={name}
            width={500}
            height={500}
            src={images[0]?.url ?? "/assets/images/faces/7.png"}
            className="thumbnail"
          />
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <div className="content">
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle title={name} slug={slug} />

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? <p className="size">Liter</p> : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          <ProductPrice discount={50} price={price} />
        </div>

        {/* ADD TO CART BUTTON */}
        <AddToCart hasStock={hasStock} product={product} selectedVariant={selectedVariant} />
      </ContentWrapper>
    </StyledCard>
  );
}
