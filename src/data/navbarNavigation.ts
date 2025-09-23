import { Menu } from "models/Navigation.model";

const navbarNavigation: Menu[] = [
  {
    title: "Mujer",
    url: "/products/search?gender=woman"
  },
  {
    title: "Hombre",
    url: "/products/search?gender=man"
  },
  {
    title: "Niños",
    url: "/products/search?gender=kids"
  },
  {
    title: "Marcas",
    url: "/orders",
    child: [
      {
        title: "Nike",
        url: "/products/search?brand=nike"
      },
      {
        title: "Under Armour",
        url: "/products/search?brand=under-armour"
      },
      {
        title: "Michael Kors",
        url: "/products/search?brand=michael-kors"
      },
      {
        title: "Osiris",
        url: "/products/search?brand=osiris"
      },
    ],
  },
];

export default navbarNavigation;
