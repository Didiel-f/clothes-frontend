import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";
// API FUNCTIONS
import api from "utils/__api__/layout";
import { getCategories } from "utils/__api__/fashion-2";

export default async function Layout1({ children }: PropsWithChildren) {
  const data = await api.getLayoutData();
  const categories = await getCategories()

  return <ShopLayout1 data={{...data, categories}}>{children}</ShopLayout1>;
}
