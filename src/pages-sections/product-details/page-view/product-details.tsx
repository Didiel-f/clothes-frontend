import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
import ProductReviews from "../product-reviews";
import AvailableShops from "../available-shops";
import ProductDescription from "../product-description";
// CUSTOM DATA MODEL
import { IProduct } from "models/Product.model";

// ==============================================================
interface Props {
  product: IProduct;
  //relatedProducts: Product[];
  //frequentlyBought: Product[];
}
// ==============================================================

export default function ProductDetailsPageView({product}: Props) {
  const {shortDescription} = product
  return (
    <Container className="mt-2 mb-2">
      {/* PRODUCT DETAILS INFO AREA */}
      {product && <ProductIntro product={product} />}

      {/* PRODUCT DESCRIPTION AND REVIEW 
      <ProductTabs description={<ProductDescription description={shortDescription} />} />
*/}

      {/* FREQUENTLY BOUGHT PRODUCTS AREA 
      <FrequentlyBought products={props.frequentlyBought} />
*/}
      {/* AVAILABLE SHOPS AREA */}
      <AvailableShops />

      {/* RELATED PRODUCTS AREA 
      <RelatedProducts products={props.relatedProducts} />*/}
    </Container>
  );
}
