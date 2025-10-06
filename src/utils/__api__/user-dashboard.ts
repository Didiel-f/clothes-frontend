import { cache } from "react";

// Función para obtener el número total de órdenes del cliente (lado del cliente)
export async function getOrdersCount(): Promise<number> {
  try {
    const response = await fetch('/api/my/orders?page=1&pageSize=1', {
      credentials: 'include',
    });
    
    if (response.ok) {
      const data = await response.json();
      // Retornar el total de órdenes desde la paginación
      return data.meta?.pagination?.total || data.pagination?.total || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting orders count:', error);
    return 0;
  }
}

// Menú estático para el servidor (sin contador dinámico)
const STATIC_MENUS = [
  {
    title: "PRINCIPAL",
    list: [
      { count: 0, icon: "ShoppingBagOutlined", href: "/orders", title: "Ordenes" },
      // { count: 19, icon: "FavoriteBorder", href: "/wish-list", title: "Lista de deseos" },
      // { count: 1, icon: "SupportAgent", href: "/support-tickets", title: "Soporte" }
    ]
  },
  // {
  //   title: "CONFIGURACIÓN DE CUENTA",
  //   list: [
  //     { icon: "PersonOutlined", href: "/profile", title: "Perfil" },
  //     { count: 16, icon: "PlaceOutlined", href: "/address", title: "Direcciones" },
  //     { count: 4, icon: "CreditCard", href: "/payment-methods", title: "Métodos de pago" }
  //   ]
  // }
];

export const getNavigation = cache(async () => STATIC_MENUS);
