// utils/analytics.ts
/**
 * Google Analytics 4 - Utilidades para eventos
 * Documentación GA4: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

import type { IProduct, IVariant } from "models/Product.model";
import type { CartItem } from "contexts/CartContext";

// Tipos para eventos de GA4
export interface GAProduct {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
}

export interface GAEcommerceEvent {
  currency?: string;
  value?: number;
  items: GAProduct[];
  transaction_id?: string;
  shipping?: number;
  tax?: number;
  coupon?: string;
}

// Declara gtag para TypeScript
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: Object[];
  }
}

/**
 * Envía un evento personalizado a GA4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Convierte un producto del carrito a formato GA4
 */
export const productToGAItem = (
  product: IProduct,
  variant?: IVariant,
  quantity: number = 1
): GAProduct => {
  return {
    item_id: String(variant?.documentId || product.documentId || product.id || ""),
    item_name: product.name || "",
    item_brand: product.brand?.name || "Zag",
    item_category: product.category?.name || "",
    item_variant: variant?.shoesSize || variant?.clotheSize || "",
    price: Number(product.price) || 0,
    quantity,
  };
};

/**
 * Evento: Ver producto (view_item)
 */
export const trackViewItem = (product: IProduct, variant?: IVariant) => {
  trackEvent("view_item", {
    currency: "CLP",
    value: Number(product.price) || 0,
    items: [productToGAItem(product, variant)],
  });
};

/**
 * Evento: Agregar al carrito (add_to_cart)
 */
export const trackAddToCart = (
  product: IProduct,
  variant: IVariant,
  quantity: number
) => {
  trackEvent("add_to_cart", {
    currency: "CLP",
    value: Number(product.price) * quantity || 0,
    items: [productToGAItem(product, variant, quantity)],
  });
};

/**
 * Evento: Remover del carrito (remove_from_cart)
 */
export const trackRemoveFromCart = (
  product: IProduct,
  variant: IVariant,
  quantity: number
) => {
  trackEvent("remove_from_cart", {
    currency: "CLP",
    value: Number(product.price) * quantity || 0,
    items: [productToGAItem(product, variant, quantity)],
  });
};

/**
 * Evento: Ver carrito (view_cart)
 */
export const trackViewCart = (cartItems: CartItem[]) => {
  const items = cartItems.map((item) =>
    productToGAItem(item.product, item.variant, item.qty)
  );

  const value = cartItems.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.qty,
    0
  );

  trackEvent("view_cart", {
    currency: "CLP",
    value,
    items,
  });
};

/**
 * Evento: Iniciar checkout (begin_checkout)
 */
export const trackBeginCheckout = (
  cartItems: CartItem[],
  value: number,
  coupon?: string
) => {
  const items = cartItems.map((item) =>
    productToGAItem(item.product, item.variant, item.qty)
  );

  trackEvent("begin_checkout", {
    currency: "CLP",
    value,
    items,
    coupon,
  });
};

/**
 * Evento: Agregar información de envío (add_shipping_info)
 */
export const trackAddShippingInfo = (
  cartItems: CartItem[],
  value: number,
  shippingTier: string
) => {
  const items = cartItems.map((item) =>
    productToGAItem(item.product, item.variant, item.qty)
  );

  trackEvent("add_shipping_info", {
    currency: "CLP",
    value,
    shipping_tier: shippingTier,
    items,
  });
};

/**
 * Evento: Agregar información de pago (add_payment_info)
 */
export const trackAddPaymentInfo = (
  cartItems: CartItem[],
  value: number,
  paymentType: string
) => {
  const items = cartItems.map((item) =>
    productToGAItem(item.product, item.variant, item.qty)
  );

  trackEvent("add_payment_info", {
    currency: "CLP",
    value,
    payment_type: paymentType,
    items,
  });
};

/**
 * Evento: Compra exitosa (purchase)
 */
export const trackPurchase = (
  transactionId: string,
  cartItems: CartItem[],
  value: number,
  shipping: number = 0,
  tax: number = 0,
  coupon?: string
) => {
  const items = cartItems.map((item) =>
    productToGAItem(item.product, item.variant, item.qty)
  );

  trackEvent("purchase", {
    transaction_id: transactionId,
    currency: "CLP",
    value,
    tax,
    shipping,
    items,
    coupon,
  });
};

/**
 * Evento: Búsqueda (search)
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent("search", {
    search_term: searchTerm,
  });
};

/**
 * Evento: Registro de usuario (sign_up)
 */
export const trackSignUp = (method: string = "email") => {
  trackEvent("sign_up", {
    method,
  });
};

/**
 * Evento: Login de usuario (login)
 */
export const trackLogin = (method: string = "email") => {
  trackEvent("login", {
    method,
  });
};

/**
 * Evento: Ver lista de productos (view_item_list)
 */
export const trackViewItemList = (
  products: IProduct[],
  listName: string = "Search Results"
) => {
  const items = products.map((product, index) => ({
    ...productToGAItem(product),
    index,
  }));

  trackEvent("view_item_list", {
    item_list_name: listName,
    items,
  });
};

/**
 * Evento: Seleccionar producto de una lista (select_item)
 */
export const trackSelectItem = (
  product: IProduct,
  listName: string = "Search Results",
  index?: number
) => {
  trackEvent("select_item", {
    item_list_name: listName,
    items: [
      {
        ...productToGAItem(product),
        index,
      },
    ],
  });
};

/**
 * Configura User ID para seguimiento entre dispositivos
 */
export const setUserId = (userId: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", { user_id: userId });
  }
};

/**
 * Configura propiedades de usuario
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", properties);
  }
};

