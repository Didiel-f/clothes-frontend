// hooks/useCartAnalytics.ts
/**
 * Hook para integrar Google Analytics con el carrito de compras
 * Wrapper sobre useCartStore que automáticamente envía eventos a GA4
 */

import { useCartStore, CartItem } from "contexts/CartContext";
import {
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
} from "utils/analytics";
import type { IProduct, IVariant } from "models/Product.model";

export const useCartAnalytics = () => {
  const store = useCartStore();

  /**
   * Agregar item al carrito con tracking
   */
  const addItemWithTracking = (item: CartItem) => {
    // Agregar al carrito
    store.addItem(item);
    
    // Solo trackear si la cantidad es mayor a 0
    if (item.qty > 0) {
      trackAddToCart(item.product, item.variant, item.qty);
    }
  };

  /**
   * Remover item del carrito con tracking
   */
  const removeItemWithTracking = (variantDocumentId: string) => {
    // Buscar el item antes de removerlo para tener los datos
    const item = store.cart.find(
      (x) => x.variant.documentId === variantDocumentId
    );

    // Remover del carrito
    store.removeItem(variantDocumentId);

    // Trackear la remoción si encontramos el item
    if (item) {
      trackRemoveFromCart(item.product, item.variant, item.qty);
    }
  };

  /**
   * Actualizar cantidad con tracking
   */
  const updateQtyWithTracking = (variantDocumentId: string, newQty: number) => {
    // Buscar el item actual
    const currentItem = store.cart.find(
      (x) => x.variant.documentId === variantDocumentId
    );

    if (!currentItem) return;

    const oldQty = currentItem.qty;
    const difference = newQty - oldQty;

    // Actualizar cantidad
    store.updateQty(variantDocumentId, newQty);

    // Trackear según la diferencia
    if (difference > 0) {
      // Aumentó la cantidad
      trackAddToCart(currentItem.product, currentItem.variant, difference);
    } else if (difference < 0) {
      // Disminuyó la cantidad
      trackRemoveFromCart(
        currentItem.product,
        currentItem.variant,
        Math.abs(difference)
      );
    }
    // Si difference === 0, no hay cambio, no trackeamos
  };

  /**
   * Ver carrito con tracking
   */
  const viewCartWithTracking = () => {
    trackViewCart(store.cart);
  };

  return {
    // Estado del carrito
    cart: store.cart,
    shippingPrice: store.shippingPrice,
    discount: store.discount,
    discountCode: store.discountCode,
    tax: store.tax,
    
    // Acciones con tracking
    addItem: addItemWithTracking,
    removeItem: removeItemWithTracking,
    updateQty: updateQtyWithTracking,
    viewCart: viewCartWithTracking,
    
    // Acciones sin tracking (usan el store original)
    clearCart: store.clearCart,
    addShippingPrice: store.addShippingPrice,
    removePrice: store.removePrice,
    addDiscount: store.addDiscount,
    removeDiscount: store.removeDiscount,
  };
};

