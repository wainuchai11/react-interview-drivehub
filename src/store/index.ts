// store/index.ts

import { combineReducers, createStore } from "redux";
import cartReducer from "./cartReducer";

// Define your RootState type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  cart: cartReducer,
  // ... other reducers if you have them
});

const store = createStore(rootReducer);

export default store;
