import ProductCard9 from "components/product-cards/product-card-9";
import { IProduct } from "models/Product.model";

// ==========================================================
type Props = { products: IProduct[] };
// ==========================================================

export default function ProductsListView({ products }: Props) {
  return products.map((product) => <ProductCard9 key={product.id} product={product} />);
}
