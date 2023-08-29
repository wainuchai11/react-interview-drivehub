import { combineReducers, createStore } from "redux";
import cartReducer from "./cartReducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
