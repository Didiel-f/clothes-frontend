import { Menu } from "models/Navigation.model";

const navbarNavigation: Menu[] = [
  {
    title: "Inicio",
    url: "/",
  },
  {
    title: "Zapatillas",
    url: "/products/search?category=zapatillas"
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
        title: "Under Armour",
        url: "/products/search?brand=under-armour"
      },
    ],
  },
  {
    title: "Ofertas",
    url: "/products/search?discount=1",
    child: [
      { title: "Zapatillas", url: "/products/search?category=zapatillas&discount=1" },
    ],
  },
];

export default navbarNavigation;
