import { cache } from "react";

const MENUS = [
  {
    title: "DASHBOARD",
    list: [
      { count: 5, icon: "ShoppingBagOutlined", href: "/orders", title: "Orders" },
      { count: 19, icon: "FavoriteBorder", href: "/wish-list", title: "Wishlist" },
      { count: 1, icon: "SupportAgent", href: "/support-tickets", title: "Support Tickets" }
    ]
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      { icon: "PersonOutlined", href: "/profile", title: "Profile Info" },
      { count: 16, icon: "PlaceOutlined", href: "/address", title: "Addresses" },
      { count: 4, icon: "CreditCard", href: "/payment-methods", title: "Payment Methods" }
    ]
  }
];

export const getNavigation = cache(async () => MENUS);
