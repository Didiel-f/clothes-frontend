import { PropsWithChildren } from "react";
import ShopLayout2 from "components/layouts/shop-layout-2";
import { Navbar, NavigationList } from "components/navbar";
import { CategoryList } from "components/categories";
// API FUNCTIONS
import api from "utils/__api__/layout";

export default async function Layout({ children }: PropsWithChildren) {
  const data = await api.getLayoutData();

  // NAVIGATION MENU LIST
  const NAVIGATION = (
    <Navbar
      elevation={0}
      navigation={<NavigationList navigation={data.header.navigation} />}
      categories={<CategoryList categories={data.header.categoryMenus} />}
    />
  );

  return (
    <ShopLayout2 data={data} navbar={NAVIGATION}>
      {children}
    </ShopLayout2>
  );
}
