// CUSTOM DATA MODEL
import { CategoryMenuItem } from "models/Category.model";

export const categoryMenus: CategoryMenuItem[] = [
  { icon: "Woman", title: "Mujer", href: "/products/search?category=clothes" },
  { icon: "Man", title: "Hombre", href: "/products/search?category=clothes" },
  { icon: "Children", title: "Niños", href: "/products/search?category=clothes" },
  { icon: "Tshirt", title: "Unisex", href: "/products/search?category=clothes" },
  { icon: "NewArrival", title: "Novedades", href: "/products/search?category=clothes" },
  { icon: "GiftBox", title: "Ofertas", href: "/products/search?category=clothes" },
  { icon: "GiftBox", title: "Gorros", href: "/products/search?category=clothes" }, // usando alternativa visual
  { icon: "GiftBox", title: "Calcetines", href: "/products/search?category=clothes" }, // usando vest como ícono de prenda
  { icon: "GiftBox", title: "Accesorios", href: "/products/search?category=clothes" }, // buen ícono para accesorios
];
