// cartSelectors.ts

import { RootState } from './index'; // Assuming you have a RootState type defined

export const selectCartItemCount = (state: RootState) => {
  return state.cart.reduce((count, item) => count + item.amount, 0);
};
