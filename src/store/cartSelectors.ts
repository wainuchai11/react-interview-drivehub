import { RootState } from './index'; 

export const selectCartItemCount = (state: RootState) => {
  return state.cart.reduce((count, item) => count + item.amount, 0);
};
