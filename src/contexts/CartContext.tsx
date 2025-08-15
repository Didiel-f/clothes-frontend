// stores/useCartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IProduct, IVariant } from "models/Product.model";

export interface CartItem { product: IProduct; variant: IVariant; qty: number; }
type State = {
  cart: CartItem[];
  shippingPrice: number;
  discount: number;
  tax: number;
  _hasHydrated: boolean; // para evitar hydration mismatch
};
type Actions = {
  addItem: (item: CartItem) => void;
  removeItem: (variantDocumentId: string) => void;
  updateQty: (variantDocumentId: string, qty: number) => void;
  clearCart: () => void;
  addShippingPrice: (price: number | string | null | undefined) => void;
  removePrice: () => void;
  _setHasHydrated: (v: boolean) => void;
};
const ssrSafeStorage =
  typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined;
  
const toNumber = (v: any) => (v === "" || v == null ? 0 : Number(v) || 0);

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: [],
      shippingPrice: 0,
      discount: 0,
      tax: 0,
      _hasHydrated: false,
      _setHasHydrated: (v) => set({ _hasHydrated: v }),

      addItem: ({ product, variant, qty }) => {
        const vid = variant.documentId;
        set((s) => {
          const i = s.cart.findIndex((x) => x.variant.documentId === vid);
          if (i >= 0) {
            const next = [...s.cart];
            next[i] = { ...next[i], qty }; // SET cantidad (no suma)
            return { cart: next };
          }
          return { cart: [...s.cart, { product, variant, qty }] };
        });
      },

      removeItem: (vid) =>
        set((s) => ({ cart: s.cart.filter((x) => x.variant.documentId !== vid) })),

      updateQty: (vid, qty) =>
        set((s) => ({
          cart: s.cart.map((x) => (x.variant.documentId === vid ? { ...x, qty } : x)),
        })),

      clearCart: () => set({ cart: [] }),

      addShippingPrice: (price) => set({ shippingPrice: toNumber(price) }),
      removePrice: () => set({ shippingPrice: 0 }),
    }),
    {
      name: "cart:v1",
      storage: ssrSafeStorage,
      // guarda solo lo necesario
      partialize: (s) => ({
        cart: s.cart,
        shippingPrice: s.shippingPrice,
        discount: s.discount,
        tax: s.tax,
      }),
      onRehydrateStorage: () => (state) => state?._setHasHydrated(true),
    }
  )
);

// Selectores/derivados para evitar re‑renders grandes
export const useCartCount = () =>
  useCartStore((s) => s.cart.reduce((a, i) => a + toNumber(i.qty), 0));

export const useCartSubtotal = () =>
  useCartStore((s) => s.cart.reduce((a, i) => a + toNumber(i.product?.price) * toNumber(i.qty), 0));

export const useCartTotals = () =>
  useCartStore(s => {
    const toNumber = (v: any) => (v === "" || v == null ? 0 : Number(v) || 0);
    const subtotal = s.cart.reduce((a, i) => a + toNumber(i.product?.price) * toNumber(i.qty), 0);
    return subtotal + toNumber(s.shippingPrice) - toNumber(s.discount) + toNumber(s.tax);
  });


export const useCartHydrated = () => useCartStore((s) => s._hasHydrated);
