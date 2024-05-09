import { configureStore } from "@reduxjs/toolkit";
import { animationReducer,sellerProfileReducer } from "./seller/sellerSlice";
export const store = configureStore({
  reducer: {
    animation:animationReducer,
    sellerProfileDetails:sellerProfileReducer
  },
});
