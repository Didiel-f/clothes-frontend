// stores/useCartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IProduct, IVariant } from "models/Product.model";

export interface CartItem { product: IProduct; variant: IVariant; qty: number; }

type State = {
  cart: CartItem[];
  shippingPrice: number;
  shippingCalculated: boolean; // indica si el envío ya fue calculado (aunque sea 0/gratis)
  discount: number;
  discountCode: string; // código del cupón aplicado
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
  addDiscount: (amount: number, code?: string) => void;
  removeDiscount: () => void;
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
      shippingCalculated: false,
      discount: 0,
      discountCode: "",
      tax: 0,
      _hasHydrated: false,
      _setHasHydrated: (v) => set({ _hasHydrated: v }),

      // Si qty <= 0: NO agregar; si ya existe, eliminarlo.
      addItem: ({ product, variant, qty }) => {
        const vid = variant.documentId as string;
        const q = toNumber(qty);

        set((s) => {
          const idx = s.cart.findIndex((x) => x.variant.documentId === vid);

          // Si llega 0 o negativo, elimina si existe y no agrega nada
          if (q <= 0) {
            return idx >= 0
              ? { cart: s.cart.filter((x) => x.variant.documentId !== vid) }
              : { cart: s.cart };
          }

          // Si existe, setea nueva cantidad (no suma)
          if (idx >= 0) {
            const next = [...s.cart];
            next[idx] = { ...next[idx], qty: q };
            return { cart: next };
          }

          // Si no existe, agregar normal
          return { cart: [...s.cart, { product, variant, qty: q }] };
        });
      },

      removeItem: (vid) =>
        set((s) => ({ cart: s.cart.filter((x) => x.variant.documentId !== vid) })),

      // Si qty <= 0: eliminar el ítem
      updateQty: (vid, qty) => {
        const q = toNumber(qty);
        set((s) => {
          if (q <= 0) {
            return { cart: s.cart.filter((x) => x.variant.documentId !== vid) };
          }
          return {
            cart: s.cart.map((x) =>
              x.variant.documentId === vid ? { ...x, qty: q } : x
            ),
          };
        });
      },

      clearCart: () => set({ cart: [], shippingCalculated: false }),

      addShippingPrice: (price) => set({ shippingPrice: toNumber(price), shippingCalculated: true }),
      removePrice: () => set({ shippingPrice: 0, shippingCalculated: false }),
      addDiscount: (amount, code) => set({ discount: toNumber(amount), discountCode: code || "" }),
      removeDiscount: () => set({ discount: 0, discountCode: "" }),
    }),
    {
      name: "cart:v1",
      storage: ssrSafeStorage,
      // guarda solo lo necesario
      partialize: (s) => ({
        cart: s.cart,
        shippingPrice: s.shippingPrice,
        shippingCalculated: s.shippingCalculated,
        discount: s.discount,
        discountCode: s.discountCode,
        tax: s.tax,
      }),
      onRehydrateStorage: () => (state) => state?._setHasHydrated(true),
    }
  )
);

// Selectores/derivados para evitar re-renders grandes
export const useCartCount = () =>
  useCartStore((s) => s.cart.reduce((a, i) => a + toNumber(i.qty), 0));

export const useCartSubtotal = () =>
  useCartStore((s) =>
    s.cart.reduce(
      (a, i) => a + toNumber(i.product?.price) * toNumber(i.qty),
      0
    )
  );

export const useCartTotals = () =>
  useCartStore((s) => {
    const subtotal = s.cart.reduce(
      (a, i) => a + toNumber(i.product?.price) * toNumber(i.qty),
      0
    );
    return subtotal + toNumber(s.shippingPrice) - toNumber(s.discount) + toNumber(s.tax);
  });

export const useCartHydrated = () => useCartStore((s) => s._hasHydrated);
