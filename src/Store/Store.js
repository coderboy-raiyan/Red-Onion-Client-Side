import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "../foodsSlice/foodsSlice";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});
