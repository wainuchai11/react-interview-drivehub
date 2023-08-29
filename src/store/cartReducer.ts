// cartReducer.ts
import {
  ADD_TO_CART,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
} from "./cartActions";
import { Item } from "./types";

const initialState: Item[] = [];

const cartReducer = (state: Item[] = [], action: any): Item[] => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload }];
      }
    case INCREASE_CART_ITEM_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, amount: item.amount + 1 }
          : item
      );
    case DECREASE_CART_ITEM_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, amount: Math.max(item.amount - 1, 1) }
          : item
      );
    default:
      return state;
  }
};

export default cartReducer;
