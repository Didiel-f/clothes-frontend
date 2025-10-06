import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";
import AuthGuard from "components/auth/AuthGuard";
// API FUNCTIONS
import api from "utils/__api__/layout";

export default async function Layout1({ children }: PropsWithChildren) {
  const data = await api.getLayoutData();
  return (
    <AuthGuard>
      <ShopLayout1 data={data}>{children}</ShopLayout1>
    </AuthGuard>
  );
}
