// cartActions.ts
import { Item } from "./types";

// cartActions.ts

export const ADD_TO_CART = "ADD_TO_CART";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Item;
}

export const addToCart = (item: Item): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
// cartActions.ts

export const INCREASE_CART_ITEM_QUANTITY = "INCREASE_CART_ITEM_QUANTITY";
export const DECREASE_CART_ITEM_QUANTITY = "DECREASE_CART_ITEM_QUANTITY";

interface IncreaseCartItemQuantityAction {
  type: typeof INCREASE_CART_ITEM_QUANTITY;
  payload: {
    itemId: string;
  };
}

interface DecreaseCartItemQuantityAction {
  type: typeof DECREASE_CART_ITEM_QUANTITY;
  payload: {
    itemId: string;
  };
}

export const increaseCartItemQuantity = (
  itemId: string
): IncreaseCartItemQuantityAction => ({
  type: INCREASE_CART_ITEM_QUANTITY,
  payload: { itemId },
});

export const decreaseCartItemQuantity = (
  itemId: string
): DecreaseCartItemQuantityAction => ({
  type: DECREASE_CART_ITEM_QUANTITY,
  payload: { itemId },
});

export type CartActionTypes =
  | AddToCartAction
  | IncreaseCartItemQuantityAction
  | DecreaseCartItemQuantityAction;
