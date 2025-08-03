"use client";

import { IProduct, IVariant } from "models/Product.model";
import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

// =================================================================================
export interface CartItem {
  product: IProduct,
  variant: IVariant;
  qty: number;
}

type InitialState = { cart: CartItem[] };

interface CartActionType {
  payload: CartItem
  type: "CHANGE_CART_AMOUNT";
}

// =================================================================================


const INITIAL_STATE = { cart: [] };

// ==============================================================
interface ContextProps {
  state: InitialState;
  dispatch: (args: CartActionType) => void;
}
// ==============================================================

export const CartContext = createContext<ContextProps>({} as ContextProps);

const reducer = (state: InitialState, action: CartActionType) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let existIndex = cartList.findIndex((item) => item.variant.documentId === cartItem.variant.documentId);

      // REMOVE ITEM IF QUANTITY IS LESS THAN 1
      if (cartItem.qty < 1) {
        const updatedCart = cartList.filter((item) => item.variant.documentId !== cartItem.variant.documentId);
        return { ...state, cart: updatedCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (existIndex > -1) {
        const updatedCart = [...cartList];
        updatedCart[existIndex].qty = cartItem.qty;
        return { ...state, cart: updatedCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

export default function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
