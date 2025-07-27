import Content from "./content";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section4() {
  const products = await api.getNewArrivalProducts();
  if (!products || !products.length) return null;
  return <Content products={products} />;
}
