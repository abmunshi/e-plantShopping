import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/authSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
export default store;
