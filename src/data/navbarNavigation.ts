import { Menu } from "models/Navigation.model";

const navbarNavigation: Menu[] = [
  {
    title: "Inicio",
    url: "/",
  },
  {
    title: "Zapatillas",
    url: "/market-1",
  },
  {
    title: "Vestuario",
    url: "/sales-1",
    child: [
      {
        title: "Sale Page",
        url: "/sales-1"
      },
    ],
  },
  {
    title: "Marcas",
    url: "/orders",
    child: [
      {
        title: "Orders",
        url: "/orders"
      },
    ],
  },
  {
    title: "Ofertas",
    url: "/ofertas",
    child: [
      { title: "Profile", url: "/vendor/account-settings" },
    ],
  },
];

export default navbarNavigation;
