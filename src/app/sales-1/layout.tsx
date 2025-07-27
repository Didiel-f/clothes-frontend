import { PropsWithChildren } from "react";
// GLOBAL CUSTOM COMPONENTS
import SalesLayout from "components/layouts/sales-layout";
import { Navbar, NavigationList } from "components/navbar";
import { CategoryList } from "components/categories";
// API FUNCTIONS
import api from "utils/__api__/layout";

export default async function Layout({ children }: PropsWithChildren) {
  const data = await api.getLayoutData();

  return (
    <SalesLayout data={data}>
      <Navbar
        border={1}
        elevation={0}
        navigation={<NavigationList navigation={data.header.navigation} />}
        categories={<CategoryList categories={data.header.categoryMenus} />}
      />

      {children}
    </SalesLayout>
  );
}
